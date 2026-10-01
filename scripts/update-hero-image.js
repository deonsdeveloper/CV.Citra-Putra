import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\7902db1f-35b5-4c6e-a69b-5d0ec340cde6';
const targetDir = path.resolve('public/assets/hero');

const brainFiles = fs.readdirSync(brainDir);
const match = brainFiles.find(f => f.startsWith('industrial_hero_showcase') && f.endsWith('.jpg'));

if (match) {
  const src = path.join(brainDir, match);
  const dest1 = path.join(targetDir, 'fotoproduk1.png');
  const dest2 = path.join(targetDir, 'chemical-showcase.png');
  fs.copyFileSync(src, dest1);
  fs.copyFileSync(src, dest2);
  console.log(`Successfully updated ${dest1} and ${dest2}`);
} else {
  console.error('Source image not found in brainDir');
}
