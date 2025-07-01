# Deployment Guide

This portfolio is deployment-ready and can be deployed to various platforms. Here are the deployment options:

## 🚀 Quick Deploy Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Netlify
1. Run `npm run build` to generate the static files
2. Upload the `out` folder to [Netlify](https://netlify.com)
3. Or connect your GitHub repository for automatic deployments

### GitHub Pages
1. Run `npm run build` to generate static files
2. Push the `out` folder contents to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Static Hosting (Any Provider)
```bash
npm run build
```
Upload the contents of the `out` folder to any static hosting provider.

## 📦 Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

The project is configured for static export with:
- Image optimization disabled for static hosting
- Trailing slashes enabled
- Static file generation in the `out` directory

## 📝 Notes

- Resume link points to `/Wajiha_Kulsum.pdf` in the public folder
- 3D scene uses Spline for interactive elements
- Fully responsive design with Tailwind CSS
- No server-side functionality required 