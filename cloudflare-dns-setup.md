# Cloudflare DNS Setup for GitHub Pages

## Quick Setup Instructions

### 1. Import DNS Records

1. Log into your Cloudflare dashboard
2. Select your domain (jefahnierocks.com)
3. Go to DNS → Records
4. Click "Import and Export" → "Import records"
5. Upload the `cloudflare-dns-import.json` file

### 2. Manual Setup (Alternative)

If import doesn't work, add these records manually:

#### A Records (IPv4) - Add all 4
- **Name:** `@` (or leave blank for root)
- **Content:** 
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **Proxy status:** DNS only (gray cloud)
- **TTL:** Auto

#### AAAA Records (IPv6) - Optional but recommended
- **Name:** `@` (or leave blank for root)
- **Content:**
  - `2606:50c0:8000::153`
  - `2606:50c0:8001::153`
  - `2606:50c0:8002::153`
  - `2606:50c0:8003::153`
- **Proxy status:** DNS only (gray cloud)
- **TTL:** Auto

#### CNAME Record for www
- **Name:** `www`
- **Content:** `verlyn13.github.io`
- **Proxy status:** DNS only (gray cloud)
- **TTL:** Auto

### 3. GitHub Configuration

1. Go to your repository settings: https://github.com/verlyn13/jefahnierocks/settings/pages
2. Under "Custom domain", enter: `jefahnierocks.com`
3. Click "Save"
4. Check the DNS status:
   - ✅ If it shows "DNS check successful" - you're done!
   - ⚠️ If it shows "DNS check in progress" - wait a few minutes
   - ❌ If it asks for verification - GitHub will show a TXT record to add to Cloudflare

### 4. Important Settings

⚠️ **Critical:** Make sure these settings are correct in Cloudflare:

1. **SSL/TLS → Overview:** Set to "Full" (not "Full (strict)")
2. **SSL/TLS → Edge Certificates:** Enable "Always Use HTTPS"
3. **DNS → Records:** All GitHub Pages records must have **Proxy status OFF** (gray cloud)

### 5. Verify Setup

After setup, check these:

1. DNS propagation (may take up to 48 hours):
   ```bash
   dig jefahnierocks.com
   dig www.jefahnierocks.com
   ```

2. HTTPS certificate (GitHub provides this automatically):
   ```bash
   curl -I https://jefahnierocks.com
   ```

3. GitHub Pages status:
   - Check repository Settings → Pages
   - Should show "✅ Your site is published at https://jefahnierocks.com"

## Troubleshooting

### "404 Not Found" Error
- Ensure the CNAME file exists in your repository
- Check that GitHub Actions completed successfully
- Verify the `build` directory contains your site files

### "ERR_TOO_MANY_REDIRECTS"
- Ensure Cloudflare SSL is set to "Full" (not "Flexible")
- Disable Cloudflare proxy (gray cloud) for GitHub Pages records

### Certificate Errors
- Wait up to 24 hours for GitHub to provision SSL certificate
- Ensure all A/AAAA records are correct
- Check that Cloudflare proxy is disabled for these records

### Domain Not Resolving
- Verify DNS records are saved in Cloudflare
- Check domain registration is active
- Wait for DNS propagation (up to 48 hours)

## Notes

- GitHub Pages IPs are stable but may change. Check https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site for updates
- The www subdomain will redirect to the apex domain automatically
- GitHub provides free SSL certificates via Let's Encrypt
- Keep Cloudflare proxy OFF for GitHub Pages to work properly