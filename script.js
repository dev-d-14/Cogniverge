// Event data — add a "link" to each event when registration forms are ready.
const events = [
  { name: "Tech Pictionary", organizer: "Sania", summary: "A little tech. A little sketch. A lot of quick thinking." },
  { name: "UI/UX Design", organizer: "Karthikeya", summary: "Where thoughtful interfaces meet creative problem-solving." },
  { name: "Project Expo", organizer: "Nandini", summary: "Big ideas, real projects. Put your innovation in the spotlight." },
  { name: "Byte Hunt", organizer: "Varshitha", summary: "Follow your curiosity. Let your technical instincts lead the way." },
  { name: "Prompt and Panic", organizer: "Srija", summary: "Bring your imagination to the intersection of prompts and possibility." },
];

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const grid = document.getElementById("eventGrid");

events.forEach((e, i) => {
  const card = document.createElement("article");
  card.className = "event-card";
  card.innerHTML = `
    <div class="event-top"><span class="event-icon">${i + 1}</span><span class="event-number">0${i + 1} / TECHNICAL</span></div>
    <h3>${e.name}</h3><p>${e.summary}</p>
    <div class="event-footer">
      <div><span class="organizer-label">Organized by</span><span class="organizer-name">${e.organizer}</span></div>
      <button class="btn btn-icon" aria-label="View ${e.name} details">${arrow}</button>
    </div>`;
  card.querySelector("button").addEventListener("click", () => openDialog(e));
  grid.appendChild(card);
});

const pending = document.createElement("div");
pending.className = "event-card pending-event";
pending.innerHTML = `<span class="event-icon">+</span><p class="eyebrow mb-3">Beyond the technical</p><h3>More to look forward to.</h3><p>The non-technical lineup is on its way. Stay curious.</p>`;
grid.appendChild(pending);

// Dialog
const dialog = document.getElementById("dialog");
let lastFocus = null;
function openDialog(e) {
  lastFocus = document.activeElement;
  document.getElementById("dialogTitle").textContent = e.name;
  document.getElementById("dialogDesc").textContent = e.summary;
  document.getElementById("dialogOrg").textContent = e.organizer;
  dialog.classList.add("open");
  document.getElementById("dialogClose").focus();
}
function closeDialog() {
  dialog.classList.remove("open");
  if (lastFocus) lastFocus.focus();
}
document.getElementById("dialogClose").addEventListener("click", closeDialog);
dialog.addEventListener("click", (ev) => { if (ev.target === dialog) closeDialog(); });
document.addEventListener("keydown", (ev) => { if (ev.key === "Escape" && dialog.classList.contains("open")) closeDialog(); });

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
menuBtn.addEventListener("click", () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuBtn.setAttribute("aria-expanded", "false");
}));
