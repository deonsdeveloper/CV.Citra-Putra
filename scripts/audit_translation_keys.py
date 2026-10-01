import re

with open('src/context/LanguageContext.jsx', 'r', encoding='utf-8') as f:
    lang_content = f.read()

# Extract keys from id and en in TRANSLATIONS
id_keys = set(re.findall(r'^\s*([a-zA-Z0-9_]+)\s*:', lang_content, re.MULTILINE))

import glob
all_src_files = glob.glob('src/**/*.jsx', recursive=True) + glob.glob('src/**/*.js', recursive=True)

used_keys = set()
for filepath in all_src_files:
    if 'LanguageContext.jsx' in filepath:
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        c = f.read()
    keys = re.findall(r"t\(\s*['\"]([^'\"]+)['\"]\s*\)", c)
    for k in keys:
        used_keys.add((k, filepath))

print(f"Total unique used keys: {len(used_keys)}")
missing = []
for k, path in used_keys:
    if k not in id_keys:
        missing.append((k, path))

if missing:
    print("MISSING KEYS FOUND:")
    for k, p in missing:
        print(f" - {k} (used in {p})")
else:
    print("ALL KEYS EXIST IN TRANSLATIONS! 100% CLEAN!")
