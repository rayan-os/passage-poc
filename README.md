# Passage Website

Enterprise-grade public website for Passage, built with Next.js, TypeScript, and Tailwind CSS.

## Design Philosophy

The website follows a Palantir-inspired design language with:

- **Dark theme first**: Minimal, restrained aesthetic with confidence through clarity
- **Grid-driven layout**: 12-column grid system with max-width 1200px
- **Typography hierarchy**: Display fonts for headlines, clean sans for body, mono for system labels
- **Modular components**: Reusable components built for consistency
- **Accessibility**: Semantic HTML, focus states, keyboard navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (sans/display), Space Mono (mono)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app
  /platform          # Platform overview page
  /solutions         # Solutions pages (government, employers, education)
  /trust             # Trust, security, compliance page
  /about             # About page
  /contact           # Contact page
  /insights          # Insights/blog page
  layout.tsx         # Root layout with navigation and footer
  page.tsx           # Home page
  globals.css        # Global styles and design tokens

/components
  Navigation.tsx     # Main navigation component
  Footer.tsx         # Footer component
  Hero.tsx           # Hero section component
  PlatformOverview.tsx  # Platform overview component
  PlatformCards.tsx  # Platform module cards
  HowItWorks.tsx     # Process diagram component
  SolutionsPreview.tsx  # Solutions preview component
  TrustPreview.tsx   # Trust preview component
  SectionHeader.tsx  # Reusable section header
  SolutionBlock.tsx  # Solution outcomes/capabilities block
```

## Design System

### Colors

- `background`: `#0a0a0a` (main background)
- `foreground`: `#ededed` (primary text)
- `muted`: `#2a2a2a` (muted backgrounds)
- `muted-foreground`: `#a0a0a0` (secondary text)
- `border`: `#1a1a1a` (borders)
- `accent`: `#262626` (hover states)

### Typography

- **Display**: Inter (600, 700, 800 weights) for headlines
- **Body**: Inter (regular weights) for body text
- **Mono**: Space Mono for labels and metadata

### Components

All components follow consistent patterns:
- Section labels: Small uppercase, mono font, tracking-wider
- Headlines: Display font, large sizes, bold
- Cards: Subtle borders, hover states with background change
- Buttons: Primary (filled), Secondary (outlined)

## Content Guidelines

The website follows strict content guidelines:

- **No hype copy**: Direct, factual language
- **No buzzwords without definition**: All terms are explained
- **No emojis**: Professional tone throughout
- **No invented metrics**: Only verifiable claims
- **Capabilities over outcomes**: Unverified claims phrased as capabilities

## License

Proprietary - All rights reserved.
