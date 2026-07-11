// ---------- Lending partner data ----------
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
