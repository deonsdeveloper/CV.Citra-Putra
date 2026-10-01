import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\7902db1f-35b5-4c6e-a69b-5d0ec340cde6';
const targetDir = path.resolve('public/assets/products');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mappings = [
  { prefix: 'mr_220_studio', target: 'clenol-mr-220.jpg' },
  { prefix: 'ct_031_studio', target: 'clenol-ct-031.jpg' },
  { prefix: 'ct_032_studio', target: 'clenol-ct-032.jpg' },
  { prefix: 'bt_330_studio', target: 'clenol-bt-330.jpg' },
  { prefix: 'bt_331_studio', target: 'clenol-bt-331.jpg' },
];

const brainFiles = fs.readdirSync(brainDir);

for (const map of mappings) {
  const matches = brainFiles.filter(f => f.startsWith(map.prefix) && f.endsWith('.jpg'));
  if (matches.length > 0) {
    // Pick the most recent one
    matches.sort();
    const latest = matches[matches.length - 1];
    const src = path.join(brainDir, latest);
    const dest = path.join(targetDir, map.target);
    fs.copyFileSync(src, dest);
    console.log(`Updated ${latest} -> ${map.target}`);
  }
}
