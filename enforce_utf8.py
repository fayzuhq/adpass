import os
import glob

files = glob.glob('adpass-dashboard/src/**/*.tsx', recursive=True) + \
        glob.glob('adpass-dashboard/src/**/*.ts', recursive=True)

for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Processed: {file}")
    except Exception as e:
        print(f"Error processing {file}: {e}")
