# Images Directory Structure

This directory contains all static image assets for the C3 Systems website, organized by category.

## Directory Structure

```
public/images/
├── releases/     # Release artwork and related images
├── artists/      # Artist photos and promotional images
└── gear/         # Equipment photos and gear images
```

## Usage

### In Your Data Files

When referencing images from your data files (releases.ts, artists.ts, gear.ts), use relative paths starting with `/images/`:

**For releases.ts:**
```typescript
{
  artwork: "/images/releases/groove-solution-cover.jpg"
}
```

**For artists.ts:**
```typescript
{
  image: "/images/artists/slum-denizens-profile.jpg"
}
```

**For gear.ts:**
```typescript
{
  image: "/images/gear/moog-subsequent-37.jpg"
}
```

### In Components

When using images in React components, reference them with the same path:

```tsx
<img src="/images/releases/album-cover.jpg" alt="Album Cover" />
```

## File Naming Conventions

### Releases (`/images/releases/`)
- Use kebab-case naming: `album-title-cover.jpg`
- Include format suffix if needed: `album-title-vinyl.jpg`, `album-title-digital.jpg`
- Example: `groove-solution-cover.jpg`, `orbital-mechanics-vinyl.jpg`

### Artists (`/images/artists/`)
- Use artist slug format: `artist-name-profile.jpg`
- Include type suffix: `artist-name-live.jpg`, `artist-name-studio.jpg`
- Example: `slum-denizens-profile.jpg`, `luna-echo-live.jpg`

### Gear (`/images/gear/`)
- Use equipment model format: `brand-model-name.jpg`
- Keep names descriptive: `moog-subsequent-37.jpg`, `ableton-live-interface.jpg`
- Example: `elektron-digitakt.jpg`, `make-noise-0-coast.jpg`

## Supported Formats

- **Primary**: `.jpg`, `.jpeg` (recommended for photos)
- **Secondary**: `.png` (recommended for logos/graphics with transparency)
- **Optional**: `.webp` (modern format with better compression)

## Image Guidelines

### Release Artwork
- **Dimensions**: 1000x1000px minimum (square aspect ratio)
- **Quality**: High resolution for print and digital use
- **Format**: JPG for photos, PNG for graphics with text

### Artist Photos
- **Dimensions**: 800x800px minimum (square preferred)
- **Quality**: Professional headshots or performance photos
- **Format**: JPG recommended

### Gear Photos
- **Dimensions**: 600x400px minimum (3:2 aspect ratio preferred)
- **Quality**: Clear product shots with good lighting
- **Format**: JPG recommended

## Deployment

All files in the `public/images/` directory will be automatically deployed with your site and accessible at:
- Production: `https://your-domain.com/images/`
- Development: `http://localhost:3000/images/`

## Organization Tips

1. **Keep file sizes reasonable** (< 500KB for web use)
2. **Use descriptive, consistent naming**
3. **Organize by category** to maintain structure
4. **Consider creating subdirectories** for large collections (e.g., `/images/releases/2024/`)
5. **Maintain backup copies** of original high-resolution files elsewhere

## Example Directory Contents

```
public/images/
├── releases/
│   ├── groove-solution-cover.jpg
│   ├── my-electric-toothbrush-cover.jpg
│   ├── dawn-reflections-cover.jpg
│   └── orbital-mechanics-cover.jpg
├── artists/
│   ├── slum-denizens-profile.jpg
│   ├── luna-echo-profile.jpg
│   └── solar-drift-profile.jpg
└── gear/
    ├── moog-subsequent-37.jpg
    ├── elektron-digitakt.jpg
    ├── make-noise-0-coast.jpg
    └── ableton-live-12.jpg
```