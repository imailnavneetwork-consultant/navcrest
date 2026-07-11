/**
 * NAVCREST CONSULTING — Website backend
 * -------------------------------------
 * Runs entirely inside YOUR Google account (free, forever).
 * - Every contact-form submission is saved as a new row in a private
 *   Google Sheet that only you can see.
 * - The client who submitted the form gets an automatic reply email.
 * - You get a notification email for every new enquiry.
 *
 * SETUP: see APPS_SCRIPT_SETUP.md in this folder for the full walkthrough.
 */

// ⬇️ Change this to whichever inbox should receive new-enquiry notifications.
const NOTIFY_EMAIL = "imailnavneet.work@gmail.com";

// ⬇️ Name of the sheet tab where leads are stored (created automatically).
const SHEET_NAME = "Leads";

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Need", "Message"]);
    sheet.setFrozenRows(1);
  }

  const data = JSON.parse(e.postData.contents);
  const name = (data.name || "").toString().trim();
  const email = (data.email || "").toString().trim();
  const phone = (data.phone || "").toString().trim();
  const need = (data.need || "").toString().trim();
  const message = (data.message || "").toString().trim();

  sheet.appendRow([new Date(), name, email, phone, need, message]);

  // Notify you
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "New website enquiry — " + name,
    body:
      "New enquiry from the Navcrest website:\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + phone + "\n" +
      "Needs help with: " + need + "\n" +
      "Message: " + (message || "(none)") + "\n"
  });

  // Auto-reply to the client
  if (email) {
    MailApp.sendEmail({
      to: email,
      subject: "Thanks for reaching out to Navcrest Consulting",
      body:
        "Hi " + (name || "there") + ",\n\n" +
        "Thanks for reaching out to Navcrest Consulting. I've received your message about \"" + need + "\" and will get back to you within one business day.\n\n" +
        "If it's urgent, you can also reach me directly on WhatsApp: +91 70917 76353.\n\n" +
        "Best,\nNavneet Kumar\nNavcrest Consulting\nRanchi, Jharkhand"
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Lets you open the Web App URL directly in a browser to confirm it's alive.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Navcrest backend is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}
