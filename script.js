const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") root.classList.add("light");

const themeToggle = document.getElementById("themeToggle");

function setThemeIcon() {
  if (themeToggle) {
    themeToggle.textContent = root.classList.contains("light") ? "🌞" : "🌙";
  }
}
setThemeIcon();

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
  setThemeIcon();
});

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

document.getElementById("toTopBtn")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("toBottomBtn")?.addEventListener("click", () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
});

const topBtn = document.getElementById("toTopBtn");
const bottomBtn = document.getElementById("toBottomBtn");

function updateFloatButtons() {
  const y = window.scrollY || document.documentElement.scrollTop;
  const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 20);

  if (y > 200) {
    topBtn?.classList.remove("is-hidden");
    bottomBtn?.classList.remove("is-hidden");
  } else {
    topBtn?.classList.add("is-hidden");
    bottomBtn?.classList.add("is-hidden");
  }

  if (nearBottom) bottomBtn?.classList.add("is-hidden");
}

window.addEventListener("scroll", updateFloatButtons, { passive: true });
window.addEventListener("load", updateFloatButtons);

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let io = null;

if (!prefersReduced) {
  const style = document.createElement("style");
  style.textContent = `.reveal{opacity:0; transform:translateY(12px); transition:opacity .6s ease, transform .6s ease}.reveal.in{opacity:1; transform:none}`;
  document.head.appendChild(style);

  io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
}

function observeReveal(el) {
  if (!io || !el) return;
  const rect = el.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  if (inView) el.classList.add("in");
  else io.observe(el);
}

document.querySelectorAll(".reveal").forEach(observeReveal);

const el = (tag, className, html) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
};

const faqItems = [
  {
    q: "Você atua com marketing ou programação?",
    a: "Atuo de forma híbrida. Posso contribuir em marketing digital, design estratégico e programação web, especialmente em projetos como sites, landing pages e produtos digitais."
  },
  {
    q: "Que tipos de projeto você desenvolve?",
    a: "Landing pages, sites institucionais, páginas promocionais, criativos para redes sociais, copywriting, materiais digitais, e-books e interfaces para web."
  },
  {
    q: "Você possui projetos publicados?",
    a: "Sim. Tenho projetos publicados e organizados no GitHub, além de presença profissional ativa no LinkedIn e em materiais visuais do portfólio."
  },
  {
    q: "Quais ferramentas fazem parte do seu fluxo de trabalho?",
    a: "Utilizo ferramentas de criação, organização e publicação como Canva, GitHub, GitHub Pages, Trello e plataformas ligadas à rotina de marketing e presença digital."
  }
];

const faqGrid = document.getElementById("faqGrid");

if (faqGrid) {
  faqItems.forEach(({ q, a }) => {
    const details = document.createElement("details");
    details.className = "reveal";

    const summary = document.createElement("summary");
    summary.textContent = q;

    const p = el("p", null, a);

    details.appendChild(summary);
    details.appendChild(p);
    faqGrid.appendChild(details);

    observeReveal(details);
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  };

  const faqScript = document.getElementById("faq-schema");
  if (faqScript) faqScript.textContent = JSON.stringify(schema);
}

const projects = [
    {
    title: "Sr. Marketing - Branding e Social Media",
    type: "Marketing",
    areas: ["Social Media", "Branding"],
    objective: "Projetar a prdução de conteúdo e presença da marca Sr. Marketing como uma marca digital pensada para Instagram, marcante, com linha editorial definida e uma presença mais clara, estratégica e memorável.",
    solution: "Desenvolvimento de um conceito de marca, estratégia para Instagram, público e persona, organização editorial e aplicação visual dos posts.",
    tags: ["Marketing", "Redes Sociais"],
    image: "lp-sr-marketing.png",
    link: "https://o-dynn.github.io/lp-sr-marketing/",
    repo: "https://o-dynn.github.io/lp-sr-marketing/"
  },
  {
    title: "Donna Amora - Universo Digital da Marca",
    type: "Site",
    areas: ["Branding", "Design"],
    objective: "Apresentar a Donna Amora como uma marca com identidade visual própria, presença digital consistente e uma experiência online mais sensível, elegante e estratégica.",
    solution: "Desenvolvimento de uma página de apresentação para o portfólio, reunindo direção visual, slideshow do projeto, prévia de Instagram e conexão direta com o site oficial da marca.",
    tags: ["Marketing","Construção de Marca"],
    image: "lp-donna-amora.png",
    link: "https://o-dynn.github.io/lp-Donna-Amora/",
    repo: "https://o-dynn.github.io/lp-Donna-Amora/"
  },
  {
    title: "MonaFeed - Criação de <br> E-book Estratégico",
    type: "Produto Digital",
    areas: ["Marketing", "Design"],
    objective: "Criar um material rico sobre estruturação e gestão de intagram para sair do básico, com fico em gerar autoridade e apoiar campanhas de captação.",
    solution: "Planejamento de conteúdo, copy, estrutura visual e diagramação com foco em leitura, valor percebido e conversão.",
    tags: ["E-book", "Página de Venda"],
    image: "mona-feed-ebook.png",
    link: "https://o-dynn.github.io/MonaFeed-ebook/",
    repo: "https://o-dynn.github.io/MonaFeed-ebook/"
  },
  {
    title: "El Niño Sirena - Direção de Arte para Audiobook",
    type: "Design",
    areas: [, "Direção Visual"],
    objective: "Explorar duas interpretações visuais para o mesmo universo narrativo, criando contraste entre uma capa para audiobook para o público geral e outra para o público infantil.",
    solution: "Desenvolvimento de um case visual com foco em direção de arte, composição editorial, contraste de linguagem e adaptação estética para públicos distintos dentro de uma mesma narrativa.",
    tags: ["Design Editorial", "Narrativa Visual"],
    image: "lp-el-nino-sirena.png",
    link: "https://o-dynn.github.io/lp-el-nino-sirena/",
    repo: "https://o-dynn.github.io/lp-el-nino-sirena/"
  },
  {
    title: "Brisa Café — Website de Cafeteria Artesanal",
    type: "Site",
    areas: ["Marketing", "Design"],
    objective: "Apresentar habilidades de design e SEO aplicadas a comércio local.",
    solution: "Projeto em HTML, CSS e JavaScript com responsividade, acessibilidade, SEO otimizado e integração ao WhatsApp/FormSubmit.",
    tags: ["Programação"],
    image: "lp-brisa-cafe.png",
    link: "https://O-dynn.github.io/lp-brisa-cafe/",
    repo: "https://github.com/O-dynn/lp-brisa-cafe"
  },
  {
    title: "Curso Intensivo de Excel — Landing Page",
    type: "Landing Page",
    areas: ["Programação", "Marketing"],
    objective: "Criar uma landing page para promover um curso intensivo de Excel, priorizando conversão e clareza na comunicação.",
    solution: "Desenvolvimento em HTML, CSS e JavaScript com foco em copywriting, SEO básico, performance e design estratégico.",
    tags: ["SEO","Copywriting"],
    image: "lp-curso-excel.png",
    link: "https://O-dynn.github.io/lp-curso-excel/",
    repo: "https://github.com/O-dynn/lp-curso-excel"
  }
];

const filtersWrap = document.getElementById("projectsFilters");
const grid = document.getElementById("projectsGrid");
let currentFilter = "all";

function setActiveFilter(btn) {
  if (!filtersWrap) return;
  [...filtersWrap.querySelectorAll(".chip")].forEach(chip => chip.classList.remove("active"));
  btn.classList.add("active");
}

filtersWrap?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  currentFilter = btn.dataset.filter || "all";
  setActiveFilter(btn);
  renderProjects();
});

function projectCard(project) {
  const card = el("article", "card case reveal");

  const img = document.createElement("img");
  img.className = "thumb";
  img.loading = "lazy";
  img.src = project.image || "";
  img.alt = `Projeto: ${project.title}`;
  card.appendChild(img);

  const content = el("div", "content");
  content.appendChild(el("h3", null, project.title));

  const meta = el("div", "meta");
  meta.appendChild(el("span", "tag", project.type.toUpperCase()));
  (project.areas || []).forEach(area => meta.appendChild(el("span", "tag", area)));
  (project.tags || []).filter(Boolean).forEach(tag => meta.appendChild(el("span", "tag", tag)));
  content.appendChild(meta);

  content.appendChild(el("p", null, `<strong>Objetivo:</strong> ${project.objective}`));
  content.appendChild(el("p", null, `<strong>Solução:</strong> ${project.solution}`));

  const actions = el("div", "actions");
  if (project.link) {
    const a = el("a", "btn primary", "Ver Projeto");
    a.href = project.link;
    a.target = "_blank";
    a.rel = "noopener";
    actions.appendChild(a);
  }

  if (project.repo) {
    const r = el("a", "btn ghost", "GitHub");
    r.href = project.repo;
    r.target = "_blank";
    r.rel = "noopener";
    actions.appendChild(r);
  }

  if (actions.children.length > 0) content.appendChild(actions);

  card.appendChild(content);
  observeReveal(card);
  return card;
}

function renderProjects() {
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = projects.filter(project => {
    if (currentFilter === "all") return true;

    return (
      project.type === currentFilter ||
      (project.areas && project.areas.includes(currentFilter)) ||
      (project.tags && project.tags.includes(currentFilter))
    );
  });

  filtered.forEach(project => grid.appendChild(projectCard(project)));
}

renderProjects();

document.getElementById("waBtn")?.addEventListener("click", () => {
  const form = document.getElementById("quickForm");
  if (!form) return;

  const nome = form.elements["nome"]?.value?.trim() || "";
  const email = form.elements["email"]?.value?.trim() || "";
  const mensagem = form.elements["mensagem"]?.value?.trim() || "";

  const texto =
    `Olá Adson, sou ${encodeURIComponent(nome)}.` +
    `%0A%0AObjetivo:%0A${encodeURIComponent(mensagem)}` +
    `%0A%0AContato: ${encodeURIComponent(email)}`;

  window.open(`https://wa.me/5515998584798?text=${texto}`, "_blank");
});

document.getElementById("year")?.append(new Date().getFullYear());