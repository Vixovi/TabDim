export const keyFor = id => `brightness:${id}`;
export function normalize(value) {
  if (!Number.isFinite(value)) throw new Error('El brillo debe ser un número.');
  return Math.max(10, Math.min(100, Math.round(value)));
}
export async function read(id) {
  const key = keyFor(id);
  return (await chrome.storage.session.get(key))[key] ?? 100;
}
export async function write(id, value) {
  const key = keyFor(id);
  if (value === 100) await chrome.storage.session.remove(key);
  else await chrome.storage.session.set({[key]: value});
}
