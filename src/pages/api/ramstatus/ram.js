import os from 'os';

export default function handler(req, res) {
  const total = os.totalmem(); // total RAM in bytes
  const free = os.freemem();   // free RAM in bytes
  const used = total - free;

  const toMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

  res.status(200).json({
    totalMemoryMB: toMB(total),
    usedMemoryMB: toMB(used),
    freeMemoryMB: toMB(free),
    usedPercentage: ((used / total) * 100).toFixed(2) + '%',
  });
}
