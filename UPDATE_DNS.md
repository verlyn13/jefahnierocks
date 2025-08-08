# DNS Configuration for Vercel

## Update Cloudflare DNS Records

Go to your Cloudflare dashboard and update these records:

### 1. Remove Old GitHub Pages Records
Delete these if they exist:
- A record: 185.199.108.153
- A record: 185.199.109.153
- A record: 185.199.110.153
- A record: 185.199.111.153
- AAAA records (all IPv6 addresses)
- CNAME record pointing to verlyn13.github.io

### 2. Add New Vercel Records

For the root domain (jefahnierocks.com):
```
Type: A
Name: @ (or jefahnierocks.com)
Content: 76.76.21.21
Proxy: OFF (DNS only - gray cloud)
```

For www subdomain:
```
Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy: OFF (DNS only - gray cloud)
```

### 3. Verify in Vercel

After updating DNS, run:
```bash
vercel domains verify jefahnierocks.com
```

Or check in the Vercel dashboard:
https://vercel.com/jeffrey-johnsons-projects-4efd9acb/portal/settings/domains

## Your Portal URLs

- Production: https://jefahnierocks.com (after DNS propagates)
- Preview: https://portal-ivlkak5s3-jeffrey-johnsons-projects-4efd9acb.vercel.app

DNS propagation usually takes 5-30 minutes.