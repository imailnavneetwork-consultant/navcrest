# Navcrest Consulting — Website

A single-page site for Navcrest Consulting (Ranchi) — dark theme with your brand blue as the accent.

## Files
- `index.html` — the page
- `styles.css` — all styling
- `script.js` — nav, lending-partner strip, scroll reveals, WhatsApp form
- `assets/logo.png`, `assets/founder.jpg` — your actual logo and photo

## Put it live on GitHub Pages (free)
1. Create a GitHub account if you don't have one, then create a new repository (e.g. `navcrest-website`) — public, no README/license needed.
2. On the repo page, click **Add file → Upload files**, then drag in `index.html`, `styles.css`, `script.js`, and the whole `assets` folder. Commit.
3. Go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/(root)**. Save.
4. Wait ~1 minute, then your site is live at `https://<your-username>.github.io/navcrest-website/`.

## Before you share the link, double-check
- [ ] Confirm the phone number and email in the flyer are still current: **+91 70917 76353**, **imailnavneet.work@gmail.com**
- [ ] Partner list accuracy — 8 banks (HDFC, ICICI, Axis, Kotak, IDFC First, Bandhan, IndusInd, Yes Bank) and 8 NBFCs (Cholamandalam, Tata Capital, Finnable, SMFG, Piramal, Aditya Birla, Poonawalla, Bajaj Finserv) scroll in the trust strip
- [ ] Decide if you want a specific "years of experience" number added to the founder section (left out since it wasn't in your flyer)
- [ ] Want a custom domain (e.g. navcrestconsulting.com) instead of the github.io link? That's a separate ~₹800–1200/year purchase, then a few DNS records point it at GitHub Pages — ask if you want the steps.

## A note on the lending partner logos
The trust strip shows all 16 partners as styled text badges rather than their actual bank/NBFC logos. Using an official bank or NBFC logo without their permission risks implying a formal co-branding or endorsement that doesn't exist — a real liability for a lending intermediary. Text badges keep it accurate and safe to publish. If any partner ever gives you co-branding artwork, swap their badge for the real logo image easily in `script.js`.
