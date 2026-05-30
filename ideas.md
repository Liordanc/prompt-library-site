# Prompt Library — Design Brainstorm

<response>
<text>

## Idea 1: "Neo-Brutalist Admin Console"

**Design Movement**: Neo-Brutalism meets developer tooling — raw, bold, unapologetic interfaces with strong borders, high contrast, and playful color accents.

**Core Principles**:
1. Bold borders and hard shadows create depth without subtlety
2. Monospace typography dominates — feels like a code editor for prompts
3. Color is used sparingly but explosively — neon accents on neutral backgrounds
4. Every element has visible structure — no hidden affordances

**Color Philosophy**: A dark charcoal base (#1a1a2e) with electric cyan (#00d4ff) and hot coral (#ff6b6b) accents. The darkness evokes a terminal, while accents signal interactivity and importance. Hebrew text glows against the dark surface.

**Layout Paradigm**: Dense, panel-based layout inspired by IDE interfaces. Resizable panels, collapsible sidebars, and tabbed content areas. Information density is celebrated, not hidden.

**Signature Elements**:
- Thick 3px borders on all interactive elements
- Monospace Hebrew typography (Courier-style)
- Neon glow effects on hover states

**Interaction Philosophy**: Immediate, tactile feedback. Buttons press inward with visible displacement. Panels snap into place. No easing — everything is instant and deliberate.

**Animation**: Minimal. Only state transitions get motion — panel open/close at 150ms with no easing. Hover states are instant color swaps. Loading states use a blinking cursor aesthetic.

**Typography System**: JetBrains Mono for headings and data, system monospace for body. Hebrew rendered in Courier New or similar monospace Hebrew font.

</text>
<probability>0.05</probability>
</response>

<response>
<text>

## Idea 2: "Warm Workspace — Notion-Inspired Productivity"

**Design Movement**: Scandinavian minimalism meets warm productivity tools — think Notion, Linear, and Arc browser. Soft surfaces, generous whitespace, and a warm neutral palette that feels inviting for daily use.

**Core Principles**:
1. Warm neutrals create a calm, focused environment for managing prompts
2. Subtle depth through soft shadows and layered surfaces
3. Content-first hierarchy — UI chrome disappears, content speaks
4. Micro-interactions add life without distraction

**Color Philosophy**: Warm stone (#faf8f5) as the base, with deep ink (#1c1917) for text. A warm amber (#d97706) serves as the primary accent — energetic but not aggressive. Secondary tones in sage green (#65a30d) for success states and soft rose (#e11d48) for destructive actions. The warmth combats the coldness of typical admin panels.

**Layout Paradigm**: Asymmetric sidebar + content area. The sidebar is a persistent navigation rail (narrow, icon-first with expandable labels). The content area uses a single-column flow with generous max-width (720px for forms, 1200px for tables). Cards float on the warm background with subtle elevation.

**Signature Elements**:
- Rounded pill-shaped badges for tags and categories
- Soft inner shadows on input fields (inset feel)
- Animated gradient borders on focused/active elements

**Interaction Philosophy**: Everything feels like paper — cards lift slightly on hover, buttons depress gently. Transitions are smooth and organic, never mechanical. The interface rewards exploration with subtle reveals.

**Animation**: Entrance animations use spring physics (200-300ms, slight overshoot). Cards fade-up on mount with 40ms stagger. Sidebar items slide in from the right (RTL). Tooltips scale from 0.95 with 150ms ease-out. Page transitions use a gentle crossfade.

**Typography System**: "IBM Plex Sans Hebrew" for body text (warm, humanist sans-serif with excellent Hebrew support). "Playfair Display" or "Noto Serif Hebrew" for occasional display headings. Font weights: 400 for body, 500 for labels, 600 for headings, 700 for hero numbers on dashboard.

</text>
<probability>0.08</probability>
</response>

<response>
<text>

## Idea 3: "Glass Morphism Command Center"

**Design Movement**: Glassmorphism meets aerospace UI — translucent panels, frosted glass effects, and a deep blue-black gradient background. Inspired by Bloomberg Terminal aesthetics crossed with Apple's visionOS.

**Core Principles**:
1. Layered translucency creates depth and spatial hierarchy
2. A single dramatic gradient background anchors the entire interface
3. Light bleeds through panels — elements feel like they exist in 3D space
4. Information is organized in floating "cards" that feel like holographic displays

**Color Philosophy**: Deep space gradient (from #0f0c29 through #302b63 to #24243e) as the immovable background. Panels use rgba(255,255,255,0.05) with backdrop-blur. Primary accent is electric violet (#8b5cf6), secondary is cyan (#06b6d4). Text is pure white (#ffffff) with 60% opacity for secondary content.

**Layout Paradigm**: Floating panel grid — no traditional sidebar. Navigation lives in a frosted top bar. Content panels are arranged in a masonry-like grid that adapts to viewport. Each panel is a self-contained glass card with its own header and actions.

**Signature Elements**:
- Frosted glass panels with 20px backdrop blur
- Subtle rainbow border gradients on active panels
- Floating action buttons with glow effects

**Interaction Philosophy**: Panels respond to interaction with increased opacity and glow. Hover reveals additional depth layers. The interface feels like manipulating light — everything is luminous and responsive.

**Animation**: Panels enter with a scale(0.96) → scale(1) + opacity transition at 250ms with cubic-bezier(0.23, 1, 0.32, 1). Hover states increase backdrop-blur and border opacity over 180ms. Loading states use a pulsing glow animation. Staggered entrance for dashboard cards at 60ms intervals.

**Typography System**: "Inter" for UI elements (crisp, geometric, excellent at small sizes on glass). "Space Grotesk" for headings (futuristic, technical feel). Hebrew fallback to "Heebo" which pairs well with geometric Latin fonts. All text uses subtle text-shadow for readability on glass.

</text>
<probability>0.06</probability>
</response>
