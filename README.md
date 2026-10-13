# Shree Varshan P - Developer Portfolio Website

A colorful, modern, and recruiter-friendly portfolio website tailored for **Shree Varshan P**, Software Student in Artificial Intelligence and Data Science (AI&DS) at Rathinam College, Coimbatore.

---

## 🌟 Key Highlights & Design Features

- **Recruiter-Friendly Design:** High-contrast contact triggers, verified phone number (`9994819939`), Coimbatore location, and quick actions to view projects or get in touch.
- **Colorful & Polished Aesthetics:** Dynamic ambient glow backdrops, vibrant gradient accents (indigo, cyan, violet, rose, amber), glassmorphism cards, and fluid micro-animations.
- **100% Genuine & Honest:** No skills, projects, or achievements were fabricated. All unverified items are presented as distinctly styled, editable placeholders.
- **Dark & Light Modes:** Built-in theme switcher that respects system preference and persists user choice in `localStorage`.
- **Interactive Tools:** One-click copy for phone and email with animated toast notifications, smooth scrolling, mobile navigation menu, and an interactive **Edit Guide** slide-over drawer.
- **Zero Heavy Dependencies:** Built cleanly with semantic HTML5, modern vanilla CSS, and vanilla JavaScript for lightning-fast performance and 100% responsive design across all screen sizes.

---

## 🚀 How to Run the Website Locally

You can run this website on your Mac with any of the following methods:

### Option 1: Direct Browser Opening (Instant)
Simply double-click `index.html` in Finder, or right-click `index.html` and choose **Open With > Google Chrome** (or Safari / Brave / Edge).

### Option 2: Local HTTP Server (Recommended)
Open Terminal and run:
```bash
cd /Users/shreevarshan/portfolio
python3 -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

---

## ✏️ How to Replace the Placeholders with Your Details

Open `index.html` in your text editor (VS Code, Antigravity, etc.). Look for the bracketed placeholders (`[...]`) or search for the word `placeholder`:

### 1. Education Section (`#education`)
- **Graduation Year:** Search for `[Graduation Year: e.g. 2022 – 2026]` and change it to your actual batch (e.g., `2022 – 2026` or `2023 – 2027`).
- **Degree:** Search for `[Degree Placeholder: e.g. B.Tech / B.E. / B.Sc in Artificial Intelligence and Data Science]` and replace it with your exact degree (e.g., `B.Tech in Artificial Intelligence & Data Science`).

### 2. Skills Section (`#skills`)
In `index.html`, locate the four skill categories:
- **Programming Languages:** Replace `[Programming Language 1]`, `[Programming Language 2]`, etc. with the languages you know (e.g. `Python`, `Java`, `C++`, `JavaScript`, `SQL`).
- **Frameworks & Web:** Replace `[Framework / Library 1]`, etc. with your tools (e.g. `React`, `Node.js`, `Flask`, `Django`, `Express`).
- **Tools & Databases:** Replace `[Database 1]` and `[Dev Tool 1]` (e.g. `MySQL`, `MongoDB`, `Git & GitHub`, `VS Code`, `Postman`).
- **Academic Foundations:** Customize or keep `Data Structures & Algorithms`, `Machine Learning Basics`, `Database Systems`, etc.

*Tip:* When you replace a placeholder skill with your verified skill, you can remove the `placeholder-pill` class from the `<div>` to style it as a normal active skill!

### 3. Projects Section (`#projects`)
Each project card has clearly marked placeholders:
- **Title:** Replace `[Project 1 Title: ...]` with your real project name.
- **Description:** Replace the 2-3 sentence overview explaining what problem your project solves.
- **Key Features:** Replace the bullet points with the main technical achievements.
- **Tech Stack:** Replace `[Tech 1]`, `[Tech 2]` with the actual technologies used.
- **Links:** Replace `href="#contact"` with your actual GitHub repository URL (e.g., `https://github.com/shreevarshan/my-project`) or live demo URL.

### 4. Contact Section (`#contact`)
- **Email:** Search for `[your.email@example.com]` and replace it with your actual email address (update both the visible text and the `mailto:` attribute).
- **LinkedIn:** Search for `[your-linkedin-handle]` and update the link with your profile URL (e.g. `https://linkedin.com/in/shreevarshan-p`).
- **Phone (`9994819939`) & Location (`Coimbatore`):** Already pre-configured and active!

---

## 🌐 Free Online Deployment Guide

### Deploying to GitHub Pages (Recommended & 100% Free)
1. Create a free account on [GitHub](https://github.com).
2. Create a new repository named `portfolio` (or `<your-username>.github.io`).
3. In your local terminal, run:
   ```bash
   cd /Users/shreevarshan/portfolio
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings > Pages**, choose the `main` branch, and click **Save**.
5. Your portfolio will be live at: `https://<your-username>.github.io/portfolio/`!

### Deploying to Vercel or Netlify
- Go to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com).
- Simply drag and drop the `portfolio` folder to deploy with custom domains and free HTTPS.

---

## 📁 Project Structure

```
portfolio/
├── index.html       # Semantic HTML5 structure, SEO meta tags, and all 6 required sections
├── style.css        # Modern CSS design system, ambient mesh glow, vibrant gradients, dark/light mode
├── script.js        # Theme toggle, clipboard utility, toast notifications, scrollspy & guide drawer
└── README.md        # Comprehensive documentation and customization guide
```
