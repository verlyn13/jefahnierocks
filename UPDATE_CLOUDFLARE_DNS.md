# Update Cloudflare DNS from GitHub Pages to Vercel

## Current Configuration (GitHub Pages)
Your domain currently points to GitHub Pages with these records:
- 4 A records: 185.199.108-111.153
- 4 AAAA records: 2606:50c0:8000-8003::153
- CNAME www → verlyn13.github.io

## Required Changes for Vercel

### Step 1: Delete Old Records
Go to Cloudflare Dashboard → DNS → Records and delete:

1. **All A records for jefahnierocks.com:**
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

2. **All AAAA records for jefahnierocks.com:**
   - 2606:50c0:8000::153
   - 2606:50c0:8001::153
   - 2606:50c0:8002::153
   - 2606:50c0:8003::153

3. **CNAME record for www:**
   - www → verlyn13.github.io

### Step 2: Add New Records

1. **A Record for Root Domain:**
   - Type: A
   - Name: @ (or jefahnierocks.com)
   - IPv4 address: **76.76.21.21**
   - TTL: Auto
   - Proxy status: **DNS only** (gray cloud)

2. **CNAME Record for www:**
   - Type: CNAME
   - Name: www
   - Target: **cname.vercel-dns.com**
   - TTL: Auto
   - Proxy status: **DNS only** (gray cloud)

### Step 3: Verify Configuration

After making changes, verify with:
```bash
# Check DNS propagation
nslookup jefahnierocks.com
nslookup www.jefahnierocks.com

# Verify in Vercel
vercel domains verify jefahnierocks.com
```

### Step 4: SSL Certificate

Vercel will automatically provision an SSL certificate once DNS is verified. This usually takes 5-10 minutes after DNS propagation.

## Timeline
- DNS changes: Immediate in Cloudflare
- DNS propagation: 5-30 minutes globally
- SSL certificate: 5-10 minutes after verification
- **Total time to live site:** ~30-45 minutes

## Your URLs
- **Current (GitHub Pages):** https://jefahnierocks.com (will stop working)
- **New (Vercel):** https://jefahnierocks.com (will work after DNS update)
- **Always works:** https://portal-ivlkak5s3-jeffrey-johnsons-projects-4efd9acb.vercel.app

## Important Notes
⚠️ **During transition:** Your site may be temporarily unavailable (5-30 mins)
✅ **No data loss:** Your Turso database and all content remains intact
🔒 **HTTPS:** Vercel provides automatic SSL certificates