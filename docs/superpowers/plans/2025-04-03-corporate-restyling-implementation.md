# Corporate Professional Restyling - Implementation Plan

**Design Spec:** `docs/superpowers/specs/2025-04-03-corporate-restyling-design.md`

---

## Phase 0: Setup (Prerequisites)

### Task 0.1: Create worktree for isolated development
- Create git worktree: `git worktree add .claude/worktrees/restyling-corporate`
- Work on branch: `feature/corporate-restyling`
- **Verification:** Worktree created, on correct branch

### Task 0.2: Create directory structure
- Create `accounting-app/frontend/src/styles/` directory
- **Verification:** Directory exists and is empty

---

## Phase 1: Foundation (Theme System)

### Task 1.1: Create tailwind.config.js
**File:** `accounting-app/frontend/tailwind.config.js`

**Content:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#1A80AA',
          'primary-dark': '#163C6C',
          secondary: '#25638C',
          surface: '#F7F9FB',
          white: '#FFFFFF',
          border: '#D8E1E8',
          text: {
            dark: '#10243A',
            medium: '#5C6B7A',
            light: '#7B8A97',
          },
        },
      },
      spacing: {
        // Maintain 24px base grid
        'page': '24px',
      },
      shadows: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '8px',
        'input': '6px',
      },
    },
  },
  plugins: [],
}
```

**Verification:** File created, no syntax errors

### Task 1.2: Create theme.css
**File:** `accounting-app/frontend/src/styles/theme.css`

**Content:**
```css
/* Theme CSS Variables */
:root {
  --color-primary: #1A80AA;
  --color-primary-dark: #163C6C;
  --color-secondary: #25638C;
  --color-surface: #F7F9FB;
  --color-white: #FFFFFF;
  --color-border: #D8E1E8;
  --color-text-dark: #10243A;
  --color-text-medium: #5C6B7A;
  --color-text-light: #7B8A97;

  --spacing-base: 24px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  --radius-card: 8px;
  --radius-input: 6px;

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);

  --font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Global Typography */
body {
  font-family: var(--font-family);
  color: var(--color-text-dark);
  background-color: var(--color-white);
  line-height: 1.6;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary-dark);
  letter-spacing: -0.5px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
}

h4 {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-dark);
}

/* Utility Classes */
.text-secondary {
  color: var(--color-text-medium);
}

.text-tertiary {
  color: var(--color-text-light);
}

.text-primary {
  color: var(--color-primary);
}
```

**Verification:** File created, valid CSS

### Task 1.3: Create components.css
**File:** `accounting-app/frontend/src/styles/components.css`

**Content:**
```css
/* Button Components */
.btn-primary {
  @apply bg-brand-primary text-white font-semibold px-4 py-2.5 rounded-input cursor-pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  @apply bg-opacity-90;
  background-color: #0F5A7A;
}

.btn-primary:focus {
  @apply outline-none ring-2 ring-brand-primary ring-offset-2;
}

.btn-primary:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.btn-secondary {
  @apply border-2 border-brand-secondary text-brand-secondary font-semibold px-4 py-2 rounded-input cursor-pointer bg-transparent;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  @apply bg-blue-50;
  background-color: #F0F6FA;
}

.btn-secondary:focus {
  @apply outline-none ring-2 ring-brand-secondary ring-offset-2;
}

/* Card Component */
.card {
  @apply bg-white border border-brand-border rounded-card shadow-sm p-6;
}

.card-title {
  @apply text-xl font-semibold text-brand-primary-dark mb-4;
}

.card-sm {
  @apply bg-white border border-brand-border rounded-card shadow-sm p-5;
}

.card-md {
  @apply bg-white border border-brand-border rounded-card shadow-sm p-6;
}

.card-lg {
  @apply bg-white border border-brand-border rounded-card shadow-sm p-6;
}

/* Table Components */
.table-container {
  @apply bg-white border border-brand-border rounded-card overflow-hidden;
}

.table-header {
  @apply bg-brand-surface border-b border-brand-border;
}

.table-header th {
  @apply px-4 py-3 text-left font-semibold text-brand-primary-dark text-sm;
}

.table-body tr {
  @apply border-b border-brand-border;
}

.table-body tr:hover {
  @apply bg-brand-surface;
}

.table-body td {
  @apply px-4 py-3 text-sm text-brand-text-dark;
}

/* Form Components */
.form-group {
  @apply mb-4;
}

.form-label {
  @apply block text-xs font-semibold text-brand-text-dark mb-1;
}

.form-input {
  @apply w-full border border-brand-border rounded-input px-3 py-2 text-sm font-family: Inter;
  color: var(--color-text-dark);
  background-color: var(--color-white);
  transition: all 0.2s ease;
}

.form-input:focus {
  @apply outline-none ring-2 ring-brand-primary border-brand-primary;
}

.form-input::placeholder {
  color: var(--color-text-light);
}

/* Navbar Component */
.navbar {
  @apply bg-brand-primary-dark text-white shadow-sm;
  height: 64px;
}

.navbar-content {
  @apply flex items-center justify-between h-full px-6;
}

.navbar-brand {
  @apply text-2xl font-bold;
  letter-spacing: -0.5px;
}

.navbar-link {
  @apply text-white px-3 py-2 text-sm transition-colors;
  cursor: pointer;
}

.navbar-link:hover {
  @apply text-brand-primary;
}

.navbar-link.active {
  @apply text-brand-primary border-b-2 border-brand-primary;
}

/* Badge Component */
.badge {
  @apply inline-block bg-brand-surface text-brand-text-medium px-2 py-1 rounded text-xs font-medium;
}

.badge-primary {
  @apply bg-blue-100 text-brand-primary;
}

.badge-secondary {
  @apply bg-slate-200 text-brand-secondary;
}

/* Spacing Utilities */
.section-spacing {
  @apply mb-8;
}

.form-spacing {
  @apply mb-4;
}

/* Loading State */
.loading {
  @apply text-center p-8 text-brand-text-medium;
}

/* Error State */
.error-text {
  @apply text-red-600 text-sm mt-1;
}

.error-input {
  @apply border-red-500 ring-red-200;
}
```

**Verification:** File created, valid CSS, no Tailwind conflicts

### Task 1.4: Update index.css
**File:** `accounting-app/frontend/src/index.css`

**Change:**
```css
@import './styles/theme.css';
@import './styles/components.css';
@import "tailwindcss";
```

**Verification:** File updated, imports in correct order

---

## Phase 2: Core Components Refactoring

### Task 2.1: Refactor Navbar
**File:** `accounting-app/frontend/src/components/Navbar.jsx`

**Changes:**
- Replace all hardcoded `bg-slate-800` with `navbar` class
- Replace `hover:text-emerald-300` with `navbar-link:hover` (uses brand-primary)
- Update button styling to use `.btn-primary` and `.btn-secondary` classes
- Keep hamburger menu functionality
- Use brand colors from Tailwind config

**Key changes:**
- `bg-slate-800` → `navbar` class
- `text-emerald-400` → `text-white` (brand already in CSS)
- `hover:bg-emerald-700` → use `.btn-primary` and `.btn-secondary`
- `bg-slate-700` → use `.btn-secondary`

**Verification:**
- Navbar renders correctly
- Dropdown menu still works
- Colors match brand palette
- Test on mobile hamburger menu

### Task 2.2: Refactor Login page
**File:** `accounting-app/frontend/src/pages/Login.jsx`

**Changes:**
- Wrap form container with `.card` class
- Update form inputs to use `.form-input` and `.form-label`
- Update button to `.btn-primary`
- Title styling: use h2 classes
- Update all hardcoded colors to use Tailwind brand classes

**Verification:**
- Form renders with proper styling
- Focus states work
- Button hover state matches brand
- Form is centered and properly sized

### Task 2.3: Refactor Dashboard
**File:** `accounting-app/frontend/src/pages/Dashboard.jsx`

**Changes:**
- Page title: use h1 classes (32px, brand-dark)
- Metric cards: replace color-based backgrounds with white cards, add borders
  - Use `.card` or `.card-sm` class
  - Move color to subtle badge or icon
  - Keep numbers large and readable
- Action buttons: use `.btn-primary` class
- Table: use `.table-container`, `.table-header`, `.table-body` classes
- Replace `hover:bg-slate-50` with card hover states

**Key changes:**
```
old: <div className={`${card.color} text-white rounded-lg p-5 shadow`}>
new: <div className="card">
      <p className="form-label">{card.label}</p>
      <p className="text-3xl font-bold text-brand-primary">{value}</p>
     </div>
```

**Verification:**
- Dashboard loads with new styling
- Cards are white with borders
- Table is clean and readable
- Buttons match brand colors
- All metrics visible and properly formatted

---

## Phase 3: Secondary Screens

### Task 3.1: Refactor Transactions page
**File:** `accounting-app/frontend/src/pages/Transactions.jsx`

**Changes:**
- Apply `.card` to filter section
- Use `.form-input`, `.form-label` for all inputs
- Update table styling with `.table-container`, `.table-header`, `.table-body`
- Update action buttons to `.btn-primary` and `.btn-secondary`
- Replace hardcoded colors with brand Tailwind classes

**Verification:**
- Form section styled correctly
- Table displays all data properly
- Edit/delete buttons visible and styled
- Filters work correctly

### Task 3.2: Refactor Accounts page
**File:** `accounting-app/frontend/src/pages/Accounts.jsx`

**Changes:**
- Use `.card` for account cards
- Update color badges to use muted brand colors instead of bright colors
  - Asset: light teal
  - Liability: light blue
  - Equity: light purple
  - Revenue: light green
  - Expense: light orange
- Update table styling
- Update form inputs
- Update buttons

**Verification:**
- Accounts display in cards
- Category colors are muted/professional
- All data visible
- Forms work correctly

### Task 3.3: Refactor Forms (Salaries, Employees, Periods)
**File:** `accounting-app/frontend/src/pages/Salaries.jsx`, `Employees.jsx`, `Periods.jsx`

**Changes for each:**
- Wrap forms in `.card` container
- Use `.form-group`, `.form-label`, `.form-input` for all inputs
- Update buttons to `.btn-primary` and `.btn-secondary`
- Use h2 for page titles
- Update any tables with `.table-*` classes

**Verification:**
- All forms styled consistently
- Inputs are aligned and properly spaced
- Submit/cancel buttons visible
- Forms are centered and readable

---

## Phase 4: Polish & Responsive

### Task 4.1: Refactor Reports page
**File:** `accounting-app/frontend/src/pages/Reports.jsx`

**Changes:**
- Apply card styling to report sections
- Update table styling for premium look
- Use h2/h3 for section headers
- Update any filter controls

**Verification:**
- Reports display properly
- Tables are clean and readable
- All data visible

### Task 4.2: Mobile Responsiveness
**File:** Multiple (all pages)

**Changes:**
- Add `md:` and `sm:` breakpoint adjustments to spacing
- Reduce padding on mobile: `p-6 md:p-5 sm:p-4`
- Adjust heading sizes: `text-2xl sm:text-xl`
- Stack elements vertically on mobile

**Verification:**
- Test on phone viewport (375px width)
- Test on tablet viewport (768px width)
- All text readable
- Buttons are tappable (44px+ height)
- No horizontal scroll

### Task 4.3: Cross-browser Testing
**Changes:** Test on:
- Chrome/Chromium
- Firefox
- Safari
- Mobile Safari

**Verification:** All pages render correctly, colors match, spacing consistent

---

## Phase 5: Final Testing & Deployment

### Task 5.1: Full Feature Testing
**Checklist:**
- ✅ Login/logout works
- ✅ All navigation works
- ✅ Dashboard loads and displays metrics
- ✅ Transactions can be created/edited/deleted
- ✅ All forms submit correctly
- ✅ Tables display all data
- ✅ Filters work
- ✅ Reports generate

**Verification:** No functionality broken

### Task 5.2: Visual Review
**Checklist:**
- ✅ Colors match brand palette
- ✅ Typography hierarchy is clear
- ✅ Spacing is generous (24px base grid)
- ✅ Shadows are subtle
- ✅ Cards have proper borders
- ✅ Focus states visible
- ✅ Hover states work
- ✅ Mobile looks professional

**Verification:** Visual sign-off

### Task 5.3: Commit & Deploy
**Steps:**
1. Run `git add -A`
2. Commit with message: "refactor: Corporate professional restyling - complete visual overhaul"
3. Push to main branch
4. Verify Vercel deployment completes
5. Test on production URL

**Verification:**
- ✅ All commits clean
- ✅ Vercel build succeeds
- ✅ Production URL loads correctly
- ✅ Tested on phone and desktop

---

## Rollback Plan

If critical issues found:
1. Revert to previous commit
2. Fix specific issue on feature branch
3. Re-test before deploying

---

## Success Criteria

✅ All pages styled with new color palette
✅ Typography hierarchy consistent (32px h1, 24px h2, etc.)
✅ Cards, tables, forms use semantic component classes
✅ Navigation matches brand-dark theme
✅ All buttons use brand-primary for primary actions
✅ Spacing is generous (24px base grid)
✅ Shadows are subtle (only sm/md levels)
✅ Mobile responsive and tested
✅ All functionality preserved
✅ Production deployed and verified
