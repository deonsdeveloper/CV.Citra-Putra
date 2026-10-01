import fs from 'fs';
import path from 'path';

const src = 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\7902db1f-35b5-4c6e-a69b-5d0ec340cde6\\fotoproduk1_clean_1786987793370.jpg';
const dest = path.resolve('public/assets/hero/fotoproduk1.png');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Successfully updated public/assets/hero/fotoproduk1.png');
} else {
  console.error('Source file not found:', src);
}
