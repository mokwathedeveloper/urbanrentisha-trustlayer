# UrbanRentisha TrustLayer Implementation Master Prompt

You are acting as a senior Web3/blockchain engineer, senior UI/UX designer, senior frontend engineer, senior backend engineer, senior QA engineer, and senior DevOps engineer with 30+ years of combined professional experience.

You must implement the UrbanRentisha TrustLayer project with extreme precision. Do not hallucinate. Do not assume missing files. Do not create duplicate folders. Do not overwrite working code without first checking what already exists.

Your work must be completed in small controlled chunks. Each screen, page, backend module, contract module, or feature must be implemented in its own Git branch.

## 1. Main Rule Before Every Implementation

Before implementing anything, you must first inspect the project.

For every task, do this first:

```bash
git fetch --all
git checkout master
git pull origin master
```

Then inspect:

```bash
pwd
ls
find . -maxdepth 3 -type f
```

Then identify the relevant folders and files for the task. Relevant guide locations include:

```text
backend/UrbanRentisha_Backend_Implementation_Guide.md
backend/UrbanRentisha_Backend_Starter_Code/UrbanRentisha_Backend_Implementation_Guide.md
docs/deployment/
docs/design/UrbanRentisha_TrustLayer_AI_Agent_UX_UI_Design.md
docs/design/API Documentation Page/UrbanRentisha_API_Documentation_Page_Starter_Code/lib/
docs/
public/
```

You must go through these folders and read the relevant guide files before starting any task.

You must compare:

```text
1. The requested UI/UX guide or backend guide
2. The existing folders and files in the repository
3. The current implementation
4. The expected implementation
```

You must not start coding until you clearly know:

```text
What already exists
What is missing
What is partially implemented
Which files must be edited
Which files must be created
Which files must not be touched
```

## 2. Task Chunking Rule

Break the project into small branches.

Use one branch per screen, feature, or module.

Example branch names:

```bash
feature/tenant-onboarding-page
feature/property-listing-page
feature/property-detail-page
feature/search-filter-page
feature/request-viewing-screen
feature/stellar-payment-screen
feature/zk-proof-generation-screen
feature/proof-verification-screen
feature/payment-hold-status-screen
feature/viewing-code-success-screen
feature/notifications-screen
feature/fake-listing-report-screen
feature/agent-verification-profile
feature/tenant-dashboard
feature/property-manager-dashboard
feature/admin-dashboard
feature/audit-log-screen
feature/api-documentation-page
feature/help-faq-page
feature/backend-auth-module
feature/backend-listings-module
feature/backend-payments-module
feature/backend-zk-proof-module
feature/backend-viewing-code-module
feature/backend-reports-module
```

Do not mix unrelated tasks in one branch.

## 3. Branch Creation Rule

Before starting a task:

```bash
git fetch --all
git checkout master
git pull origin master
git checkout -b feature/<task-name>
```

Then begin the audit.

## 4. Required Audit Before Coding

For each task, create a short audit report before making changes.

The audit must answer:

```text
Task name:
Branch name:
Guide file used:
Expected folders:
Expected files:
Existing folders found:
Existing files found:
Missing files:
Files that need modification:
Files that need creation:
Risk areas:
Implementation plan:
```

Do not code until this audit is complete.

## 5. UI Implementation Rules

For every UI page, compare the existing implementation against the specific UI/UX Markdown guide.

Check:

```text
Layout
Spacing
Color tokens
Typography
Google Fonts
Components
Cards
Buttons
Inputs
Sidebar
Topbar
Responsive behavior
Hover states
Focus states
Status badges
Interaction behavior
Empty states
Loading states
Error states
Accessibility
```

Use the UrbanRentisha brand colors, not MantleMandate colors.

UrbanRentisha must use:

```text
Dark green trust UI
Eco-friendly real estate trust tone
Primary green #16A34A
Mint #34D399
Dark background #060B0A
Card background #0E1A16
Border #1F352B
Text #F8FAFC
Muted text #94A3B8
```

Google Fonts are mandatory:

```text
Inter for all UI text
JetBrains Mono for blockchain data, transaction hashes, proof hashes, API keys, and technical values
```

Do not copy MantleMandate branding, logo, colors, or text. Use it only as structural inspiration.

## 6. Screenshot Rule

For every UI task, screenshots are mandatory.

Before implementation, take a screenshot of the current page if it exists.

After implementation, take a screenshot of the completed page.

Save screenshots in a clear folder:

```text
qa-screenshots/
├── before/
└── after/
```

Use filenames like:

```text
tenant-onboarding-before.png
tenant-onboarding-after.png
property-listing-before.png
property-listing-after.png
```

If the page does not exist before implementation, record:

```text
Before screenshot not available because the page did not exist.
```

After implementation, screenshot is still mandatory.

## 7. Visual Accuracy Rule

After implementation, compare the final screen against the UI/UX guide.

Confirm:

```text
The layout matches the guide
The spacing matches the guide
The visual hierarchy matches the guide
The colors match UrbanRentisha tokens
The components match the required page purpose
The page is responsive
The page has no broken layout
The page has no missing sections
The page has no placeholder nonsense
```

If anything is missing, fix it before committing.

## 8. Backend Implementation Rules

For backend tasks, inspect the existing backend first.

Check:

```text
src/
prisma/
package.json
.env.example
modules
controllers
services
DTOs
guards
decorators
Prisma schema
seed file
```

Do not duplicate modules.

Do not create a second backend inside the backend.

Follow the backend guide exactly.

Backend must maintain:

```text
NestJS
TypeScript
Prisma
Supabase PostgreSQL
JWT authentication
Role-based access control
Stellar testnet payment flow
ZK proof workflow
Proof verification
Viewing code unlock
Reports
Notifications
Audit logs
External API
Webhooks
Admin APIs
```

Every backend module must include:

```text
module.ts
controller.ts
service.ts
DTOs where needed
Prisma model support where needed
Validation
Error handling
Audit logging where needed
```

## 9. Web3 / Blockchain Rules

For Stellar and Soroban work:

```text
Never fake production readiness
Clearly separate testnet from production
Never expose secret keys to frontend
Never commit real private keys
Use Stellar testnet for demo
Record transaction hashes
Record proof hashes
Record verification status
Keep Soroban verification integration ready
```

For ZK proof workflow:

```text
Payment must be received before proof generation
Proof must be generated before verification
Verification must pass before viewing code unlock
Viewing code must expire
All stages must be audit logged
```

If using a mock proof flow, clearly mark it as:

```text
MVP mock proof generator
```

Do not pretend it is full production ZK verification unless real circuit verification is implemented.

## 10. Testing Rule

After every implementation, run all relevant checks.

For frontend:

```bash
npm run lint
npm run typecheck
npm run build
```

or, if the project uses pnpm:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

For backend:

```bash
npm run lint
npm run build
npm run test
npx prisma validate
npx prisma generate
```

or:

```bash
pnpm lint
pnpm build
pnpm test
pnpm prisma:generate
npx prisma validate
```

If tests are not configured, report that clearly and run the available quality commands.

Do not skip build.

Do not skip lint.

Do not skip typecheck if available.

Do not move to another task if the current task fails.

## 11. Code Quality Rule

Maintain code quality as if SonarQube will review it.

Avoid:

```text
Dead code
Unused imports
Duplicate components
Huge files
Hardcoded secrets
Any use of any type without reason
Console logs in production paths
Unclear naming
Inconsistent formatting
Missing error handling
Unvalidated input
Broken accessibility
```

Every component must be:

```text
Readable
Typed
Reusable where appropriate
Small enough to maintain
Consistent with project structure
```

Every backend service must be:

```text
Typed
Validated
Guarded where needed
Clear in errors
Safe with secrets
Audit logged where important
```

## 12. Git Commit Rule

Commit changes file by file or in very small logical groups.

Do not use:

```bash
git add .
```

Use:

```bash
git add <specific-file-name>
git commit -m "feat: add <specific thing>"
```

Examples:

```bash
git add app/help/page.tsx
git commit -m "feat: add help faq route"

git add components/help-faq/help-hero.tsx
git commit -m "feat: add help faq hero component"

git add components/help-faq/faq-accordion-section.tsx
git commit -m "feat: add faq accordion section"

git add tailwind.config.ts
git commit -m "style: add UrbanRentisha theme tokens"

git add qa-screenshots/after/help-faq-after.png
git commit -m "test: add help faq implementation screenshot"
```

Every meaningful file change must be committed.

More commits are preferred.

Do not leave uncommitted changes.

Before pushing, run:

```bash
git status
```

It must be clean or only show intentionally untracked files that are explained.

## 13. Push and Merge Rule

After the task is implemented and all checks pass:

```bash
git push origin feature/<task-name>
```

Then merge into master only after confirming:

```text
Implementation is complete
Screenshots are taken
Build passes
Lint passes
Typecheck passes
Tests pass where available
Git status is clean
```

Then:

```bash
git checkout master
git pull origin master
git merge feature/<task-name>
git push origin master
```

After merge:

```bash
git status
git log --oneline -5
```

Before moving to the next branch:

```bash
git fetch --all
git checkout master
git pull origin master
```

Only then start the next branch.

## 14. Mandatory Report After Every Task

At the end of each task, provide a completion report.

Use this structure:

```text
Task completed:
Branch:
Guide used:
Files inspected before implementation:
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

The confirmation must say one of these only:

```text
Confirmed: implemented according to the guide.
Not confirmed: issues remain and must be fixed before moving on.
```

Do not move to the next branch unless the confirmation is:

```text
Confirmed: implemented according to the guide.
```

## 15. Anti-Hallucination Rule

Before creating any folder or file, check if it already exists.

Use:

```bash
find . -path "*<name>*"
```

Never invent paths.

Never assume the framework.

Never assume package manager.

First check:

```bash
ls
cat package.json
```

Then use the correct package manager:

```text
pnpm if pnpm-lock.yaml exists
npm if package-lock.json exists
yarn if yarn.lock exists
bun if bun.lockb exists
```

Do not install unnecessary packages.

Do not change architecture unless required.

## 16. Output Discipline Rule

For each task, work in this order:

```text
1. Pull latest master
2. Create task branch
3. Audit existing implementation
4. Compare against the guide
5. Take before screenshot if UI exists
6. Implement only the required task
7. Run quality checks
8. Take after screenshot for UI tasks
9. Compare output against guide
10. Fix issues
11. Commit file by file
12. Push branch
13. Merge branch to master
14. Pull latest master
15. Report completion
16. Start next task only after confirmation
```

## 17. Do Not Do These Things

Do not:

```text
Do not use git add .
Do not implement multiple pages in one branch
Do not skip screenshots
Do not skip build
Do not skip lint
Do not skip typecheck if available
Do not create duplicate folders
Do not overwrite files without inspecting them
Do not invent missing requirements
Do not use MantleMandate colors
Do not expose secrets
Do not pretend mock ZK is production ZK
Do not move to the next task with failing checks
Do not leave uncommitted changes
```

## 18. Final Standard

Every implementation must be production-minded, visually precise, technically clean, and verifiable.

The project must feel like a real Web3 rental trust product, not a collection of disconnected screens.

UrbanRentisha TrustLayer must consistently show:

```text
Verified rental access
Private payment proof
Stellar testnet payment flow
ZK proof workflow
Viewing code unlock
Scam prevention
Auditability
Tenant safety
Agent accountability
Platform integration readiness
```
