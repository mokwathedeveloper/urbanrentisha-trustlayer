# UrbanRentisha TrustLayer QA Testing Guide

## 1. Purpose

This QA guide defines how every UrbanRentisha TrustLayer implementation must be tested before it is accepted, committed, pushed, and merged.

UrbanRentisha TrustLayer is a Web3 rental trust product. Quality assurance must verify that the product is visually accurate, technically stable, secure, accessible, and aligned with the intended trust flow.

QA must cover:

```text
Frontend UI accuracy
Responsive behavior
Accessibility
Backend API behavior
Database integrity
Authentication and authorization
Stellar testnet payment flow
ZK proof workflow
Viewing code unlock flow
Reports and safety workflows
Audit logs
External API behavior
Code quality
Build stability
Regression risk
```

No task is complete until QA confirms that the implementation matches the guide and passes all required checks.

---

## 2. Core QA Principle

Claude must test before claiming completion.

Every task must follow this rule:

```text
Inspect first.
Implement carefully.
Test thoroughly.
Take screenshots.
Fix issues.
Commit file by file.
Push branch.
Merge only after confirmation.
```

Claude must never say a task is complete until the implementation has been compared against the correct UI/UX or backend guide.

---

## 3. QA Workflow for Every Task

For every page, screen, module, or feature, follow this workflow:

```text
1. Pull latest main
2. Create feature branch
3. Inspect existing implementation
4. Compare existing files against the guide
5. Record missing or incomplete items
6. Take before screenshot for UI tasks
7. Implement the task
8. Run lint
9. Run typecheck
10. Run build
11. Run tests
12. Run manual QA
13. Take after screenshot
14. Compare final implementation against the guide
15. Fix all issues
16. Commit changes file by file
17. Push branch
18. Merge to main only after confirmation
19. Pull latest main before the next task
```

Required Git start:

```bash
git fetch --all
git checkout main
git pull origin main
git checkout -b feature/<task-name>
```

Required Git finish:

```bash
git status
git push origin feature/<task-name>
git checkout main
git pull origin main
git merge feature/<task-name>
git push origin main
git fetch --all
git pull origin main
```

---

## 4. Mandatory Pre-QA Audit

Before testing or coding, Claude must inspect the repository.

Run:

```bash
pwd
ls
find . -maxdepth 3 -type f
cat package.json
```

Then identify the package manager:

```text
Use pnpm if pnpm-lock.yaml exists.
Use npm if package-lock.json exists.
Use yarn if yarn.lock exists.
Use bun if bun.lockb exists.
```

Claude must write this audit before implementation:

```text
Task name:
Branch name:
Guide file used:
Existing implementation found:
Expected folders:
Expected files:
Files already present:
Files missing:
Files requiring modification:
Testing strategy:
Screenshot requirement:
Risk areas:
```

Claude must not implement blindly.

---

## 5. Frontend QA Checklist

Every frontend page must be tested against the relevant UI/UX Markdown guide.

Check the following:

```text
Correct route exists
Correct page title exists
Correct layout structure exists
Sidebar exists where required
Topbar exists where required
All required sections are present
No required section is missing
Spacing follows the guide
Cards follow the guide
Buttons follow the guide
Inputs follow the guide
Tables follow the guide
Badges follow the guide
Status labels are visible
Icons match the page purpose
Responsive layout works
Mobile layout stacks correctly
Desktop layout uses correct grid
No broken overflow
No clipped content
No unreadable text
No placeholder nonsense
No MantleMandate branding
No MantleMandate blue theme
UrbanRentisha colors are used
Google Fonts are loaded
Inter is used for normal UI text
JetBrains Mono is used for hashes and technical data
```

UrbanRentisha colors must be preserved:

```text
Background: #060B0A
Card: #0E1A16
Sidebar: #07100D
Border: #1F352B
Primary: #16A34A
Primary hover: #15803D
Mint: #34D399
Success: #22C55E
Warning: #F59E0B
Error: #EF4444
Text: #F8FAFC
Muted: #94A3B8
```

---

## 6. UI Screenshot QA

Screenshots are mandatory for every UI task.

Before implementation:

```text
qa-screenshots/before/<screen-name>-before.png
```

After implementation:

```text
qa-screenshots/after/<screen-name>-after.png
```

If the page does not exist before implementation, record:

```text
Before screenshot not available because the page did not exist.
```

The after screenshot must still be taken.

Screenshot QA must confirm:

```text
The page loads
The page is not blank
The layout matches the guide
The visual hierarchy is clear
The color system is correct
Cards and panels align properly
No horizontal overflow appears
Text is readable
Buttons are visible
Status badges are visible
Responsive behavior is acceptable
```

Recommended screenshot sizes:

```text
Desktop: 1440px width
Laptop: 1280px width
Tablet: 768px width
Mobile: 375px width
```

At minimum, capture desktop and mobile.

---

## 7. Responsive QA

Every screen must be tested at these widths:

```text
375px mobile
768px tablet
1280px desktop
1440px wide desktop
```

Check:

```text
Sidebar collapses or hides correctly
Topbar remains usable
Cards stack correctly
Tables do not break the layout
Text wraps cleanly
Buttons remain tappable
No content is hidden off-screen
No element overlaps another element
Touch targets are at least 44px on mobile
```

Failure examples:

```text
Horizontal scrolling caused by wide table
Buttons overlapping
Sidebar covering content
Cards squeezed too tightly
Hash values breaking layout
Text contrast too low
```

All failures must be fixed before completion.

---

## 8. Accessibility QA

Accessibility is mandatory.

Check:

```text
All buttons have visible text or aria-label
All links are keyboard accessible
All inputs have labels
Search inputs have screen-reader labels
Focus states are visible
Color is not the only status indicator
Status badges include text and icon
Error messages explain what failed
Text contrast is readable
Tables have readable headers
Accordion controls are keyboard accessible
No important action is hidden behind hover only
```

Minimum standard:

```text
WCAG 2.1 AA for normal text
Visible focus rings
Keyboard navigation support
Readable labels
No color-only state communication
```

For FAQ accordions, confirm:

```text
Accordion opens
Accordion closes
Question remains visible
Answer is readable
Keyboard access works
```

---

## 9. Code Quality QA

Code must be reviewed as if SonarQube will inspect it.

Check:

```text
No unused imports
No dead code
No duplicate components
No duplicate folders
No hardcoded secrets
No unnecessary any type
No console.log in production paths
No unclear variable names
No massive unmaintainable files
No repeated logic that should be shared
No broken TypeScript types
No missing DTO validation
No missing error handling
No direct database access outside service layer
```

Frontend components should be:

```text
Typed
Readable
Reusable where appropriate
Small enough to maintain
Consistent with folder structure
Consistent with UrbanRentisha design system
```

Backend modules should be:

```text
Typed
Validated
Guarded
Testable
Audit logged where important
Secure with secrets
Consistent with NestJS structure
```

---

## 10. Required Frontend Commands

Run these after every frontend implementation.

For pnpm:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

For npm:

```bash
npm run lint
npm run typecheck
npm run build
```

For yarn:

```bash
yarn lint
yarn typecheck
yarn build
```

If one command is missing, report it clearly:

```text
typecheck script is not configured in package.json.
```

Then run all available equivalent commands.

Do not skip build.

Do not skip lint.

Do not skip typecheck when available.

---

## 11. Backend QA Checklist

Every backend module must be tested for:

```text
Correct module structure
Correct controller
Correct service
Correct DTOs
Correct guards
Correct role protection
Correct Prisma models
Correct database relationships
Correct error handling
Correct audit logging
Correct API response shape
Correct validation
Correct environment variable usage
No exposed secrets
No duplicate modules
No direct unsafe user input
```

Backend must follow:

```text
NestJS module pattern
Controller handles HTTP
Service handles business logic
DTO validates request body
Prisma handles database
Guards protect private endpoints
Roles protect admin endpoints
Audit logs record important actions
```

---

## 12. Required Backend Commands

Run:

```bash
pnpm lint
pnpm build
pnpm test
npx prisma validate
pnpm prisma:generate
```

or with npm:

```bash
npm run lint
npm run build
npm run test
npx prisma validate
npx prisma generate
```

If tests are not configured, report:

```text
Test script is not configured or no tests exist yet.
```

But build, lint, and Prisma validation must still run.

---

## 13. API Testing QA

For backend APIs, Claude must test the expected API flow.

Minimum API test flow:

```text
Register user
Login user
Get current user
Create listing
Get listing
Create viewing request
Create payment intent
Confirm payment
Generate ZK proof
Submit proof verification
Generate viewing code
Verify viewing code
Submit report
Get audit logs as admin
Get admin dashboard as admin
```

Required API behavior:

```text
Invalid input returns validation error
Unauthorized request is rejected
Wrong role is rejected
Missing record returns not found
Payment must exist before proof
Proof must exist before verification
Verification must pass before viewing code
Reports create audit logs
Admin-only routes require ADMIN role
```

---

## 14. Web3 / Stellar QA

For Stellar testnet-related features, verify:

```text
Testnet is clearly labeled
Destination wallet comes from environment variable
Secret key is never exposed to frontend
Transaction hash is stored
Payment status changes correctly
Memo/reference is generated
Failed transaction lookup is handled clearly
Duplicate confirmation risk is considered
```

Minimum Stellar QA:

```text
Payment intent returns destination wallet
Payment intent returns memo
Payment confirmation accepts txHash
Invalid txHash is handled
Payment status becomes RECEIVED after confirmation
Audit log records payment.received
```

Production warnings must remain clear:

```text
Testnet is not real-money settlement
Production requires amount validation
Production requires destination validation
Production requires memo validation
Production requires duplicate transaction protection
```

---

## 15. ZK Proof QA

For ZK proof workflow, test the sequence strictly.

Correct sequence:

```text
Viewing request created
Payment intent created
Payment confirmed
Proof generated
Proof submitted for verification
Proof verified
Viewing code unlocked
```

Invalid sequence tests:

```text
Cannot generate proof before payment is received
Cannot verify proof before proof is generated
Cannot unlock viewing code before proof is verified
Cannot reuse expired or revoked viewing code
```

If mock proof is used, it must be labeled:

```text
MVP mock proof generator
```

Claude must not describe mock ZK as production-grade ZK.

---

## 16. Viewing Code QA

Viewing code testing must verify:

```text
Code is generated only after proof verification
Code has expiry time
Code has status
Code can be verified
Expired code returns invalid
Revoked code returns invalid
Used code can be handled later
Viewing request status becomes ACCESS_UNLOCKED
Audit log records viewing_code.unlocked
```

Expected statuses:

```text
LOCKED
ACTIVE
USED
EXPIRED
REVOKED
```

---

## 17. Reports and Safety QA

Reports must be tested for:

```text
Fake listing report creation
Unsafe payment report creation
Agent mismatch report creation
Wrong property report creation
Suspicious behavior report creation
Report severity assignment
Report status creation
Audit log creation
Admin visibility
```

A report must include:

```text
reportType
description
reporterId
listingId or viewingRequestId where available
status
severity
createdAt
```

Safety reports must not disappear silently.

---

## 18. Audit Log QA

Audit logs are critical.

Every important trust event must create an audit log.

Required audit actions:

```text
user.registered
listing.created
listing.verified
viewing_request.created
payment_intent.created
payment.received
zk_proof.generated
proof.verified
viewing_code.unlocked
report.submitted
admin.action
external_api.request
webhook.registered
```

Audit log must include:

```text
actorId
action
entityType
entityId
severity
metadata
createdAt
```

Audit logs should be visible to admins only.

---

## 19. Security QA

Security checks are mandatory.

Check:

```text
JWT secret is not hardcoded
Database URL is not committed
Stellar secret key is not committed
Webhook secret is not committed
API keys are not stored in plain text
Passwords are hashed
Protected routes require JWT
Admin routes require ADMIN role
Validation pipes are enabled
CORS is configured intentionally
Helmet is enabled
Sensitive data is not returned in API responses
```

Never commit:

```text
.env
Private keys
Real API keys
Supabase service role key
JWT secret
Webhook signing secret
Production wallet secret
```

---

## 20. External API QA

External API testing must verify:

```text
x-api-key is required
Invalid API key is rejected
Valid API key is accepted
External viewing request body is validated
External request does not bypass safety rules
External routes are audit logged where important
```

External rental-platform integrations must never unlock viewing access directly.

They must follow:

```text
Viewing request
Payment
Proof
Verification
Viewing code
```

---

## 21. Webhook QA

Webhook registration and delivery must verify:

```text
Webhook URL is valid
Webhook event type is valid
Webhook secret is hashed
Webhook signature strategy exists
Webhook records are stored
Webhook list is admin/platform visible
```

Future delivery testing should verify:

```text
Retry behavior
Failure status
Signature verification
Timestamp tolerance
Duplicate event protection
```

---

## 22. Performance QA

Basic performance checks:

```text
Page loads quickly
No massive unused assets
No unnecessary client-side heavy logic
No repeated API calls in loops
No database query explosion
Lists use pagination when needed
Audit logs are limited or paginated
Reports are ordered and limited
Admin dashboards use aggregate queries
```

Backend list endpoints should avoid returning unlimited data.

Use:

```text
take
skip
orderBy
pagination
filters
```

---

## 23. Regression QA

Before merging, confirm that the new task did not break existing areas.

Run:

```text
Homepage or dashboard still loads
Existing routes still compile
Shared components still work
Auth still works
Listings still work
Viewing flow still works
Build still passes
No TypeScript errors introduced
No broken imports introduced
```

When shared files are changed, test all pages using those shared files.

Shared-risk files include:

```text
tailwind.config.ts
app/layout.tsx
app/globals.css
components/ui/*
lib/utils.ts
Prisma schema
Auth guards
Shared DTOs
Shared data types
```

---

## 24. Manual QA Report Template

After every implementation, Claude must provide this report:

```text
Task completed:
Branch:
Guide used:
Package manager:
Files inspected:
Files created:
Files modified:
Files not touched:
Before screenshot:
After screenshot:
Commands run:
Lint result:
Typecheck result:
Build result:
Test result:
Prisma validation result:
Manual QA result:
Responsive QA result:
Accessibility QA result:
Security QA result:
Known issues:
Fixes completed:
Final confirmation:
```

Final confirmation must be exactly one of:

```text
Confirmed: implemented according to the guide.
Not confirmed: issues remain and must be fixed before moving on.
```

Claude must not move to the next task unless the result is:

```text
Confirmed: implemented according to the guide.
```

---

## 25. File-by-File Commit QA

Claude must not use:

```bash
git add .
```

Claude must commit file by file or in very small logical groups.

Correct:

```bash
git add app/help/page.tsx
git commit -m "feat: add help faq route"

git add components/help-faq/help-hero.tsx
git commit -m "feat: add help hero component"

git add components/help-faq/faq-accordion-section.tsx
git commit -m "feat: add faq accordion section"

git add qa-screenshots/after/help-faq-after.png
git commit -m "test: add help faq screenshot"
```

Before push:

```bash
git status
```

Working tree must be clean.

---

## 26. Pull, Push, and Merge QA

Before starting:

```bash
git fetch --all
git checkout main
git pull origin main
git checkout -b feature/<task-name>
```

After implementation:

```bash
git status
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

Then:

```bash
git push origin feature/<task-name>
git checkout main
git pull origin main
git merge feature/<task-name>
git push origin main
```

Before next task:

```bash
git fetch --all
git checkout main
git pull origin main
```

---

## 27. Definition of Done

A task is complete only when:

```text
The correct branch was used
Existing implementation was inspected
Correct guide was followed
Before screenshot was taken or documented as unavailable
Implementation matches the guide
All required files exist
No duplicate folders were created
No unrelated files were changed
Lint passes
Typecheck passes
Build passes
Tests pass where available
Prisma validates for backend work
After screenshot was taken for UI work
Manual QA was completed
Accessibility was checked
Security was checked
Git commits were made file by file
Branch was pushed
Branch was merged to main
Main was pulled before next task
Completion report was written
```

---

## 28. Absolute QA Failure Conditions

The task fails QA if any of these happen:

```text
Build fails
Typecheck fails
Lint fails without explanation
Page does not load
Required section is missing
Wrong color system is used
MantleMandate branding appears
Screenshots are missing
Backend route is unprotected when it should be protected
Admin route works for non-admin user
Payment proof can be generated before payment
Viewing code unlocks before proof verification
Secrets are committed
Duplicate folders are created
git add . is used
Uncommitted changes remain
Task is merged without testing
```

Any failure must be fixed before moving on.

---

## 29. Final QA Standard

UrbanRentisha TrustLayer must behave like a real trust product.

Every QA pass must confirm:

```text
The UI is precise.
The backend is safe.
The Web3 flow is honest.
The proof flow is controlled.
The viewing code unlock is protected.
The report system supports safety.
The audit log preserves trust activity.
The implementation matches the guide.
The code is clean enough for senior review.
```
