/* ========================================================= */
/* CONFIGURAÇÕES GERAIS */
/* ========================================================= */

const root = document.documentElement;



/* ========================================================= */
/* TEMA CLARO / ESCURO */
/* ========================================================= */

const themeToggle = document.getElementById("themeToggle");

function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function storeTheme(value) {
  try {
    localStorage.setItem("theme", value);
  } catch {
    /* Mantém o tema ativo mesmo quando o navegador bloqueia localStorage. */
  }
}

function updateThemeMeta() {
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  if (!themeMeta) return;

  themeMeta.setAttribute(
    "content",
    root.classList.contains("light") ? "#f6f8fc" : "#06152b"
  );
}

function setThemeIcon() {
  if (!themeToggle) return;

  const isLight = root.classList.contains("light");

  themeToggle.textContent = isLight ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Alternar para modo escuro" : "Alternar para modo claro"
  );
}

const savedTheme = getStoredTheme();

if (savedTheme === "light") {
  root.classList.add("light");
}

setThemeIcon();
updateThemeMeta();

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("light");

  storeTheme(root.classList.contains("light") ? "light" : "dark");
  setThemeIcon();
  updateThemeMeta();
});



/* ========================================================= */
/* MENU MOBILE */
/* ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMobileMenu() {
  navLinks?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  if (!navLinks) return;

  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  const clickedLink = event.target.closest("a");

  if (clickedLink) {
    closeMobileMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!navLinks?.classList.contains("open")) return;

  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedToggle = menuToggle?.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeMobileMenu();
  }
});



/* ========================================================= */
/* BOTÃO VOLTAR AO TOPO */
/* ========================================================= */
/* O botão flutuante foi removido do HTML. Este bloco fica seguro caso
   você decida recolocar um elemento com id="toTopBtn" no futuro. */

const topBtn = document.getElementById("toTopBtn");

topBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function updateFloatButtons() {
  if (!topBtn) return;

  const scrollY = window.scrollY || document.documentElement.scrollTop;
  topBtn.classList.toggle("is-hidden", scrollY <= 200);
}

if (topBtn) {
  window.addEventListener("scroll", updateFloatButtons, { passive: true });
  window.addEventListener("load", updateFloatButtons);
}



/* ========================================================= */
/* ANIMAÇÕES DE ENTRADA */
/* ========================================================= */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let revealObserver = null;

if (!prefersReducedMotion) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );
}

function observeReveal(element) {
  if (!element) return;

  if (!revealObserver) {
    element.classList.add("in");
    return;
  }

  const rect = element.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

  if (isVisible) {
    element.classList.add("in");
  } else {
    revealObserver.observe(element);
  }
}

document.querySelectorAll(".reveal").forEach(observeReveal);



/* ========================================================= */
/* FUNÇÃO AUXILIAR PARA CRIAR ELEMENTOS */
/* ========================================================= */

function createElement(tag, className, html) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (html !== undefined) {
    element.innerHTML = html;
  }

  return element;
}



/* ========================================================= */
/* FAQ */
/* ========================================================= */

const faqItems = [
  {
    question: "Você atua apenas com marketing ou também participa da execução?",
    answer:
      "Meu trabalho vai além do planejamento. Atuo desde a definição da estratégia até a organização e execução de projetos, estruturando processos, conteúdos, páginas, campanhas e operações digitais de acordo com os objetivos do negócio."
  },
  {
    question: "Que tipos de projetos você desenvolve?",
    answer:
      "Desenvolvo projetos voltados ao crescimento digital de empresas e profissionais, como sites institucionais, landing pages, identidade digital, estratégias de marketing, estruturação de processos, conteúdos, produtos digitais e materiais para captação e conversão."
  },
  {
    question: "Como funciona o processo de trabalho?",
    answer:
      "Cada projeto começa com um diagnóstico para entender o cenário, os objetivos e as oportunidades. A partir disso, estruturo uma estratégia personalizada, organizo a execução e acompanho os resultados para garantir que as ações façam sentido para o negócio."
  },
  {
    question: "Você atende projetos pontuais ou parcerias recorrentes?",
    answer:
      "Os dois modelos. Posso atuar em projetos específicos, como o desenvolvimento de um site ou campanha, ou acompanhar empresas de forma contínua, auxiliando na evolução das estratégias, processos e presença digital."
  }
];

const faqGrid = document.getElementById("faqGrid");

function renderFAQ() {
  if (!faqGrid) return;

  faqGrid.innerHTML = "";

  faqItems.forEach(({ question, answer }) => {
    const details = createElement("details", "reveal");
    const summary = createElement("summary", null, question);
    const paragraph = createElement("p", null, answer);

    details.appendChild(summary);
    details.appendChild(paragraph);

    faqGrid.appendChild(details);
    observeReveal(details);
  });

  renderFAQSchema();
}

function renderFAQSchema() {
  const faqScript = document.getElementById("faq-schema");

  if (!faqScript) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };

  faqScript.textContent = JSON.stringify(schema);
}

renderFAQ();



/* ========================================================= */
/* PROJETOS */
/* ========================================================= */

const projects = [
  {
    title: "Sr. Marketing - Branding e Social Media",
    type: "Marketing Estratégico",
    areas: ["Branding", "Conteúdo"],
    objective:
      "Projetar a produção de conteúdo e presença da marca Sr. Marketing como uma marca digital pensada para Instagram, marcante, com linha editorial definida e uma presença mais clara, estratégica e memorável.",
    solution:
      "Desenvolvimento de conceito de marca, estratégia para Instagram, público e persona, organização editorial e aplicação visual dos posts.",
    tags: ["Marketing Estratégico", "Social Media"],
    image: "lp-sr-marketing.png",
    link: "https://o-dynn.github.io/lp-sr-marketing/",
    repo: "https://github.com/O-dynn/lp-sr-marketing"
  },
  {
    title: "Donna Amora - Universo Digital da Marca",
    type: "Branding",
    areas: ["Marketing Estratégico", "Conteúdo"],
    objective:
      "Apresentar a Donna Amora como uma marca com identidade visual própria, presença digital consistente e uma experiência online mais sensível, elegante e estratégica.",
    solution:
      "Desenvolvimento de uma página de apresentação para o portfólio, reunindo direção visual, slideshow do projeto, prévia de Instagram e conexão direta com o site oficial da marca.",
    tags: ["Construção de Marca", "Design Estratégico"],
    image: "lp-donna-amora.png",
    link: "https://o-dynn.github.io/lp-Donna-Amora/",
    repo: "https://github.com/O-dynn/lp-Donna-Amora"
  },
  {
    title: "MonaFeed - Criação de <br> E-book Estratégico",
    type: "Produtos Digitais",
    areas: ["Marketing Estratégico", "Conteúdo"],
    objective:
      "Criar um material rico sobre estruturação e gestão de Instagram para sair do básico, com foco em gerar autoridade e apoiar campanhas de captação.",
    solution:
      "Planejamento de conteúdo, copy, estrutura visual e diagramação com foco em leitura, valor percebido e conversão.",
    tags: ["E-book", "Copywriting"],
    image: "mona-feed-ebook.png",
    link: "https://o-dynn.github.io/MonaFeed-ebook/",
    repo: "https://github.com/O-dynn/MonaFeed-ebook"
  },
  {
    title: "El Niño Sirena - Direção de Arte para Audiobook",
    type: "Conteúdo",
    areas: ["Branding", "Design Estratégico"],
    objective:
      "Explorar duas interpretações visuais para o mesmo universo narrativo, criando contraste entre uma capa para audiobook para o público geral e outra para o público infantil.",
    solution:
      "Desenvolvimento de um case visual com foco em direção de arte, composição editorial, contraste de linguagem e adaptação estética para públicos distintos dentro de uma mesma narrativa.",
    tags: ["Design Editorial", "Narrativa Visual"],
    image: "lp-el-nino-sirena.png",
    link: "https://o-dynn.github.io/lp-el-nino-sirena/",
    repo: "https://github.com/O-dynn/lp-el-nino-sirena"
  },
  {
    title: "Brisa Café — Website de Cafeteria Artesanal",
    type: "Operações Digitais",
    areas: ["Marketing Estratégico", "Branding"],
    objective:
      "Apresentar habilidades de design, SEO e desenvolvimento web aplicadas a um negócio local.",
    solution:
      "Projeto em HTML, CSS e JavaScript com responsividade, acessibilidade, SEO otimizado e integração ao WhatsApp/FormSubmit.",
    tags: ["Programação", "SEO"],
    image: "lp-brisa-cafe.png",
    link: "https://o-dynn.github.io/lp-brisa-cafe/",
    repo: "https://github.com/O-dynn/lp-brisa-cafe"
  },
  {
    title: "Curso Intensivo de Excel — Landing Page",
    type: "Operações Digitais",
    areas: ["Marketing Estratégico", "Produtos Digitais"],
    objective:
      "Criar uma landing page para promover um curso intensivo de Excel, priorizando conversão e clareza na comunicação.",
    solution:
      "Desenvolvimento em HTML, CSS e JavaScript com foco em copywriting, SEO básico, performance e design estratégico.",
    tags: ["Landing Page", "Copywriting"],
    image: "lp-curso-excel.png",
    link: "https://o-dynn.github.io/lp-curso-excel/",
    repo: "https://github.com/O-dynn/lp-curso-excel"
  }
];

const filtersWrap = document.getElementById("projectsFilters");
const projectsGrid = document.getElementById("projectsGrid");

let currentFilter = "all";
let projectsExpanded = false;
let projectResizeRaf = null;

function getProjectInitialLimit() {
  return window.innerWidth <= 820 ? 3 : 6;
}

function getCurrentFilteredProjects() {
  return projects.filter(projectMatchesFilter);
}

function removeProjectsMoreButton() {
  document.getElementById("projectsMoreWrap")?.remove();
}

function setActiveFilter(button) {
  if (!filtersWrap) return;

  const chips = filtersWrap.querySelectorAll(".chip");

  chips.forEach((chip) => {
    chip.classList.remove("active");
  });

  button.classList.add("active");
}

filtersWrap?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");

  if (!button) return;

  currentFilter = button.dataset.filter || "all";
  projectsExpanded = false;

  setActiveFilter(button);
  renderProjects();
});

function projectMatchesFilter(project) {
  if (currentFilter === "all") return true;

  return (
    project.type === currentFilter ||
    project.areas?.includes(currentFilter) ||
    project.tags?.includes(currentFilter)
  );
}

function createProjectCard(project) {
  const card = createElement("article", "project-card reveal");

  const image = document.createElement("img");
  image.loading = "lazy";
  image.src = project.image || "";
  image.alt = `Projeto: ${project.title.replace(/<br>/g, " ")}`;

  card.appendChild(image);

  const content = createElement("div", "project-content");

  const title = createElement("h3", null, project.title);
  content.appendChild(title);

  const tagsWrap = createElement("div", "tags");

  const allTags = [
    project.type,
    ...(project.areas || []),
    ...(project.tags || [])
  ].filter(Boolean);

  const uniqueTags = [...new Set(allTags)];

  uniqueTags.forEach((tag) => {
    tagsWrap.appendChild(createElement("span", "tag", tag));
  });

  content.appendChild(tagsWrap);

  content.appendChild(
    createElement("p", null, `<strong>Objetivo:</strong> ${project.objective}`)
  );

  content.appendChild(
    createElement("p", null, `<strong>Solução:</strong> ${project.solution}`)
  );

  const actions = createElement("div", "project-actions");

  if (project.link) {
    const link = createElement("a", "btn primary", "Ver Projeto");

    link.href = project.link;
    link.target = "_blank";
    link.rel = "noopener";

    actions.appendChild(link);
  }

  if (project.repo) {
    const repo = createElement("a", "btn ghost", "GitHub");

    repo.href = project.repo;
    repo.target = "_blank";
    repo.rel = "noopener";

    actions.appendChild(repo);
  }

  if (actions.children.length > 0) {
    content.appendChild(actions);
  }

  card.appendChild(content);

  observeReveal(card);

  return card;
}

function renderProjectsMoreButton(filteredProjects) {
  if (!projectsGrid) return;

  const limit = getProjectInitialLimit();

  removeProjectsMoreButton();

  if (filteredProjects.length <= limit) return;

  const wrap = createElement("div", "projects-more-wrap", "");
  wrap.id = "projectsMoreWrap";

  const button = createElement(
    "button",
    "btn ghost projects-more-btn",
    projectsExpanded ? "Ver menos projetos" : "Ver mais projetos"
  );

  button.type = "button";
  button.setAttribute(
    "aria-expanded",
    String(projectsExpanded)
  );

  button.addEventListener("click", () => {
    projectsExpanded = !projectsExpanded;
    renderProjects();

    if (!projectsExpanded) {
      document
        .getElementById("projetos")
        ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }
  });

  wrap.appendChild(button);
  projectsGrid.insertAdjacentElement("afterend", wrap);
}

function renderProjects() {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = "";

  const filteredProjects = getCurrentFilteredProjects();
  const limit = getProjectInitialLimit();
  const visibleProjects = projectsExpanded
    ? filteredProjects
    : filteredProjects.slice(0, limit);

  visibleProjects.forEach((project) => {
    projectsGrid.appendChild(createProjectCard(project));
  });

  renderProjectsMoreButton(filteredProjects);
}

window.addEventListener("resize", () => {
  if (projectResizeRaf) return;

  projectResizeRaf = window.requestAnimationFrame(() => {
    projectResizeRaf = null;
    renderProjects();
  });
});

renderProjects();




/* ========================================================= */
/* CARROSSEL DE CERTIFICADOS */
/* ========================================================= */

const certTrack = document.getElementById("certTrack");
const certPrev = document.getElementById("certPrev");
const certNext = document.getElementById("certNext");
const certDots = document.getElementById("certDots");

let certPage = 0;
let certPages = 1;

function getCertCards() {
  return certTrack ? [...certTrack.querySelectorAll(".cert-card")] : [];
}

function getCertGap() {
  if (!certTrack) return 0;

  const styles = window.getComputedStyle(certTrack);
  return parseFloat(styles.columnGap || styles.gap || "0") || 0;
}

function getCertStep() {
  const cards = getCertCards();

  if (!certTrack || !cards.length) return certTrack?.clientWidth || 0;

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = getCertGap();

  return Math.max(1, cardWidth + gap);
}

function getMaxCertScroll() {
  if (!certTrack) return 0;

  return Math.max(0, certTrack.scrollWidth - certTrack.clientWidth);
}

function getCertPageCount() {
  const maxScroll = getMaxCertScroll();
  const step = getCertStep();

  if (!certTrack || maxScroll <= 2 || !step) return 1;

  return Math.max(1, Math.ceil(maxScroll / step) + 1);
}

function getCertTarget(page) {
  const maxScroll = getMaxCertScroll();
  const step = getCertStep();

  return Math.min(maxScroll, Math.max(0, page * step));
}

function getCertPageFromScroll() {
  const step = getCertStep();

  if (!certTrack || !step) return 0;

  return Math.max(0, Math.min(Math.round(certTrack.scrollLeft / step), certPages - 1));
}

function renderCertDots() {
  if (!certDots) return;

  certDots.innerHTML = "";

  if (certPages <= 1) {
    certDots.setAttribute("hidden", "");
    return;
  }

  certDots.removeAttribute("hidden");

  for (let index = 0; index < certPages; index += 1) {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para o slide ${index + 1} da seção Formação`);

    dot.addEventListener("click", () => {
      certPage = index;
      scrollCertCarousel();
    });

    certDots.appendChild(dot);
  }
}

function syncCertControls() {
  const hasOverflow = certPages > 1;

  [certPrev, certNext].forEach((button) => {
    if (!button) return;

    button.disabled = !hasOverflow;
    button.setAttribute("aria-disabled", String(!hasOverflow));
    button.classList.toggle("is-disabled", !hasOverflow);
  });

  certDots?.querySelectorAll("button").forEach((dot, index) => {
    const isActive = index === certPage;

    dot.classList.toggle("active", isActive);

    if (isActive) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });
}

function scrollCertCarousel() {
  if (!certTrack) return;

  certTrack.scrollTo({
    left: getCertTarget(certPage),
    behavior: prefersReducedMotion ? "auto" : "smooth"
  });

  syncCertControls();
}

function updateCertCarousel() {
  if (!certTrack) return;

  const oldPages = certPages;

  certPages = getCertPageCount();
  certPage = Math.min(getCertPageFromScroll(), certPages - 1);

  if (oldPages !== certPages || certDots?.children.length !== certPages) {
    renderCertDots();
  }

  syncCertControls();
}

certPrev?.addEventListener("click", () => {
  if (certPages <= 1) return;

  certPage = certPage <= 0 ? certPages - 1 : certPage - 1;
  scrollCertCarousel();
});

certNext?.addEventListener("click", () => {
  if (certPages <= 1) return;

  certPage = certPage >= certPages - 1 ? 0 : certPage + 1;
  scrollCertCarousel();
});

let certScrollRaf = null;

certTrack?.addEventListener(
  "scroll",
  () => {
    if (certScrollRaf) return;

    certScrollRaf = window.requestAnimationFrame(() => {
      certScrollRaf = null;

      const nextPage = getCertPageFromScroll();

      if (nextPage !== certPage) {
        certPage = nextPage;
      }

      syncCertControls();
    });
  },
  { passive: true }
);

window.addEventListener("resize", () => {
  window.requestAnimationFrame(updateCertCarousel);
});

window.addEventListener("load", () => {
  updateCertCarousel();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateCertCarousel);
} else {
  updateCertCarousel();
}



/* ========================================================= */
/* FORMULÁRIO / WHATSAPP */
/* ========================================================= */

const quickForm = document.getElementById("quickForm");
const whatsappButton = document.getElementById("waBtn");
const messageField = document.getElementById("messageField");
const charCount = document.getElementById("charCount");

messageField?.addEventListener("input", () => {
  if (!charCount) return;

  charCount.textContent = messageField.value.length;
});

whatsappButton?.addEventListener("click", () => {
  if (!quickForm) return;

  const nome = quickForm.elements["nome"]?.value?.trim() || "";
  const email = quickForm.elements["email"]?.value?.trim() || "";
  const mensagem = quickForm.elements["mensagem"]?.value?.trim() || "";

  const text = [
    `Olá Adson, sou ${nome || "um visitante do seu portfólio"}.`,
    "",
    "Objetivo:",
    mensagem || "Gostaria de conversar sobre um projeto.",
    "",
    `Contato: ${email || "não informado"}`
  ].join("\n");

  const encodedText = encodeURIComponent(text);

  window.open(
    `https://wa.me/5515998584798?text=${encodedText}`,
    "_blank",
    "noopener"
  );
});




quickForm?.addEventListener("reset", () => {
  window.setTimeout(() => {
    if (charCount) {
      charCount.textContent = "0";
    }
  }, 0);
});

if (messageField && charCount) {
  charCount.textContent = String(messageField.value.length);
}



/* ========================================================= */
/* ANO ATUAL NO FOOTER */
/* ========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}