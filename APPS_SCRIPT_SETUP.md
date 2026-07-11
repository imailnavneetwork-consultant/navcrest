# Setting up your private backend (free, forever)

This gives you two things, using only your own Google account — no third-party
company, no monthly fee:

1. Every contact-form submission is saved as a row in a Google Sheet that
   only you can see.
2. The client gets an automatic reply email the moment they submit the form.
   You get a notification email too.

Total setup time: about 10 minutes, done once.

## Step 1 — Create the private spreadsheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank sheet.
2. Rename it "Navcrest Leads" (top-left, where it says "Untitled spreadsheet").
3. This spreadsheet lives in *your* Google Drive — nobody else can open it
   unless you explicitly share it. This is your private admin view.

## Step 2 — Add the backend code
1. In the sheet, click **Extensions → Apps Script**.
2. Delete any placeholder code in the editor.
3. Open `Code.gs` (in this same folder I gave you), copy all of it, and paste
   it into the Apps Script editor.
4. At the top of the pasted code, change this line to whichever email should
   get new-enquiry notifications:
   ```
   const NOTIFY_EMAIL = "imailnavneet.work@gmail.com";
   ```
5. Click the **Save** icon (or Ctrl+S).

## Step 3 — Deploy it as a web app
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - Description: `Navcrest contact form backend`
   - Execute as: **Me**
   - Who has access: **Anyone** (this is what lets your public website call it — it does not give anyone access to your spreadsheet, only to submitting new rows)
4. Click **Deploy**.
5. Google will ask you to authorize the script — click **Authorize access**,
   choose your Google account, click **Advanced → Go to Navcrest contact form
   backend (unsafe)** (this warning is normal for scripts you write yourself),
   then **Allow**.
6. Copy the **Web app URL** it gives you (starts with
   `https://script.google.com/macros/s/.../exec`).

## Step 4 — Connect it to your website
1. Open `script.js` in your website files.
2. Find this line near the top of the "Contact form" section:
   ```js
   const LEADS_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace the placeholder with the URL you copied in Step 3.
4. Re-upload `script.js` to GitHub (Settings → your repo → upload, overwrite
   the existing file).

## Step 5 — Test it
1. Open your live site, fill out the contact form with your own email
   address, and submit.
2. Check: a new row should appear in your "Navcrest Leads" sheet, you should
   get a notification email, and the email you entered should get the
   auto-reply within a minute or two.

## Notes
- **Free limits**: a personal Google account can send up to 100 emails/day
  through Apps Script — far more than a small consulting site needs.
- **Only you can see submissions** — the sheet is in your private Drive.
- **Changing the auto-reply text**: edit the `MailApp.sendEmail` block near
  the bottom of `Code.gs`, save, then **Deploy → Manage deployments → Edit →
  New version → Deploy** for the change to take effect.
- **If the form ever can't reach the backend** (e.g. you haven't set this up
  yet, or your internet is down), the site still falls back to opening
  WhatsApp with the same details, so you never lose an enquiry.
