const $ = id => document.getElementById(id);
function applyTheme(theme) {
  const selected = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = selected;
  const dark = selected === 'dark';
  const label = dark ? 'Activar modo claro' : 'Activar modo oscuro';
  $('theme').setAttribute('aria-label', label);
  $('theme').setAttribute('aria-pressed', String(dark));
  $('theme').title = label;
  $('theme-sun').toggleAttribute('hidden', !dark);
  $('theme-moon').toggleAttribute('hidden', dark);
}
let themeQueue = Promise.resolve();
$('theme').addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  themeQueue = themeQueue.catch(() => {}).then(() => chrome.storage.local.set({theme})).catch(error => {
    $('status').textContent = 'No se pudo guardar la apariencia: ' + error.message;
  });
});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.theme) applyTheme(changes.theme.newValue);
});
let tabId;
let closed = false;
let pending;
let sending = false;
let generation = 0;
function display(value) { $('brightness').value = value; $('percentage').textContent = `${value} %`; $('brightness').setAttribute('aria-valuetext', `${value} por ciento`); }
function stop(text) { closed = true; $('controls').disabled = true; $('status').textContent = text; }
async function refresh() {
  const current = ++generation;
  try {
    const result = await chrome.runtime.sendMessage({type: 'get', tabId});
    if (closed || current !== generation) return;
    if (!result?.ok) { stop('La pestaña ya no está disponible. ' + (result?.error || '')); return; }
    $('target').textContent = result.title;
    $('target').title = result.title;
    if (!sending && pending === undefined) display(result.value);
    $('status').textContent = result.warning || '';
    $('controls').disabled = false;
  } catch (error) { $('status').textContent = 'No se pudo comunicar con la extensión: ' + error.message; }
}
async function drain() {
  if (sending || closed) return;
  sending = true;
  while (pending !== undefined && !closed) {
    const value = pending;
    pending = undefined;
    try {
      const result = await chrome.runtime.sendMessage({type: 'set', tabId, value});
      if (!result?.ok) { stop('La pestaña ya no está disponible. ' + (result?.error || '')); break; }
      $('status').textContent = result.warning || '';
    } catch (error) { $('status').textContent = 'No se pudo guardar el brillo: ' + error.message; }
  }
  sending = false;
  if (!closed) await refresh();
}
function change(value) { display(value); pending = value; generation++; void drain(); }
$('brightness').addEventListener('input', event => change(Number(event.target.value)));
$('reset').addEventListener('click', () => change(100));
chrome.tabs.onRemoved.addListener(id => { if (id === tabId) stop('La pestaña controlada se ha cerrado.'); });
chrome.tabs.onUpdated.addListener((id, change) => { if (id === tabId && (change.title || change.status === 'complete')) void refresh(); });
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'session' && changes[`brightness:${tabId}`] && !sending && pending === undefined && !closed) void refresh();
});
async function init() {
  try {
    try { applyTheme((await chrome.storage.local.get('theme')).theme); }
    catch (error) { $('status').textContent = 'No se pudo leer la apariencia: ' + error.message; }
    const parameter = new URLSearchParams(location.search).get('tabId');
    if (parameter !== null) {
      if (!/^\d+$/.test(parameter)) throw new Error('ID de pestaña inválido.');
      tabId = Number(parameter);
    } else {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      tabId = tab?.id;
    }
    if (!Number.isInteger(tabId)) throw new Error('No hay una pestaña disponible.');
    await refresh();
  } catch (error) { stop(error.message); }
}
void init();
