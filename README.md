# CampusDiary — AI-Powered Campus Placement Assistant

> Your smart campus placement companion. Ask questions about companies, CTC ranges, eligibility criteria, and placement processes.

CampusDiary is a web app that helps students navigate campus placements — company details, expected CTC ranges, eligibility criteria, and the overall placement process — through a conversational AI assistant, instead of digging through scattered PDFs, WhatsApp groups, and seniors' notes.

**Live demo:** https://campusdiary-navy.vercel.app

---

## Relevance

Built to apply modern frontend engineering and product-thinking to a real problem students face every placement season:

- **Component-driven UI architecture** — built entirely on shadcn/ui + Radix primitives, so every interactive element (dialogs, dropdowns, tabs, forms) is accessible and composable by default.
- **Type safety & form validation** — TypeScript throughout, with `react-hook-form` + `zod` for schema-validated forms.
- **State & data handling** — `@tanstack/react-query` for async data fetching/caching, `recharts` for visualizing placement statistics (CTC distributions, company-wise trends, etc.).
- **Routing** — `react-router-dom` for a multi-page SPA experience (e.g. company directory, chat/assistant view).
- **Deployment** — shipped and live on Vercel, not just a local prototype.

---

## Features

<!-- Confirm/adjust this list against what's actually implemented in src/pages and src/components -->

| Feature | Description |
|---------|-------------|
| **AI Placement Assistant** | Ask natural-language questions about companies, CTC, eligibility, and placement rounds |
| **Company Directory** | Browse companies with placement-relevant details |
| **CTC Insights** | Visualized salary/CTC data via charts |
| **Eligibility Lookup** | Check eligibility criteria (CGPA, branch, backlog rules, etc.) per company |
| **Responsive UI** | Fully responsive, accessible interface built on Radix primitives |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, `tailwindcss-animate`, shadcn/ui |
| UI Primitives | Radix UI (accordion, dialog, dropdown, tabs, tooltip, etc.) |
| Forms & Validation | `react-hook-form`, `zod`, `@hookform/resolvers` |
| Data Fetching | `@tanstack/react-query` |
| Routing | `react-router-dom` |
| Charts | `recharts` |
| Notifications | `sonner` |
| Tooling | ESLint, TypeScript-ESLint, PostCSS, Autoprefixer |
| Deployment | Vercel |
| Scaffolding | Built with [Lovable](https://lovable.dev) |

---

## Project Structure

```
campusdiary/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components (shadcn/ui-based)
│   ├── pages/            # Route-level views
│   ├── ...                # (confirm exact structure against repo)
├── index.html            # Vite entry HTML
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts      # Tailwind theme/config
├── components.json          # shadcn/ui component registry config
├── tsconfig*.json             # TypeScript configs
└── package.json
```

---

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/dhawalevitthal7/campusdiary.git
cd campusdiary
```

### 2. Install dependencies
```bash
npm install
# or, since a bun.lockb is present:
bun install
```

### 3. Configure environment variables

<!-- Add this section once the AI backend/API is confirmed, e.g.: -->
```env
VITE_AI_API_KEY=your_api_key_here
```

### 4. Run the dev server
```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### 5. Build for production
```bash
npm run build
npm run preview
```

---

## Known Limitations

- The exact AI/backend integration powering the assistant isn't documented in this repo yet — worth adding a short "How the AI assistant works" section once that's finalized (client-side API call, serverless function, or external backend).
- No automated test suite currently.
- Company/CTC/eligibility data source (static JSON, CMS, or live backend) isn't documented — add a note on how content is kept up to date each placement season.

---

## Roadmap

- [ ] Document the AI assistant's data source and query pipeline
- [ ] Add automated tests (component + e2e)
- [ ] Add a data-refresh workflow for company/CTC/eligibility info each season
- [ ] Auth (if user accounts/saved searches are planned)

---

## Author

**Vitthal Dhawale**
B.Tech — AI & ML, RCOEM Nagpur
GitHub: https://github.com/vitthaldhawale

---

## License

<!-- Add a LICENSE file and note it here, e.g. MIT — free to use, modify, and distribute. -->
