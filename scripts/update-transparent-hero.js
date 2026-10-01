import fs from 'fs';
import path from 'path';

const src = 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\7902db1f-35b5-4c6e-a69b-5d0ec340cde6\\chemical_floating_transparent_1787035470369.jpg';
const dest1 = path.resolve('public/assets/hero/fotoproduk1.png');
const dest2 = path.resolve('public/assets/hero/chemical-showcase.png');

fs.copyFileSync(src, dest1);
fs.copyFileSync(src, dest2);
console.log('Successfully updated fotoproduk1.png and chemical-showcase.png');
