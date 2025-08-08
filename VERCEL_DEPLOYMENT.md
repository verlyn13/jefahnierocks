# Vercel Deployment Guide

## 1. Connect Doppler to Vercel (Web UI)

1. Go to https://dashboard.doppler.com
2. Select the `jefahnie-portal` project
3. Click on "Integrations" in the left sidebar
4. Click "Add Integration"
5. Select "Vercel"
6. Authorize Doppler to access your Vercel account
7. Select your Vercel project: `web`
8. Map Doppler configs to Vercel environments:
   - `prd` → Production
   - `dev` → Development
9. Click "Create Integration"

This will automatically sync all Doppler secrets to Vercel!

## 2. Configure Custom Domain

### Update DNS Records in Cloudflare

1. Go to Cloudflare Dashboard
2. Select your domain: `jefahnierocks.com`
3. Go to DNS settings
4. Update/Add these records:

```
# Remove GitHub Pages records
Delete: A record pointing to 185.199.108.153
Delete: A record pointing to 185.199.109.153
Delete: A record pointing to 185.199.110.153
Delete: A record pointing to 185.199.111.153
Delete: AAAA records (IPv6)

# Add Vercel records
Type: CNAME
Name: @ (or jefahnierocks.com)
Content: cname.vercel-dns.com
Proxy: OFF (DNS only)

Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy: OFF (DNS only)
```

### Add Domain to Vercel

1. Go to your Vercel project dashboard
2. Go to Settings → Domains
3. Add domain: `jefahnierocks.com`
4. Add domain: `www.jefahnierocks.com`
5. Vercel will verify the DNS records

## 3. Deploy from CLI

```bash
# From the web app directory
cd portal/apps/web

# Deploy to production with Doppler secrets
doppler run --project jefahnie-portal --config prd -- vercel --prod

# Or just deploy (if Doppler integration is connected)
vercel --prod
```

## 4. Environment Variables

These are automatically synced from Doppler:
- `TURSO_DATABASE_URL` - Your Turso database URL
- `TURSO_AUTH_TOKEN` - Your Turso auth token

## 5. Project Structure

The project is configured as a monorepo:
```
portal/
├── apps/
│   └── web/           # SvelteKit app
│       ├── vercel.json # Vercel config
│       └── src/
└── pnpm-workspace.yaml
```

## 6. Build Configuration

Vercel is configured to:
1. Install dependencies from monorepo root
2. Build the web app using pnpm workspaces
3. Deploy the SvelteKit app with server-side rendering

## 7. WebAuthn Configuration

For production, update the WebAuthn settings:
- RP_ID: Your domain (e.g., `jefahnierocks.com`)
- ORIGIN: Your full URL (e.g., `https://jefahnierocks.com`)

These are already configured to use the Vercel app domain for now.