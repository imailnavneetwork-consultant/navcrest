// ---------- Lending partner data ----------
const LEADS_ENDPOINT = "https://accounts.google.com/signin/oauth/warning?authuser=0&part=AJi8hAOcbmkspDgGHPvnNa5UFLhPm5q5FBhezOs2uToa2-_GZoCnF-6EOE8-Kf_TPgMF2HvllSKR957vdOfZLsjskKouA2kX51vJXXakwTHTlfK_4sfd5-UzZXg3eaDb2LYXbpix0mWYK4iVg323NNWycZUTnEmk-GvvsmLR5YnlugBO-0d9Cm6aQYoHOXjV59bLGXF_q7uO7cWv1QZjwI5HRD3SSwq8Mk9xYhxL-zsUzeVWW0POUZivv9NbJFR3KqKnYGEk7jYNCpBp9-WVfufnOn4LRIOqlF_hxPZLQ9eYy8RS4obKtbtDR3XTdW_tUHjQcdZOT4oMv7Ie37j2v6i7mZ17IjwwsqM2tR0HUVB1QGhhWa38uBruFJobn65UzTTFQkhkTEyKmnwdGcJW4pDY41X3OtvfLFFPVrYj-Lty2LOq2m0vUk63TmvuqfYanr4PC3fLJpohwDtXsJKoNxyLtaaEExdA2aQHjEkZPUs6f4YBgUpOvnKzXI_cqMOuC8DWe-85_DVylU33YD8zr55ykyOUJH5rG5mK-CCPwibFZnMISxz74GtdHnsYQ1lvOV-ce0cYU75-bvazmTR4d3_oKSttMcOPsH3bNaBpNfJV9zkLkY9JKUtIlpXd6HNUdMnaeGVv10ra9ByppDNQK09LF66voVlcsg&flowName=GeneralOAuthFlow&hl=en-US&as=S537734712%3A1783807333971600&client_id=948976052710-5hguk264sqfkiu5uqskf80cl5mf3rn6e.apps.googleusercontent.com&rapt=AEjHL4MAtYI4tqIbC72JOMCACvN48NF3-9IUUewYI_0YdXTefgYwMRlWzfIGcusiySvbHuKHyjKEsaHM3_Yb_RLQ5Ln2hAKSXlU2GsiXWaZLFrjAqtj34HY#";
const banks = ["HDFC","ICICI","AXIS","KOTAK","IDFC FIRST","BANDHAN BANK","INDUSIND BANK","YES BANK"];
const nbfcs = ["CHOLAMANDALAM","TATA CAPITAL","FINNABLE","SMFG","PIRAMAL FINANCE","ADITYA BIRLA","POONAWALLA","BAJAJ FINSERV"];

function initials(name){
  return name.split(" ").map(w=>w[0]).join("").slice(0,3).toUpperCase();
}

function buildBadges(list, type){
  return list.map(name => `
    <div class="badge">
      <span class="mark">${initials(name)}</span>
      <span class="b-name">${name}</span>
      <span class="b-type">${type}</span>
    </div>`).join("");
}

function fillTrack(id, list, type){
  const el = document.getElementById(id);
  if(!el) return;
  const html = buildBadges(list, type);
  el.innerHTML = html + html; // duplicate for seamless loop
}

fillTrack("track1", banks, "Bank");
fillTrack("track2", nbfcs, "NBFC");

// ---------- Nav scroll state ----------
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

// ---------- Mobile menu ----------
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------- Contact form -> private backend (Google Sheet + auto-reply) ----------
// PASTE your deployed Google Apps Script Web App URL below (see backend/APPS_SCRIPT_SETUP.md)
const LEADS_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("cf-status");
const submitBtn = document.getElementById("cf-submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("cf-name").value;
  const phone = document.getElementById("cf-phone").value;
  const email = document.getElementById("cf-email").value;
  const need = document.getElementById("cf-need").value;
  const msg = document.getElementById("cf-msg").value;

  const payload = { name, phone, email, need, message: msg };

  // Try saving the lead + firing the auto-reply. If the endpoint isn't
  // configured yet, this fails silently and we just fall back to WhatsApp.
  if (LEADS_ENDPOINT && !LEADS_ENDPOINT.startsWith("PASTE_")) {
    submitBtn.disabled = true;
    statusEl.textContent = "Sending...";
    try {
      await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids CORS preflight with Apps Script
        body: JSON.stringify(payload)
      });
      statusEl.textContent = "Message sent — check your email for confirmation. Opening WhatsApp too...";
    } catch (err) {
      statusEl.textContent = "Couldn't reach the server, opening WhatsApp instead...";
    }
    submitBtn.disabled = false;
  }

  const text = `Hi Navcrest, I'm ${name} (${phone}).%0AI need help with: ${need}.%0A${msg ? "Details: " + msg : ""}`;
  window.open(`https://wa.me/917091776353?text=${encodeURIComponent(text).replace(/%2520/g,"%20")}`, "_blank");
  form.reset();
});
