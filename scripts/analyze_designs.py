import csv
import json

def analyze():
    with open('.agents/skills/ui-ux-pro-max/data/styles.csv', encoding='utf-8') as f:
        styles = list(csv.DictReader(f))
    
    with open('.agents/skills/ui-ux-pro-max/data/landing.csv', encoding='utf-8') as f:
        landings = list(csv.DictReader(f))

    with open('.agents/skills/ui-ux-pro-max/data/ux-guidelines.csv', encoding='utf-8') as f:
        ux = list(csv.DictReader(f))

    print(f"Total design styles evaluated: {len(styles)}")
    print(f"Total landing patterns evaluated: {len(landings)}")
    print(f"Total UX guidelines evaluated: {len(ux)}")

    minimal_styles = []
    for s in styles:
        text = (s.get('Keywords', '') + ' ' + s.get('Style Category', '') + ' ' + s.get('Aliases', '') + ' ' + s.get('Description', '')).lower()
        if any(term in text for term in ['minimal', 'swiss', 'clean', 'simple', 'direct', 'clarity', 'focus']):
            minimal_styles.append(s)

    print(f"\n--- Top Minimal Design Patterns Found: {len(minimal_styles)} ---")
    for s in minimal_styles[:12]:
        print(f"• ID: {s.get('Style ID')}")
        print(f"  Category: {s.get('Style Category')}")
        print(f"  Keywords: {s.get('Keywords')}")
        print(f"  Checklist / AI Prompt: {s.get('AI Prompt Keywords', '')[:120]}")
        print(f"  Colors: {s.get('Primary Colors')}")
        print()

    print("--- Top Landing Page Layout Patterns for Simplicity & Ease ---")
    for l in landings:
        desc = (l.get('Description', '') + ' ' + l.get('Pattern Name', '') + ' ' + l.get('Conversion Strategy', '')).lower()
        if any(k in desc for k in ['minimal', 'direct', 'fast', 'simple', 'clean', 'hero', 'friction']):
            print(f"• Pattern: {l.get('Pattern Name')}")
            print(f"  Conversion Strategy: {l.get('Conversion Strategy', '')[:150]}")
            print(f"  Section Order: {l.get('Section Order')}")
            print()

if __name__ == '__main__':
    analyze()
