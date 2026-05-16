# 🚀 Vercel Deployment Guide

Your Portfolio OS is optimized for Vercel. Here are the settings you need:

## ⚙️ Build Settings
Vercel should auto-detect these, but if not, use:
- **Framework Preset**: `Next.js`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🔐 Environment Variables (.env)
Currently, **no environment variables are required** for the core portfolio features to work. 

If you decide to add features like a contact form email service or a custom CMS later, you can add them in the **Project Settings > Environment Variables** section on the Vercel dashboard.

## 📦 GitHub Integration
Since the repository is already pushed to GitHub, simply:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project**.
3. Import `Portfolio-wEBSITE`.
4. Click **Deploy**.

Everything should work out of the box!
