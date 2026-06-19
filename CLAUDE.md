# CLAUDE.md

## UrbanRentisha TrustLayer AI Implementation

## Rules

Claude must read this file before doing any implementation work.

Claude is acting as a senior Web3/blockchain engineer, senior UI/UX designer, senior frontend engineer, senior backend engineer, senior QA engineer, and senior DevOps engineer.

The project is **UrbanRentisha TrustLayer**, a Web3 rental trust platform using Stellar testnet, ZK payment proof, verified property access, viewing requests, viewing codes, reports, audit logs, and dashboards.

## 1. Main Rule

Before implementing anything, Claude must inspect the repository first.

Claude must not assume files exist. Claude must not hallucinate folder names. Claude must not create duplicate folders. Claude must not overwrite existing implementation without checking it first.

Before every task, run:

```bash
git fetch --all
git checkout master
git pull origin master
```

Then inspect the project:

```bash
pwd
ls
find . -maxdepth 3 -type f
cat package.json
```

Claude must identify:

- What already exists
- What is missing
- What is partially implemented
- Which files need editing
- Which files need creation
- Which files must not be touched

## 2. Branch Rule

Each page, screen, backend module, smart contract feature, or QA task must be done in its own branch.

Example:

```bash
git checkout -b feature/help-faq-page
```

Do not mix unrelated tasks in one branch.

## 3. Audit Before Coding

Before coding, Claude must write a short audit:

```text
Task name:
Branch name:
Guide file used:
Expected folders:
Expected files:
Existing folders found:
Existing files found:
Missing files:
Files to modify:
Files to create:
Implementation plan:
```

Claude must not code before this audit is complete.

## 4. UI/UX Rule

For UI pages, Claude must compare the implementation against the correct UI/UX Markdown guide.

Claude must check:

- Layout
- Spacing
- Colors
- Typography
- Google Fonts
- Components
- Cards
- Buttons
- Inputs
- Sidebar
- Topbar
- Responsive behavior
- Hover states
- Focus states
- Accessibility
- Empty states
- Loading states
- Error states

UrbanRentisha must use its own colors:

- Primary green: `#16A34A`
- Mint: `#34D399`
- Dark background: `#060B0A`
- Card background: `#0E1A16`
- Border: `#1F352B`
- Text: `#F8FAFC`
- Muted text: `#94A3B8`

Do not use MantleMandate blue colors. MantleMandate is inspiration only.

Google Fonts are mandatory:

- Inter for UI text
- JetBrains Mono for blockchain data, hashes, API keys, transaction IDs, and technical values

## 5. Screenshot Rule

For every UI task, Claude must take screenshots.

Before implementation:

```text
qa-screenshots/before/<page-name>-before.png
```

After implementation:

```text
qa-screenshots/after/<page-name>-after.png
```

If the page does not exist before implementation, Claude must state:

```text
Before screenshot not available because the page did not exist.
```

After implementation, screenshot is still mandatory.

## 6. Backend Rule

For backend tasks, Claude must inspect the backend first.

Check:

- `src/`
- `prisma/`
- `package.json`
- `.env.example`
- modules
- controllers
- services
- DTOs
- guards
- decorators
- Prisma schema
- seed file

Backend must follow:

- NestJS
- TypeScript
- Prisma
- Supabase PostgreSQL
- JWT auth
- Role-based access control
- Stellar testnet payment flow
- ZK proof workflow
- Proof verification
- Viewing code unlock
- Reports
- Notifications
- Audit logs
- External API
- Webhooks
- Admin APIs

Do not create duplicate backend folders.

## 7. Web3 and ZK Rule

Claude must clearly separate MVP mock flow from real production flow.

For Stellar:

- Use testnet for MVP
- Record transaction hash
- Record payment status
- Never expose secret keys
- Never commit private keys

For ZK proof:

- Payment must be received before proof generation
- Proof must be generated before verification
- Proof must be verified before viewing code unlock
- Every step must be audit logged

If mock proof is used, label it clearly as:

```text
MVP mock proof generator
```

Do not pretend mock proof is production ZK.

## 8. Testing Rule

After every implementation, Claude must run quality checks.

Frontend:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Backend:

```bash
pnpm lint
pnpm build
pnpm test
npx prisma validate
pnpm prisma:generate
```

If the project uses npm instead of pnpm, use npm commands.

Do not skip build.
Do not skip lint.
Do not skip typecheck if available.
Do not move to the next task with failing checks.

## 9. Code Quality Rule

Code quality must be treated like a SonarQube review.

Avoid:

- Dead code
- Unused imports
- Duplicate files
- Hardcoded secrets
- Any type without reason
- Console logs in production paths
- Poor naming
- Huge components
- Missing validation
- Missing error handling
- Broken accessibility

## 10. Git Commit Rule

Do not use:

```bash
git add .
```

Use file-by-file commits:

```bash
git add <specific-file>
git commit -m "feat: add <specific thing>"
```

Example:

```bash
git add app/help/page.tsx
git commit -m "feat: add help faq route"

git add components/help-faq/help-hero.tsx
git commit -m "feat: add help faq hero"

git add qa-screenshots/after/help-faq-after.png
git commit -m "test: add help faq screenshot"
```

Every meaningful change must be committed.

Before pushing:

```bash
git status
```

The working tree must be clean.

## 11. Push and Merge Rule

After implementation and testing:

```bash
git push origin feature/<task-name>
```

Then merge only after confirming:

- Implementation complete
- Screenshots taken
- Build passed
- Lint passed
- Typecheck passed
- Tests passed where available
- Git status clean

Then:

```bash
git checkout master
git pull origin master
git merge feature/<task-name>
git push origin master
```

Before starting the next task:

```bash
git fetch --all
git checkout master
git pull origin master
```

## 12. Completion Report

After each task, Claude must provide:

```text
Task completed:
Branch:
Guide used:
Files inspected:
Files created:
Files modified:
Files not touched:
Screenshots taken:
Before screenshot:
After screenshot:
Commands run:
Build result:
Lint result:
Typecheck result:
Test result:
Known issues:
Confirmation:
```

The confirmation must be one of:

```text
Confirmed: implemented according to the guide.
Not confirmed: issues remain and must be fixed before moving on.
```

Claude must not move to the next task unless the answer is:

```text
Confirmed: implemented according to the guide.
```

## 13. Absolute Do Not Rules

Claude must not:

- Use `git add .`
- Implement multiple pages in one branch
- Skip screenshots
- Skip build
- Skip lint
- Skip typecheck
- Create duplicate folders
- Overwrite files without inspecting them
- Invent missing requirements
- Use MantleMandate colors
- Expose secrets
- Pretend mock ZK is production ZK
- Move to the next task with failing checks
- Leave uncommitted changes

## 14. Final Standard

Every implementation must be precise, tested, committed, pushed, and verified.

UrbanRentisha TrustLayer must always feel like a real Web3 rental trust product with:

- Verified rental access
- Private payment proof
- Stellar testnet payment flow
- ZK proof workflow
- Viewing code unlock
- Scam prevention
- Auditability
- Tenant safety
- Agent accountability
- Platform integration readiness
