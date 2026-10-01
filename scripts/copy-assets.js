import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\7902db1f-35b5-4c6e-a69b-5d0ec340cde6';
const targetDir = path.resolve('public/assets/products');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mappings = [
  { prefix: 'clenol_mr_220', target: 'clenol-mr-220.jpg' },
  { prefix: 'clenol_ct_031', target: 'clenol-ct-031.jpg' },
  { prefix: 'clenol_ct_032', target: 'clenol-ct-032.jpg' },
  { prefix: 'clenol_bt_330', target: 'clenol-bt-330.jpg' },
  { prefix: 'clenol_bt_331', target: 'clenol-bt-331.jpg' },
];

const brainFiles = fs.readdirSync(brainDir);

for (const map of mappings) {
  const match = brainFiles.find(f => f.startsWith(map.prefix) && f.endsWith('.jpg'));
  if (match) {
    const src = path.join(brainDir, match);
    const dest = path.join(targetDir, map.target);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${match} -> ${map.target}`);
  }
}
