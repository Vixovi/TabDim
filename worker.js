import {read, write, normalize, keyFor} from './state.js';
import {updateIcon} from './icon.js';
const queues = new Map();
function serial(id, task) {
  const next = (queues.get(id) || Promise.resolve()).catch(() => {}).then(task);
  queues.set(id, next);
  next.finally(() => { if (queues.get(id) === next) queues.delete(id); }).catch(() => {});
  return next;
}
const safe = task => task.catch(error => console.warn('TabDim:', error.message));
function createMenu(context) {
  return new Promise((resolve, reject) => {
    try {
      chrome.contextMenus.create({id: 'brightness', title: 'Ajustar brillo de esta pestaña', contexts: [context]}, () => {
        const error = chrome.runtime.lastError;
        error ? reject(new Error(error.message)) : resolve();
      });
    } catch (error) { reject(error); }
  });
}
async function menus() {
  await chrome.contextMenus.removeAll();
  try {
    await createMenu('tab');
    await chrome.storage.session.set({menuContext: 'tab'});
  } catch (error) {
    await createMenu('page');
    await chrome.storage.session.set({menuContext: 'page', menuLimitation: error.message});
  }
}
async function apply(id, value) {
  try {
    await chrome.tabs.sendMessage(id, {type: 'shade', value}, {frameId: 0});
  } catch {
    try {
      await chrome.scripting.executeScript({target: {tabId: id, frameIds: [0]}, files: ['shade.js']});
      await chrome.tabs.sendMessage(id, {type: 'shade', value}, {frameId: 0});
    } catch {
      throw new Error('Chrome no permite oscurecer esta página. Puede estar protegida o faltar permiso de acceso al sitio/archivo.');
    }
  }
}
chrome.runtime.onInstalled.addListener(() => safe(menus()));
chrome.runtime.onStartup.addListener(() => safe(menus()));
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== 'brightness' || !Number.isInteger(tab?.id)) return;
  safe(chrome.windows.create({url: chrome.runtime.getURL(`control.html?tabId=${tab.id}`), type: 'popup', width: 360, height: 400}));
});
chrome.tabs.onRemoved.addListener(id => safe(serial(id, () => chrome.storage.session.remove(keyFor(id)))));
chrome.tabs.onActivated.addListener(({tabId}) => safe(serial(tabId, async () => updateIcon(tabId, await read(tabId)))));
chrome.tabs.onUpdated.addListener((id, change) => {
  if (change.status === 'complete') safe(serial(id, async () => {
    const value = await read(id);
    await updateIcon(id, value);
    if (value !== 100) await apply(id, value);
  }));
});
chrome.runtime.onMessage.addListener((message, sender, reply) => {
  if (sender.id !== chrome.runtime.id) return;
  if (message.type === 'ready' && sender.tab && sender.frameId === 0) {
    serial(sender.tab.id, async () => {
      const value = await read(sender.tab.id);
      await updateIcon(sender.tab.id, value);
      return {value};
    }).then(reply, () => reply({value: 100}));
    return true;
  }
  if (!sender.url || new URL(sender.url).pathname !== '/control.html' || !sender.url.startsWith(chrome.runtime.getURL(''))) return;
  if (!['get', 'set'].includes(message.type) || !Number.isInteger(message.tabId) || message.tabId < 0) return;
  serial(message.tabId, async () => {
    const tab = await chrome.tabs.get(message.tabId);
    if (message.type === 'set') {
      const value = normalize(message.value);
      // Keep the preference even if this document is protected; it applies on the next accessible navigation.
      await write(tab.id, value);
      await updateIcon(tab.id, value);
      let warning;
      try { await apply(tab.id, value); } catch (error) { warning = error.message; }
      return {ok: true, value, title: tab.title || 'Pestaña sin título', warning};
    }
    const value = await read(tab.id);
    await updateIcon(tab.id, value);
    let warning;
    try { await apply(tab.id, value); } catch (error) { warning = error.message; }
    return {ok: true, value, title: tab.title || 'Pestaña sin título', warning};
  }).then(reply, error => reply({ok: false, error: error.message}));
  return true;
});
