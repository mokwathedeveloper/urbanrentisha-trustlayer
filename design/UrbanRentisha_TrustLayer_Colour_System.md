# UrbanRentisha TrustLayer Colour System

## Version

**Document:** Colour Palette and Visual Direction  
**Product:** UrbanRentisha TrustLayer  
**Repository:** `urbanrentisha-trustlayer`  
**Product Type:** ZK rental payment proof and verified property access layer on Stellar  
**Design Direction:** Minimalist / Swiss + Bento Grid + Light SaaS Dashboard  

---

## 1. Colour Strategy

UrbanRentisha TrustLayer should feel trustworthy, secure, modern, professional, and human. The product handles rental trust, payment proof, verified property access, and anti-scam protection, so the colour system must communicate safety, clarity, verification, and financial confidence.

The interface should avoid looking like a speculative crypto product. It should look like a serious rental trust infrastructure platform that can be used by tenants, rental marketplaces, property managers, agencies, landlords, and administrators.

The recommended visual feeling is:

- Trustworthy
- Secure
- Clean
- Modern
- Professional
- SaaS-ready
- Locally relevant
- Easy to understand
- Calm under pressure
- Strong enough for fintech and property workflows

---

## 2. Final Brand Palette

| Role | Colour Name | Hex Code | Purpose |
|---|---|---:|---|
| Primary | Trust Teal | `#0F766E` | Main brand actions, primary CTA, active states, trust cues |
| Dark Primary | Stellar Navy | `#0F172A` | Headers, sidebar, hero text, authority sections |
| Secondary | Clean Sky Blue | `#2563EB` | Links, proof actions, API elements, technical highlights |
| Accent | Access Gold | `#F59E0B` | Viewing codes, access unlock, reservation highlights |
| Success | Verified Green | `#16A34A` | Verified status, proof success, access approved |
| Warning | Pending Orange | `#EA580C` | Pending payment, escrow review, incomplete steps |
| Error | Scam Alert Red | `#DC2626` | Failed proof, reported listing, suspicious activity |
| Background | Soft Cloud | `#F8FAFC` | Main app background |
| Surface | White | `#FFFFFF` | Cards, modals, panels, forms |
| Muted Background | Soft Slate | `#F1F5F9` | Secondary sections, filters, inactive containers |
| Border | Light Slate | `#E2E8F0` | Card borders, dividers, input borders |
| Primary Text | Deep Navy | `#0F172A` | Main headings and body text |
| Secondary Text | Slate Grey | `#475569` | Supporting copy and secondary labels |
| Muted Text | Muted Slate | `#64748B` | Helper text, metadata, timestamps |

---

## 3. Primary Colour

### Trust Teal

```text
#0F766E
```

Use Trust Teal for:

- Main buttons
- “Request Viewing” CTA
- Active dashboard navigation
- Primary action states
- Brand highlights
- Secure payment cues
- Important trust-layer actions

### Why it fits

Trust Teal feels secure, calm, financial, and modern. It provides stronger product credibility than bright green and feels more mature than typical crypto purple or neon colours. It works especially well for rental trust, payment verification, and privacy-preserving access.

---

## 4. Dark Primary Colour

### Stellar Navy

```text
#0F172A
```

Use Stellar Navy for:

- Dashboard sidebar
- Top navigation
- Hero headings
- Product authority sections
- Footer
- Admin dashboard framing
- Serious trust and security messaging

### Why it fits

Stellar Navy gives the product a strong institutional feel. It supports the fintech and smart-contract side of the product without making the interface feel too technical or intimidating.

---

## 5. Secondary Colour

### Clean Sky Blue

```text
#2563EB
```

Use Clean Sky Blue for:

- Links
- “View Proof Status” actions
- API documentation highlights
- Smart contract verification steps
- Technical callouts
- Informational badges
- Developer-related sections

### Why it fits

Blue communicates reliability, system clarity, and digital trust. It is useful for separating technical verification actions from tenant-facing rental actions.

---

## 6. Accent Colour

### Access Gold

```text
#F59E0B
```

Use Access Gold for:

- Viewing code highlights
- Access unlock moments
- Reservation active labels
- Important but non-danger alerts
- Premium trust moments
- Controlled access indicators

### Why it fits

Gold communicates value, access, and permission. It should be used carefully so it does not overpower the trust-first interface.

---

## 7. Status Colours

Status colours must be consistent across the entire product. Users should be able to understand status changes quickly without reading long explanations.

### Success / Verified Green

```text
#16A34A
```

Use for:

- Verified Property
- Proof Verified
- Payment Received
- Access Unlocked
- Viewing Code Generated
- Agent Verified

### Warning / Pending Orange

```text
#EA580C
```

Use for:

- Payment Pending
- Proof Pending
- Reservation Pending
- Report Under Review
- Escrow Pending
- Manual Review Required

### Error / Scam Alert Red

```text
#DC2626
```

Use for:

- Proof Failed
- Payment Failed
- Reported Listing
- Suspicious Agent
- Verification Failed
- Scam Warning

---

## 8. Neutral Colours

Neutral colours should create a clean SaaS interface with strong readability and clear hierarchy.

| Use Case | Colour | Hex Code |
|---|---|---:|
| Page background | Soft Cloud | `#F8FAFC` |
| Card background | White | `#FFFFFF` |
| Muted panel background | Soft Slate | `#F1F5F9` |
| Border and dividers | Light Slate | `#E2E8F0` |
| Primary text | Deep Navy | `#0F172A` |
| Secondary text | Slate Grey | `#475569` |
| Muted text | Muted Slate | `#64748B` |

---

## 9. UI Colour Mapping

| UI Element | Recommended Colour |
|---|---:|
| Main CTA: Request Viewing | `#0F766E` |
| Main CTA Hover | `#115E59` |
| Secondary CTA: View Proof Status | `#2563EB` |
| Verified Property Badge | `#16A34A` |
| Proof Verified Badge | `#16A34A` |
| Viewing Code Highlight | `#F59E0B` |
| Payment Pending | `#EA580C` |
| Failed Proof | `#DC2626` |
| Reported Listing | `#DC2626` |
| Dashboard Sidebar | `#0F172A` |
| Page Background | `#F8FAFC` |
| Cards and Panels | `#FFFFFF` |
| Card Border | `#E2E8F0` |
| Headings | `#0F172A` |
| Body Text | `#334155` |
| Helper Text | `#64748B` |

---

## 10. Page-Level Usage

### Landing Page

Use a bright, trustworthy interface.

Recommended structure:

- Background: `#F8FAFC`
- Hero heading: `#0F172A`
- Primary CTA: `#0F766E`
- Secondary CTA: `#2563EB`
- Trust badges: `#16A34A`
- Feature cards: `#FFFFFF`
- Borders: `#E2E8F0`

### Property Listing Page

Use a clean card-based layout.

Recommended structure:

- Page background: `#F8FAFC`
- Listing cards: `#FFFFFF`
- Verified badge: `#16A34A`
- Request Viewing button: `#0F766E`
- Report Listing button: outline with `#DC2626`
- Agent trust score highlight: `#2563EB`

### Tenant Dashboard

Use clear status visibility.

Recommended structure:

- Sidebar: `#0F172A`
- Active nav item: `#0F766E`
- Cards: `#FFFFFF`
- Status tracker success: `#16A34A`
- Status tracker pending: `#EA580C`
- Viewing code card: light gold background with `#F59E0B`

### Property Manager Dashboard

Use operational clarity.

Recommended structure:

- Sidebar: `#0F172A`
- KPI cards: `#FFFFFF`
- Verified requests: `#16A34A`
- Pending requests: `#EA580C`
- Reported listings: `#DC2626`
- Table borders: `#E2E8F0`

### Admin Dashboard

Use strong trust and governance cues.

Recommended structure:

- Sidebar: `#0F172A`
- Critical alerts: `#DC2626`
- Proof verification success: `#16A34A`
- Audit log neutral background: `#F1F5F9`
- Technical verification actions: `#2563EB`

---

## 11. Status Tracker Colour Rules

The proof status tracker should use colour consistently.

| Status | Colour |
|---|---:|
| Viewing requested | `#2563EB` |
| Payment pending | `#EA580C` |
| Payment received | `#16A34A` |
| Proof generated | `#2563EB` |
| Proof verified | `#16A34A` |
| Escrow active | `#F59E0B` |
| Viewing code generated | `#F59E0B` |
| Access unlocked | `#16A34A` |
| Completed | `#16A34A` |
| Failed | `#DC2626` |
| Reported | `#DC2626` |

Do not rely only on colour. Always include labels, icons, or explanatory text for accessibility.

---

## 12. Button System

### Primary Button

Use for the most important action on the page.

```text
Background: #0F766E
Text: #FFFFFF
Hover: #115E59
Disabled: #94A3B8
```

Example labels:

- Request Viewing
- Generate Proof
- Verify on Stellar
- Unlock Viewing Code

### Secondary Button

Use for supporting actions.

```text
Border: #2563EB
Text: #2563EB
Background: #FFFFFF
Hover Background: #EFF6FF
```

Example labels:

- View Proof Status
- Open Agent Profile
- See Audit Trail
- View API Docs

### Danger Button

Use only for risky or report-related actions.

```text
Border: #DC2626
Text: #DC2626
Background: #FFFFFF
Hover Background: #FEF2F2
```

Example labels:

- Report Listing
- Flag Agent
- Mark Suspicious

---

## 13. Badge System

| Badge | Background | Text |
|---|---:|---:|
| Verified Property | `#DCFCE7` | `#166534` |
| Agent Verified | `#DCFCE7` | `#166534` |
| Proof Verified | `#DCFCE7` | `#166534` |
| Payment Pending | `#FFEDD5` | `#9A3412` |
| Access Code Ready | `#FEF3C7` | `#92400E` |
| Reported | `#FEE2E2` | `#991B1B` |
| Under Review | `#DBEAFE` | `#1E40AF` |

---

## 14. Accessibility Notes

The colour system must support accessibility and usability.

Rules:

- Maintain strong contrast between text and background.
- Use dark text on light backgrounds.
- Avoid using colour alone to communicate status.
- Pair status colours with icons and labels.
- Keep CTA buttons visually distinct.
- Avoid placing gold text on white unless the text is large and bold.
- Use red only for actual risk, failure, or suspicious activity.
- Keep dashboard tables highly readable with neutral backgrounds and clear borders.
- Make focus states visible for keyboard users.

Recommended focus ring:

```text
Focus Ring: #2563EB
Focus Ring Offset: 2px
```

---

## 15. Design Style Direction

The recommended design style is:

```text
Minimalist / Swiss + Bento Grid + Light SaaS Dashboard
```

### Why this style fits

UrbanRentisha TrustLayer needs to feel like real infrastructure, not a visual experiment. A clean Swiss-inspired layout gives the product clarity and authority. Bento-style cards help organize rental listings, proof status, dashboards, audit logs, and trust scores. A light SaaS dashboard style keeps the interface professional, scalable, and easy to understand.

### Style rules

- Use clean grids.
- Use generous spacing.
- Use strong typography.
- Use modular cards.
- Keep technical flows easy to scan.
- Avoid cluttered crypto visuals.
- Avoid excessive gradients.
- Avoid dark-only interfaces.
- Avoid neon colours.
- Use colour to clarify status and action.

---

## 16. Colours to Avoid

Avoid using these as dominant brand colours:

- Neon purple
- Bright crypto green
- Heavy black backgrounds
- Overused Web3 gradients
- Excessive pink or violet
- Low-contrast pastel combinations
- Too many alert colours on one screen

These colours may make the product feel speculative, immature, or too “crypto-native.” UrbanRentisha TrustLayer should feel credible to property managers, tenants, administrators, and rental platforms.

---

## 17. Figma Colour Tokens

```text
color.brand.primary = #0F766E
color.brand.primary.dark = #115E59
color.brand.navy = #0F172A
color.brand.secondary = #2563EB
color.brand.accent = #F59E0B

color.status.success = #16A34A
color.status.warning = #EA580C
color.status.error = #DC2626
color.status.info = #2563EB

color.background.page = #F8FAFC
color.background.surface = #FFFFFF
color.background.muted = #F1F5F9

color.border.default = #E2E8F0
color.text.primary = #0F172A
color.text.secondary = #475569
color.text.muted = #64748B
```

---

## 18. Developer CSS Variables

```css
:root {
  --color-primary: #0F766E;
  --color-primary-dark: #115E59;
  --color-navy: #0F172A;
  --color-secondary: #2563EB;
  --color-accent: #F59E0B;

  --color-success: #16A34A;
  --color-warning: #EA580C;
  --color-error: #DC2626;
  --color-info: #2563EB;

  --color-bg-page: #F8FAFC;
  --color-bg-surface: #FFFFFF;
  --color-bg-muted: #F1F5F9;

  --color-border: #E2E8F0;
  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #64748B;
}
```

---

## 19. Final Recommendation

UrbanRentisha TrustLayer should use Trust Teal, Stellar Navy, Clean Sky Blue, and Access Gold as the main brand palette. Green, orange, and red should be reserved for clear product statuses.

The final interface should look like a modern SaaS trust platform for rental verification, not a generic rental app and not a heavy crypto dashboard. The colour system should help judges immediately understand three things:

1. The property is verified.
2. The payment condition has been proven.
3. Access is unlocked only after Stellar smart contract verification.

