# Masterclass Guide: Modern React & Vite App Deployment on Vercel
## Complete Technical Post-Mortem, Troubleshooting Handbook, and Teaching Notes
**Case Study Application:** BK Construction Humanity For Habitat NGO (`bkhumanity.vercel.app`)  
**Target Audience:** Computer Science Students, Bootcamp Trainees, and Junior-to-Mid Full-Stack Engineers  
**Author / Instructor:** Course Engineering Lead  
**Publication Date:** October 2026  

---

## Executive Summary & Curriculum Objectives

Deploying modern single-page web applications (SPAs) to cloud platforms like Vercel is often presented in tutorials as a simple "git push and done" operation. In reality, modern JavaScript frameworks undergo frequent toolchain updates (such as the transition between React 19, Vite 8, and Tailwind CSS v4) which introduce subtle dependency conflicts, strict package manager enforcement in automated CI/CD pipelines, and routing traps.

This handbook details the exact errors encountered during the live deployment of the **BK Construction Humanity For Habitat NGO** portal, explains the underlying computer science and DevOps principles behind each failure, and provides student-proof, reproducible solutions.

---

## Table of Contents
1. [The Target Architecture: What Makes Vite + React Distinct](#1-the-target-architecture)
2. [The Big Crash: Analyzing the Fatal npm ERESOLVE Conflict](#2-the-big-crash-analyzing-the-fatal-npm-eresolve-conflict)
3. [The Permanent Fix: Configuring `.npmrc` for Cloud CI Containers](#3-the-permanent-fix-configuring-npmrc-for-cloud-ci-containers)
4. [The Hidden Trap: Single Page Application (SPA) 404 Route Dilemma](#4-the-hidden-trap-single-page-application-spa-404-route-dilemma)
5. [The Vercel Dashboard Mystery: Locating the Redeploy Option](#5-the-vercel-dashboard-mystery-locating-the-redeploy-option)
6. [Observability & Verification: Reading Green Deployment Logs](#6-observability--verification-reading-green-deployment-logs)
7. [Student Exercise & Classroom Laboratory Assignment](#7-student-exercise--classroom-laboratory-assignment)
8. [The 7 Pillars of Production-Grade Vercel Deployments (Cheatsheet)](#8-the-7-pillars-of-production-grade-vercel-deployments-cheatsheet)

---

## 1. The Target Architecture

Before diving into the errors, understand the components running in our application:
- **Build Tool:** Vite 8.3+ (Utilizes native ES modules in development and `esbuild` / `rollup` for lightning-fast bundling).
- **UI Framework:** React 19 (`react`, `react-dom`).
- **Language:** TypeScript 5.8+ (Strict type verification via `tsc --noEmit`).
- **Styling Engine:** Tailwind CSS v4 (`@tailwindcss/vite`).
- **Hosting Environment:** Vercel Global Edge Network with automated GitHub CI/CD webhooks.

### Local Development vs. Cloud CI Machines
| Characteristic | Local Machine (Developer Laptop) | Vercel CI Build Machine |
| :--- | :--- | :--- |
| **Package Manager State** | Often cached (`~/.npm`, `node_modules` exists) | 100% ephemeral, virgin Ubuntu container |
| **Tolerance for Mismatches** | Permissive (often using `bun` or relaxed configs) | Strict non-interactive `npm install` |
| **Environment** | Interactive terminal (`PTY`) | Headless CI execution |
| **Failure Tolerance** | Shows warnings, proceeds | Exits with status `1` on any unhandled error |

---

## 2. The Big Crash: Analyzing the Fatal npm ERESOLVE Conflict

### The Actual Terminal Log from Vercel
When our repository was pushed to GitHub and triggered Vercel, the build log stopped with the following output:

```text
13:30:24.281 Running build in Washington, D.C., USA (East) – iad1
13:30:24.282 Build machine configuration: 2 cores, 8 GB
13:30:24.389 Cloning github.com/bkhumanity/bkhumanity (Branch: main, Commit: 970101d)
13:30:25.403 Cloning completed: 1.014s
13:30:25.821 Running "vercel build"
13:30:25.834 Vercel CLI 65.1.0
13:30:26.518 Installing dependencies...
13:30:50.025 npm error code ERESOLVE
13:30:50.026 npm error ERESOLVE could not resolve
13:30:50.028 npm error Found: esbuild@0.25.12
13:30:50.028 npm error node_modules/esbuild
13:30:50.028 npm error   dev esbuild@"^0.25.0" from the root project
13:30:50.029 npm error Could not resolve dependency:
13:30:50.029 npm error peerOptional esbuild@"^0.27.0 || ^0.28.0" from vite@8.3.5
13:30:50.029 npm error node_modules/vite
13:30:50.029 npm error   vite@"^8.3.0" from the root project
13:30:50.029 npm error Conflicting peer dependency: esbuild@0.28.2
13:30:50.030 npm error Fix the upstream dependency conflict, or retry this command with --force or --legacy-peer-deps
13:30:50.078 Error: [BUILD_UTILS_SPAWN_1] Command "npm install" exited with 1
```

### The Pedagogical Explanation (Why Did npm Crash?)
In npm versions 7 through 10, npm enabled **Strict Peer Dependency Resolution** by default. 
- In older npm versions (npm 6 and earlier), peer dependency mismatches were printed as non-blocking yellow warnings.
- In modern npm, if package $A$ (e.g. `vite@8.3.5`) requests a peer dependency of `esbuild@^0.27.0 || ^0.28.0`, but package $B$ or a developer dependency has locked `esbuild@0.25.x`, npm considers this a fatal tree contradiction (`ERESOLVE`).
- Since CI runners cannot stop and ask an interactive question, npm exits with status `1`, causing Vercel to mark the entire deployment as **Failed**.

---

## 3. The Permanent Fix: Configuring `.npmrc` for Cloud CI Containers

There are three ways to solve this. Teach students why **Option 1** is the true DevOps gold standard.

### Option 1 (Industry Standard): The `.npmrc` Configuration File
By creating a `.npmrc` file at the root of the Git repository, any build server that runs `npm` will automatically apply the flag without requiring UI configuration.

**File:** `/.npmrc` (Root directory, next to `package.json`)
```ini
legacy-peer-deps=true
```

#### Why this works:
When Vercel spins up the ephemeral container and invokes `npm install`, npm parses the `.npmrc` file first. The `legacy-peer-deps=true` directive instructs npm to adopt the npm v6 resolution strategy: install packages without halting on optional peer dependency mismatches.

### Option 2: The Vercel Dashboard Override
If you cannot modify the codebase directly:
1. Open the project in the **Vercel Dashboard**.
2. Navigate to **Settings** &rarr; **General**.
3. Scroll down to **Build & Development Settings**.
4. Find **Install Command**, toggle the **Override** switch.
5. Enter:
   ```bash
   npm install --legacy-peer-deps
   ```
6. Click **Save**.

### Option 3: Dependency Tree Harmonization
In a long-term enterprise codebase, teams eventually update all internal toolchains (`tsx`, `@tailwindcss/vite`, `vite`) so that their underlying `esbuild` peer dependency ranges align on the identical major version.

---

## 4. The Hidden Trap: Single Page Application (SPA) 404 Route Dilemma

### The Bug That Fooled Every Beginner
After fixing `npm install`, your application builds successfully. You test the homepage (`/`) and it loads beautifully. You click on a link to go to `/projects` or `/admin`, and the page loads instantly. 

**Then disaster strikes:**
The user hits `F5` (Refresh) while on `bkhumanity.vercel.app/projects`, or shares the direct link to a friend. 
Vercel immediately returns a stark black-and-white error:
```text
404: NOT_FOUND
Code: NOT_FOUND
ID: iad1::...
```

### Why Does This Happen?
- **Server-Side Rendered (SSR) sites** or static sites have physical files for every path (e.g., `/projects/index.html`).
- **Single Page Applications (SPAs)** built with Vite/React only generate **one single physical HTML file**: `/dist/index.html`.
- Internal navigation works because React Router or internal component state updates the browser URL without asking the server for a new file (`history.pushState`).
- When a user **refreshes** or pastes a direct URL, the browser makes an HTTP request to Vercel's edge server for `GET /projects`. Vercel looks for a directory or file named `projects` or `projects.html`. Since neither exists, Vercel serves a 404.

### The Solution: `vercel.json` Rewrite Rules
To fix this, we configure Vercel's Edge routing proxy to send all requests back to `index.html`, where React takes over and renders the correct view.

**File:** `/vercel.json` (Root directory)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 5. The Vercel Dashboard Mystery: Locating the Redeploy Option

When an initial build fails on Vercel, the main **Overview** tab displays:
> *No Production Deployment*  
> *Your Production Domain is not serving traffic.*  
> *The "Visit" button is disabled.*

Many students get confused and think they must delete the project or push empty commits to retry. Here is the exact click-by-click procedure:

```
[ Vercel Dashboard: Project View ]
                 │
                 ├── 1. Click "Deployments" on the left sidebar
                 │
                 ├── 2. Locate the failed deployment (Red Error pill)
                 │
                 ├── 3. Click the three horizontal dots icon (...) on the right
                 │
                 ├── 4. Select "Redeploy" from the popup menu
                 │
                 ├── 5. Modal appears:
                 │      • Environment: Select "Production"
                 │      • Checkbox: Uncheck "Use existing build cache" (ensures clean install)
                 │      • Click the blue "Redeploy" button!
```

---

## 6. Observability & Verification: Reading Green Deployment Logs

Once the fix is applied and redeployment starts, open the live streaming **Build Logs**. Here is what a successful production build looks like:

```text
13:32:10.120 Running "vercel build"
13:32:10.518 Installing dependencies...
13:32:18.230 npm warn using --legacy-peer-deps
13:32:22.401 Running "npm run build"
13:32:23.011 > vite build
13:32:24.080 vite v8.3.0 building for production...
13:32:24.890 transform... [34 modules]
13:32:25.105 rendering chunks...
13:32:25.150 computing gzip size...
13:32:25.210 dist/index.html                   1.42 kB │ gzip:  0.68 kB
13:32:25.240 dist/assets/index-D1_z7A.css     38.12 kB │ gzip:  7.84 kB
13:32:25.320 dist/assets/index-Bf919K.js     244.50 kB │ gzip: 74.20 kB
13:32:25.400 ✓ built in 1.07s
13:32:27.120 Build completed in 24s
13:32:28.005 Assigning Custom Domains:
13:32:28.100 ✓ bkhumanity.vercel.app
13:32:28.150 Status: Ready (Latest)
```

### Key Indicators to Teach Students:
1. **The Green Circle Checkmark:** Indicates deployment success.
2. **Build Duration (24s):** Fast compilation via Vite and esbuild.
3. **Bundle Size Breakdown:** Note that CSS is split from JS, and total gzip bundle size is under 100 kB (excellent performance).
4. **Domain Assignment:** The production domain `bkhumanity.vercel.app` is now bound to the edge servers.

---

## 7. Student Exercise & Classroom Laboratory Assignment

### Exercise Prompt:
*A client gives you a Vite + React application repository that deploys with status `Error: Command "npm install" exited with 1` on Vercel. You are tasked with resolving this without deleting any dependencies.*

### Step-by-Step Student Instructions:
1. **Inspect `package.json`:** Identify which dependencies share competing peer dependencies.
2. **Run TypeScript Check locally:** Execute `npm run lint` or `npx tsc --noEmit`. Ensure 0 type errors exist.
3. **Generate `.npmrc`:** Create `.npmrc` with `legacy-peer-deps=true`.
4. **Configure Edge Rewrites:** Create `vercel.json` with the SPA fallback rule.
5. **Git Commit & Push:** 
   ```bash
   git add .npmrc vercel.json
   git commit -m "fix(ci): resolve npm peer dependency resolution and spa rewrites"
   git push origin main
   ```
6. **Verify in Vercel:** Watch the live deployment log and verify the production URL is serving traffic.

---

## 8. The 7 Pillars of Production-Grade Vercel Deployments (Cheatsheet)

1. **Commit Root `.npmrc`:** Always set `legacy-peer-deps=true` when using rapidly evolving React 19/Vite toolchains.
2. **Declare `vercel.json` Rewrites:** Always route `/(.*)` to `/index.html` to prevent 404s on page refresh.
3. **Set the Correct Output Directory:** Vite outputs to `dist/`, Create React App outputs to `build/`, Next.js outputs to `.next/`. Verify Vercel project preset matches your framework.
4. **Respect the `VITE_` Prefix:** Client-side environment variables must start with `VITE_` (e.g., `VITE_PAYSTACK_PUBLIC_KEY`). Non-prefixed variables will not be injected into client bundles.
5. **Enforce Zero TypeScript Errors:** Always run `tsc --noEmit` before git push. Vercel's build command runs `tsc && vite build`, which aborts on any type violation.
6. **Keep Static Assets in `/public`:** Favicons, `robots.txt`, and social share images (`og-image.jpg`) must reside in `/public` so Vite serves them at root `/`.
7. **Verify Custom Domain DNS Records:** When linking a custom domain, point an `@` record to `76.76.21.21` or a `CNAME` record to `cname.vercel-dns.com`. Vercel automatically provisions and renews SSL/TLS certificates.

---

*Handout compiled and verified for educational instruction by BK Construction Humanity For Habitat NGO engineering team.*
