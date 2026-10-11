// Draw locally at each toolbar resolution; keep the blue outline legible at 10%.
export function drawIcon(value, size) {
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.scale(size / 128, size / 128);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 9;
  ctx.strokeStyle = '#087cff';
  ctx.beginPath();
  ctx.moveTo(19, 32); ctx.lineTo(30, 17); ctx.lineTo(56, 17);
  ctx.lineTo(68, 31); ctx.lineTo(102, 31);
  ctx.quadraticCurveTo(113, 31, 113, 43); ctx.lineTo(113, 98);
  ctx.quadraticCurveTo(113, 110, 101, 110); ctx.lineTo(27, 110);
  ctx.quadraticCurveTo(15, 110, 15, 98); ctx.lineTo(15, 43);
  ctx.quadraticCurveTo(15, 36, 19, 32); ctx.closePath(); ctx.stroke();
  const brightness = Math.max(10, Math.min(100, value));
  ctx.fillStyle = '#143568';
  ctx.beginPath();ctx.roundRect(47, 46, 34, 49, 7);ctx.fill();
  ctx.save();ctx.beginPath();ctx.roundRect(47, 46, 34, 49, 7);ctx.clip();
  ctx.fillStyle = '#ffd34d';
  const height = 49 * brightness / 100;
  ctx.fillRect(47, 95 - height, 34, height);ctx.restore();
  return ctx.getImageData(0, 0, size, size);
}
export async function updateIcon(tabId, value) {
  const imageData = {};
  for (const size of [16, 32]) imageData[size] = drawIcon(value, size);
  await chrome.action.setIcon({tabId, imageData});
  await chrome.action.setTitle({tabId, title: `TabDim · Brillo ${value} %`});
}
