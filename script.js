/* =========================================================
   ADSON ISAN — Portfolio Prime (final)
   Tema, menu, animação reveal, FAQ (com schema),
   grid de cases com filtros, contato (FormSubmit + WhatsApp),
   e botões flutuantes com aparição no scroll
========================================================= */

// Tema
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") root.classList.add("light");
const themeToggle = document.getElementById("themeToggle");
function setThemeIcon(){ if (themeToggle) themeToggle.textContent = root.classList.contains("light") ? "🌞" : "🌙"; }
setThemeIcon();
themeToggle?.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
  setThemeIcon();
});

// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks?.addEventListener("click", (e) => {
  const isLink = e.target.tagName === "A" && navLinks.classList.contains("open");
  if (isLink) navLinks.classList.remove("open");
});

// Scroll topo/fim
document.getElementById("toTopBtn")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("toBottomBtn")?.addEventListener("click", () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));

// Aparição inteligente dos botões flutuantes
const topBtn = document.getElementById("toTopBtn");
const bottomBtn = document.getElementById("toBottomBtn");
function updateFloatButtons(){
  const y = window.scrollY || document.documentElement.scrollTop;
  const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 20);

  if (y > 200){ topBtn?.classList.remove("is-hidden"); bottomBtn?.classList.remove("is-hidden"); }
  else { topBtn?.classList.add("is-hidden"); bottomBtn?.classList.add("is-hidden"); }

  if (nearBottom) bottomBtn?.classList.add("is-hidden");
}
window.addEventListener("scroll", updateFloatButtons, { passive: true });
window.addEventListener("load", updateFloatButtons);

// Reduce motion
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal (inclui elementos dinâmicos)
let io = null;
if (!prefersReduced){
  const style = document.createElement("style");
  style.textContent = `.reveal{opacity:0; transform:translateY(12px); transition:opacity .6s ease, transform .6s ease}.reveal.in{opacity:1; transform:none}`;
  document.head.appendChild(style);
  io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
}
function observeReveal(el){
  if (!io || !el) return;
  const rect = el.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  if (inView) el.classList.add("in");
  else io.observe(el);
}
document.querySelectorAll(".reveal").forEach(observeReveal);

// Helpers
const el = (t,c,h)=>{const $=document.createElement(t); if(c)$.className=c; if(h!==undefined)$.innerHTML=h; return $;};

// FAQ
const faqItems = [
  { q:"Disponibilidade e modelo de trabalho", a:"Imediata. Remoto ou presencial em Itapetininga. Alinhamos escopo e jornada conforme a necessidade." },
  { q:"Processo de trabalho", a:"Briefing → proposta objetiva → rascunho/protótipo → entrega → mensuração por eventos." },
  { q:"Ferramentas e tecnologias", a:"Canva, Facebook Ads, Instagram, Youtube, Facebook, GitHub Pages, Trello; experiência com Mercado Livre e Bing." },
  { q:"Projetos que assumo", a:"Identidade Visual, gerenciamente e criação de contéudo para midias digitais, criação de copywriting, criação de visuais para sites e campanhas." }
];

const faqGrid = document.getElementById("faqGrid");
if (faqGrid){
  faqItems.forEach(({q,a})=>{
    const d = document.createElement("details");
    d.className = "reveal";
    const s = document.createElement("summary"); s.textContent = q;
    const p = el("p", null, a);
    d.appendChild(s); d.appendChild(p);
    faqGrid.appendChild(d);
    observeReveal(d);
  });

  // Schema.org FAQPage
  const schema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity": faqItems.map(({q,a})=>({
      "@type":"Question","name":q,
      "acceptedAnswer":{"@type":"Answer","text":a}
    }))
  };
  const faqScript = document.getElementById("faq-schema");
  if (faqScript) faqScript.textContent = JSON.stringify(schema);
}

// Projects
const projects = [
  {
    title: "Landing Page — Curso Intensivo de Excel",
    type: "Landing Page",
    objective: "Criar uma landing page fictícia para promover um curso intensivo de Excel, priorizando conversão e clareza na comunicação.",
    solution: "Desenvolvimento completo em HTML, CSS e JavaScript com foco em design estratégico,, copywriting persuasivo e SEO básico.",
    tags: [, "Copywriting", "Design Estratégico", "SEO"],
    image: "lp-curso-excel.png",
    link: "https://O-dynn.github.io/lp-curso-excel/",
    repo: "https://github.com/O-dynn/lp-curso-excel"
  },
  {
    title: "Brisa Café — Website de Cafeteria Artesanal",
    type: "Landing Page",
    objective: "Apresentar habilidades de design e SEO aplicadas a comércio local, destacando cafés especiais e confeitaria.",
    solution: "HTML, CSS e JavaScript puros, com design responsivo, SEO otimizado, acessibilidade e integração ao WhatsApp/FormSubmit.",
    tags: ["UI/UX", "Acessibilidade", "SEO", "Landing Page"],
    image: "lp-brisa-cafe.png",
    link: "https://O-dynn.github.io/lp-brisa-cafe/",
    repo: "https://github.com/O-dynn/lp-brisa-cafe"
  }
];

const filtersWrap = document.getElementById("projectsFilters");
const grid = document.getElementById("projectsGrid");
let currentFilter = "all";

function setActiveFilter(btn){
  if(!filtersWrap) return;
  [...filtersWrap.querySelectorAll(".chip")].forEach(c=>c.classList.remove("active"));
  btn.classList.add("active");
}
filtersWrap?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  currentFilter = btn.dataset.filter || "all";
  setActiveFilter(btn);
  renderProjects();
});

// Card de projeto
function projectCard(p){
  const card = el("article","card case reveal");
  const img = document.createElement("img");
  img.className = "thumb"; img.loading = "lazy";
  img.src = p.image || ""; img.alt = `Case: ${p.title}`;
  card.appendChild(img);

  const content = el("div","content");
  content.appendChild(el("h3",null,p.title));

  const meta = el("div","meta");
  meta.appendChild(el("span","tag",p.type.toUpperCase()));
  (p.tags || []).filter(Boolean).forEach(t => meta.appendChild(el("span","tag",t))); // robusto
  content.appendChild(meta);

  content.appendChild(el("p",null,`<strong>Objetivo:</strong> ${p.objective}`));
  content.appendChild(el("p",null,`<strong>Solução:</strong> ${p.solution}`));

  const actions = el("div","actions");
  if (p.link){ const a = el("a","btn primary","Ver Demo"); a.href=p.link; a.target="_blank"; a.rel="noopener"; actions.appendChild(a); }
  if (p.repo){ const r = el("a","btn ghost","Código"); r.href=p.repo; r.target="_blank"; r.rel="noopener"; actions.appendChild(r); }
  content.appendChild(actions);

  card.appendChild(content);
  observeReveal(card);
  return card;
}

function renderProjects(){
  if (!grid) return;
  grid.innerHTML = "";
  (projects.filter(p => currentFilter==="all" ? true : p.type===currentFilter))
    .forEach(p => grid.appendChild(projectCard(p)));
}
renderProjects();

// Contato — botão WhatsApp (envia o que foi digitado)
document.getElementById("waBtn")?.addEventListener("click", () => {
  const f = document.getElementById("quickForm");
  if (!f) return;
  const nome = f.elements["nome"]?.value?.trim() || "";
  const email = f.elements["email"]?.value?.trim() || "";
  const mensagem = f.elements["mensagem"]?.value?.trim() || "";
  const texto = `Olá Adson, sou ${nome}.%0A%0AObjetivo:%0A${encodeURIComponent(mensagem)}%0A%0AContato: ${encodeURIComponent(email)}`;
  window.open(`https://wa.me/5515998584798?text=${texto}`, "_blank");
});

// Ano no footer
document.getElementById("year")?.append(new Date().getFullYear());
