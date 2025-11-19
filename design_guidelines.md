# HearthOps Dashboard - Design Guidelines

## Design Approach
**System-Based with Industrial Tech Aesthetic**
This dashboard draws inspiration from modern SaaS monitoring platforms like Datadog, Grafana, and New Relic, combined with the user's specified industrial tech palette. The design prioritizes data legibility, quick information scanning, and professional technical appeal.

## Core Design Principles
- **Clarity First**: Every metric must be instantly readable with clear hierarchy
- **Industrial Modern**: Technical sophistication without unnecessary decoration
- **Dashboard Efficiency**: Optimized for rapid data comprehension and monitoring

---

## Typography

**Font Family**
- Primary: 'Inter' or 'IBM Plex Sans' (tech-oriented, excellent for data)
- Monospace: 'IBM Plex Mono' or 'Roboto Mono' (for numerical values, timestamps)

**Type Scale**
- Main Title (H1): 2.5rem (40px), font-weight 700
- Section Subtitle (H2): 1.5rem (24px), font-weight 600
- Card Headers: 1.125rem (18px), font-weight 600
- Data Labels: 0.875rem (14px), font-weight 500, uppercase tracking
- Data Values: 1.5rem (24px), font-weight 600, monospace
- Body Text: 1rem (16px), font-weight 400
- Table Headers: 0.875rem (14px), font-weight 600, uppercase
- Table Data: 0.9375rem (15px), monospace for numbers

---

## Color Palette (User-Specified)

**Backgrounds**
- Primary Background: `#0F1419` (very dark gray, almost black)
- Card Background: `#1A1F28` (dark gray with slight blue tint)
- Table Row Hover: `#232A35`

**Text**
- Primary Text: `#E5E7EB` (light gray)
- Secondary Text: `#9CA3AF` (medium gray)
- Muted Text: `#6B7280` (darker gray for labels)

**Accent Colors**
- Tech Blue (Primary): `#3B82F6` (vibrant blue for active states)
- Tech Blue Subtle: `#1E3A8A` (dark blue for borders/backgrounds)
- Orange Highlight: `#F97316` (alert/warning states, CTAs)
- Orange Subtle: `#7C2D12` (orange background tints)
- Success Green: `#10B981` (positive indicators)
- Warning Amber: `#F59E0B` (caution states)

---

## Layout System

**Spacing Units** (Tailwind-based)
- Common units: 2, 4, 6, 8, 12, 16, 24 (e.g., p-4, mb-8, gap-6)
- Card padding: p-6 (24px) on desktop, p-4 (16px) on mobile
- Section spacing: mb-12 or mb-16 between major sections
- Grid gaps: gap-6 for card layouts

**Container**
- Max-width: `max-w-7xl` (1280px)
- Horizontal padding: px-4 on mobile, px-8 on desktop
- Centered: `mx-auto`

**Grid System**
- Responsive: Single column mobile → 2-3 columns desktop for data cards
- Table: Full-width with horizontal scroll on mobile

---

## Component Library

### 1. Header Section
- Full-width dark background with subtle gradient or border-bottom
- Title: Large, bold, tech blue or white
- Subtitle: Smaller, gray text with reduced opacity
- Padding: py-8 to py-12

### 2. Furnace Status Card
- Dark card background (`#1A1F28`)
- Border: 1px solid subtle blue (`#1E3A8A`) or transparent with shadow
- Border-radius: rounded-lg (8px)
- Structure: Grid layout with 5 data points
- Each metric:
  - Label: Small, uppercase, gray text
  - Value: Large, monospace, white/colored based on status
  - Icon or indicator: Optional colored dot for status

**Visual Treatment**
- Add subtle inner glow effect for "live" feel
- Use colored indicators (green dot for normal, orange for warning)
- Timestamp in smaller, muted text at bottom

### 3. Allocations Table
- Section header: "Allocations par secteur" with subtle divider
- Table styling:
  - Dark header row with tech blue background or border
  - Striped rows (alternating subtle background)
  - Header text: Uppercase, small, bold
  - Cell padding: py-3 px-4
  - Border: Bottom borders only, subtle gray
  - Hover state: Slight background change
- Mobile: Ensure horizontal scroll or stacked card view

### 4. Footer
- Minimal padding: py-6
- Centered, small text, very muted color
- Optional subtle top border

---

## Responsive Behavior

**Breakpoints**
- Mobile: < 768px → Single column, stacked metrics
- Tablet: 768px - 1024px → 2-column grid for metrics
- Desktop: > 1024px → 3+ column layouts, side-by-side content

**Mobile Optimizations**
- Stack all data cards vertically
- Table with horizontal scroll in container
- Reduce padding/spacing (use mobile-specific Tailwind classes)
- Increase touch target sizes for interactive elements

---

## Special Design Elements

**Data Visualization Aesthetic**
- Use monospace fonts for all numerical data
- Add subtle pulsing animation to "live" timestamp indicator
- Color-code metrics based on thresholds (green = good, orange = warning, red = critical)

**Industrial Tech Details**
- Subtle scanline effect or noise texture on dark backgrounds (very subtle, <5% opacity)
- Sharp corners and clean lines (minimal border-radius)
- Use box-shadows sparingly: subtle elevation for cards
- LED-style status indicators (small colored circles)

**Accessibility**
- Ensure 4.5:1 contrast ratio for all text
- Use semantic HTML (table, th, td, etc.)
- Add aria-labels for live-updating data regions
- Keyboard navigation support for interactive elements

---

## Animation Guidelines
**Minimal and Purposeful**
- Live data update: Subtle flash/pulse on value change
- Loading states: Simple spinner or skeleton screens
- Hover transitions: 150ms ease for background changes
- NO decorative animations - this is a data-focused dashboard

---

## Images
**No images required** - This is a data-centric dashboard where clarity and real-time information take precedence over visual imagery.