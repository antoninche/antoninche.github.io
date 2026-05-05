const $ = (sel) => document.querySelector(sel);
 
const projects = [
  {
    title: "Défi Nature — IA & simulations (Pygame)",
    desc: "Recréation du jeu Défi Nature en Python avec interface Pygame, plusieurs stratégies de robots et un module de simulations statistiques.",
    tags: ["Python", "Pygame", "IA", "Simulations"],
    repo: "https://github.com/NSI-Term-2025-2026/defi-nature-trophee-nsi",
    cover: "https://opengraph.githubassets.com/1/NSI-Term-2025-2026/defi-nature-trophee-nsi",
    highlights: ["Interface complète + historique", "Stratégies heuristiques et probabilistes", "Architecture moteur / UI séparés"],
  },
  {
    title: "Noob-Note — Gestion scolaire (Flask + SQLite)",
    desc: "Plateforme de gestion scolaire type PRONOTE : notes, moyennes, rangs. Architecture web dynamique, logique métier POO et base SQLite.",
    tags: ["Python", "Flask", "SQLite", "HTML/CSS"],
    repo: "https://github.com/antoninche/noob-note",
    cover: "https://opengraph.githubassets.com/1/antoninche/noob-note",
    highlights: ["Dashboard professeur", "Structure web propre", "Données centralisées"],
  },
  {
    title: "Bot Discord — Modulaire & stable (discord.py 2.x)",
    desc: "Bot Discord en Python : architecture modulaire, config validée au démarrage, logs clairs, commandes utiles. Inclut un site de doc GitHub Pages.",
    tags: ["Python", "discord.py", "Logs", "GitHub Pages"],
    repo: "https://github.com/antoninche/bot-discord",
    cover: "https://opengraph.githubassets.com/1/antoninche/bot-discord",
    highlights: ["Modules / commands", "Configuration propre", "Documentation web"],
  },
  {
    title: "Site Restaurant — Theme switcher (3 styles)",
    desc: "Site vitrine statique réutilisable : bistro / gastro / street en 1 clic avec thème persisté entre les pages.",
    tags: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/antoninche/site-restaurant",
    cover: "https://opengraph.githubassets.com/1/antoninche/site-restaurant",
    highlights: ["3 ambiances visuelles", "Persistance du thème", "Base réutilisable client"],
  },
];

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function projectCard(p) {
  const tags = p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
  const hl = (p.highlights || []).slice(0, 3).map((x) => `• ${escapeHtml(x)}`).join("<br>");
  return `
    <article class="card project reveal">
      <img class="cover" src="${p.cover}" alt="Aperçu ${escapeHtml(p.title)}" loading="lazy" />
      <div class="inner">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.desc)}</p>
        <div class="tags">${tags}</div>
        <p class="muted" style="margin:0 0 12px; font-size:13px;">${hl}</p>
        <div class="links">
          <a class="linkBtn" href="${p.repo}" target="_blank" rel="noreferrer">Repo ↗</a>
        </div>
      </div>
    </article>
  `;
}

// Render projects
const grid = $("#projectsGrid");
grid.innerHTML = projects.map(projectCard).join("");

// Theme
const THEME_KEY = "antonin_theme";
function setTheme(mode) {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem(THEME_KEY, mode);
  const icon = $("#themeBtn .icon");
  if (icon) icon.textContent = mode === "light" ? "☼" : "☾";
}
const saved = localStorage.getItem(THEME_KEY);
setTheme(saved || "dark");

$("#themeBtn")?.addEventListener("click", () => {
  const cur = document.documentElement.dataset.theme || "dark";
  setTheme(cur === "dark" ? "light" : "dark");
});

// Mobile menu
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
menuBtn?.addEventListener("click", () => {
  const isHidden = mobileMenu.hasAttribute("hidden");
  if (isHidden) mobileMenu.removeAttribute("hidden");
  else mobileMenu.setAttribute("hidden", "");
});
mobileMenu?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") mobileMenu.setAttribute("hidden", "");
});

// Copy @
$("#copyBtn")?.addEventListener("click", async (e) => {
  const handle = e.currentTarget.getAttribute("data-copy") || "antoninche";
  try {
    await navigator.clipboard.writeText(handle);
    e.currentTarget.textContent = "Copié";
    setTimeout(() => (e.currentTarget.textContent = "Copier mon @GitHub"), 1400);
  } catch {
    e.currentTarget.textContent = "Impossible";
    setTimeout(() => (e.currentTarget.textContent = "Copier mon @GitHub"), 1400);
  }
});

$("#year").textContent = String(new Date().getFullYear());


const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
