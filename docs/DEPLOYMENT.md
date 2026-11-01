# Deployment Guide - CodeMaster AI
**Author & Lead Architect**: Ayananshu Mahapatra  
**Repository**: [https://github.com/ayananshumahapatra21-sudo/CodeMaster-AI](https://github.com/ayananshumahapatra21-sudo/CodeMaster-AI)

---

## 🚀 Option 1: Instant Drag & Drop via Netlify Drop (Fastest, 30 Seconds)

We have pre-compiled and configured the entire frontend production build with Netlify SPA redirect rules so you will **never** see *"Page Not Found"*.

### Step-by-Step:
1. Open your browser and navigate to: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Drag and drop **EITHER**:
   - The compiled folder: `CodeMaster-AI/frontend/dist`
   - **OR** the ready-to-deploy archive: `CodeMaster-AI/CodeMaster-AI-Deployment.zip`
3. Netlify will instantly upload, provision an SSL certificate, and give you a live URL (e.g. `https://codemaster-ai-ayananshu.netlify.app`).

> 💡 **Why you got "Page Not Found" previously**:
> 1. In Single Page Apps (React Router), hitting any route or refreshing without a `_redirects` file causes Netlify to look for a physical file and return 404. We added `_redirects` (`/* /index.html 200`).
> 2. Dragging the outer root project folder (`CodeMaster-AI`) instead of the specific `frontend/dist` folder meant Netlify couldn't find `index.html` at the root.

---

## ⚡ Option 2: Connect GitHub Directly to Netlify / Vercel

If you want your website to re-deploy automatically every time you push code to GitHub:

### On Netlify:
1. Go to **[https://app.netlify.com](https://app.netlify.com)** and click **"Add new site"** -> **"Import an existing project"**.
2. Choose **GitHub** and select your repository: `ayananshumahapatra21-sudo/CodeMaster-AI`.
3. Set the build configurations:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist` (or `dist`)
4. Click **Deploy CodeMaster AI**.

### On Vercel:
1. Go to **[https://vercel.com/new](https://vercel.com/new)**.
2. Import `ayananshumahapatra21-sudo/CodeMaster-AI`.
3. Root Directory: click Edit and select `frontend`.
4. Click **Deploy**.

---

## 🐙 Option 3: GitHub Pages (Automatic Workflow)

A GitHub Actions workflow has been added to `.github/workflows/deploy.yml`:
1. In your GitHub repository: [CodeMaster-AI Settings](https://github.com/ayananshumahapatra21-sudo/CodeMaster-AI/settings/pages).
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Any push to `main` will automatically build and publish your site at:
   `https://ayananshumahapatra21-sudo.github.io/CodeMaster-AI/`

---

## 🌐 Option 4: Full-Stack Backend & PostgreSQL on Render

To host the Spring Boot 3 API (`codemaster-api`) and managed PostgreSQL database:
1. Go to **[https://dashboard.render.com/blueprints](https://dashboard.render.com/blueprints)**.
2. Click **New Blueprint Instance** and connect your GitHub repository `CodeMaster-AI`.
3. Render detects `render.yaml` and will automatically provision:
   - Managed **PostgreSQL Database** (`codemaster-db`)
   - Containerized **Spring Boot Web Service** with Java 21 (`codemaster-api`)
   - Interlinks database credentials securely via environment variables.
