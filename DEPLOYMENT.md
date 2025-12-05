# Deploy to Vercel

Quick guide to deploy ng-states-core documentation to Vercel.

## Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**

   - Click "Add New..." → "Project"
   - Select your `ng-states-core` repository
   - Click "Import"

3. **Configure Project**

   - **Framework Preset**: VitePress (auto-detected)
   - **Build Command**: `npm run docs:build` (auto-filled)
   - **Output Directory**: `docs/.vitepress/dist` (auto-filled)
   - Click "Deploy"

4. **Done!**
   - Your site will be live at: `https://ng-states-core.vercel.app`
   - Auto-deploys on every push to `main`

## Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   # First deployment (follow prompts)
   vercel

   # Production deployment
   vercel --prod
   ```

## Custom Domain

To use a custom domain:

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `docs.ng-states-core.com`)
4. Update your DNS records as instructed
5. Vercel automatically provisions SSL

## Environment Variables

No environment variables needed for this static site.

## Auto-Deploy on Push

Vercel automatically deploys:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

## Local Preview

Test the production build locally:

```bash
npm run docs:build
npm run docs:preview
```

## Troubleshooting

### Build Fails

- Check Node.js version (requires 18+)
- Verify `vercel.json` configuration
- Check build logs in Vercel dashboard

### 404 Errors

- Ensure `base` is NOT set in `config.mjs` (or set to `'/'`)
- Clear Vercel cache and redeploy

### Slow Builds

- Vercel caches `node_modules` automatically
- First build may be slower

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [VitePress Deployment Guide](https://vitepress.dev/guide/deploy)
