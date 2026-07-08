/* =========================================
   AZUL PENÍNSULA — main.js
   ========================================= */

// ── Traducciones ─────────────────────────
const translations = {
  es: {
    // Nav
    "nav.inicio": "Inicio",
    "nav.nosotros": "Nosotros",
    "nav.departamentos": "Departamentos",
    "nav.contacto": "Contacto",

    // Footer
    "footer.tagline": "Comodidad para vivir.",
    "footer.nav": "Navegación",
    "footer.contacto": "Contacto",
    "footer.legal": "Legal",
    "footer.aviso": "Aviso de privacidad",
    "footer.terminos": "Términos de uso",
    "footer.rights": "DWS | Todos los derechos reservados.",

    // index.html
    "hero.titulo": "Bienvenido a Azul Península",
    "hero.subtitulo": "Un lugar donde vivir bien es el estándar.",
    "hero.cta1": "Ver departamentos",
    "hero.cta2": "Conocer más",

    "home.nosotros.label": "Quiénes somos",
    "home.nosotros.titulo": "Comunidad, transparencia y calidad de vida",
    "home.nosotros.texto":
      "Azul Península es un fraccionamiento residencial administrado con transparencia, donde cada residente forma parte de una comunidad comprometida con el bienestar colectivo.",
    "home.nosotros.cta": "Conoce a la administración",

    "home.deptos.label": "Disponibles",
    "home.deptos.titulo": "Departamentos en renta",
    "home.deptos.texto":
      "Espacios modernos y bien equipados listos para habitarse.",
    "home.deptos.cta": "Ver catálogo completo",

    "home.contacto.label": "¿Listo para vivir aquí?",
    "home.contacto.titulo": "Agenda una visita",
    "home.contacto.texto":
      "Nuestro equipo está listo para mostrarte las opciones disponibles.",
    "home.contacto.cta": "Contactar ahora",

    // about.html
    "about.hero.titulo": "Nosotros",
    "about.hero.sub":
      "Conoce la estructura que administra y cuida Azul Península.",
    "about.admin.label": "Administración",
    "about.admin.titulo": "Estructura organizacional",
    "about.mesa.label": "Mesa Directiva",
    "about.mesa.titulo": "Quiénes nos representan",
    "about.vigilancia.label": "Consejo de Vigilancia",
    "about.vigilancia.titulo": "Supervisión y transparencia",
    "about.operativo.label": "Equipo Operativo",
    "about.operativo.titulo": "Gestión y administración",

    // listings.html
    "listings.hero.titulo": "Departamentos en Renta",
    "listings.hero.sub": "Encuentra el espacio ideal para ti.",
    "listings.filtro.todos": "Todos",
    "listings.filtro.disponible": "Disponibles",
    "listings.filtro.rentado": "Rentados",
    "listings.card.renta": "/ mes",
    "listings.card.cta": "Ver detalles",

    // asesores.html
    "nav.asesores": "Asesores",
    "asesores.label": "Directorio",
    "asesores.titulo": "Nuestros Asesores",
    "asesores.sub": "Profesionales listos para ayudarte a encontrar tu departamento ideal.",
    "asesores.elegir": "Elegir este asesor",
    "asesores.resena": "Dejar reseña",
    "asesores.modal.titulo": "Dejar reseña",
    "asesores.modal.cancelar": "Cancelar",
    "asesores.modal.guardar": "Publicar reseña",

    // contact.html
    "contact.hero.titulo": "Contacto",
    "contact.hero.sub": "Estamos para ayudarte. Agenda una cita o escríbenos.",
    "contact.form.nombre": "Nombre completo",
    "contact.form.email": "Correo electrónico",
    "contact.form.tel": "Teléfono (opcional)",
    "contact.form.mensaje": "Mensaje",
    "contact.form.fecha": "Fecha preferida de visita",
    "contact.form.cta": "Enviar mensaje",
    "contact.wa.cta": "Escribir por WhatsApp",
  },

  en: {
    // Nav
    "nav.inicio": "Home",
    "nav.nosotros": "About",
    "nav.departamentos": "Listings",
    "nav.contacto": "Contact",

    // Footer
    "footer.tagline": "Comfort for living.",
    "footer.nav": "Navigation",
    "footer.contacto": "Contact",
    "footer.legal": "Legal",
    "footer.aviso": "Privacy notice",
    "footer.terminos": "Terms of use",
    "footer.rights": "DWS | All rights reserved.",

    // index.html
    "hero.titulo": "Welcome to Azul Península",
    "hero.subtitulo": "A place where living well is the standard.",
    "hero.cta1": "View listings",
    "hero.cta2": "Learn more",

    "home.nosotros.label": "About us",
    "home.nosotros.titulo": "Community, transparency and quality of life",
    "home.nosotros.texto":
      "Azul Península is a residential community managed with transparency, where every resident is part of a collective committed to well-being.",
    "home.nosotros.cta": "Meet the administration",

    "home.deptos.label": "Available now",
    "home.deptos.titulo": "Apartments for rent",
    "home.deptos.texto": "Modern, well-equipped spaces ready to move in.",
    "home.deptos.cta": "View full catalogue",

    "home.contacto.label": "Ready to live here?",
    "home.contacto.titulo": "Schedule a visit",
    "home.contacto.texto":
      "Our team is ready to show you the available options.",
    "home.contacto.cta": "Contact us",

    // about.html
    "about.hero.titulo": "About Us",
    "about.hero.sub":
      "Learn about the team that manages and cares for Azul Península.",
    "about.admin.label": "Administration",
    "about.admin.titulo": "Organizational structure",
    "about.mesa.label": "Board of Directors",
    "about.mesa.titulo": "Who represents us",
    "about.vigilancia.label": "Oversight Council",
    "about.vigilancia.titulo": "Supervision and transparency",
    "about.operativo.label": "Operations Team",
    "about.operativo.titulo": "Management and administration",

    // listings.html
    "listings.hero.titulo": "Apartments for Rent",
    "listings.hero.sub": "Find the ideal space for you.",
    "listings.filtro.todos": "All",
    "listings.filtro.disponible": "Available",
    "listings.filtro.rentado": "Rented",
    "listings.card.renta": "/ month",
    "listings.card.cta": "View details",

    // asesores.html
    "nav.asesores": "Agents",
    "asesores.label": "Directory",
    "asesores.titulo": "Our Agents",
    "asesores.sub": "Professionals ready to help you find your ideal apartment.",
    "asesores.elegir": "Choose this agent",
    "asesores.resena": "Leave a review",
    "asesores.modal.titulo": "Leave a review",
    "asesores.modal.cancelar": "Cancel",
    "asesores.modal.guardar": "Publish review",

    // contact.html
    "contact.hero.titulo": "Contact",
    "contact.hero.sub":
      "We're here to help. Schedule an appointment or write to us.",
    "contact.form.nombre": "Full name",
    "contact.form.email": "Email address",
    "contact.form.tel": "Phone (optional)",
    "contact.form.mensaje": "Message",
    "contact.form.fecha": "Preferred visit date",
    "contact.form.cta": "Send message",
    "contact.wa.cta": "Chat on WhatsApp",
  },
};

// ── Estado global ─────────────────────────
let currentLang = localStorage.getItem("ap_lang") || "es";

// ── Aplicar traducciones ──────────────────
function applyTranslations(lang) {
  const t = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Actualizar lang del documento
  document.documentElement.lang = lang;

  // Actualizar botones activos
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("ap_lang", lang);
  applyTranslations(lang);
}

// ── Navbar scroll ─────────────────────────
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true },
  );

  // Active link
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle(
      "active",
      href === currentPage || (currentPage === "" && href === "index.html"),
    );
  });
}

// ── Hamburger menu ────────────────────────
function initHamburger() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
    const isOpen = links.classList.contains("open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.querySelectorAll("span")[0].style.transform = isOpen
      ? "rotate(45deg) translate(4.5px, 4.5px)"
      : "";
    toggle.querySelectorAll("span")[1].style.opacity = isOpen ? "0" : "1";
    toggle.querySelectorAll("span")[2].style.transform = isOpen
      ? "rotate(-45deg) translate(4.5px, -4.5px)"
      : "";
  });

  // Cerrar al hacer click en un link
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });
}

// ── Lang buttons ──────────────────────────
function initLangSwitch() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
}

// ── Footer dinámico ───────────────────────
function initFooter() {
  const placeholder = document.getElementById("footer");
  if (!placeholder) return;

  // Detectar si estamos en raíz o en pages/
  const isPages = location.pathname.includes("/pages/");
  const src = isPages
    ? "../components/footer-pages.html"
    : "components/footer.html";

  fetch(src)
    .then((r) => r.text())
    .then((html) => {
      placeholder.outerHTML = html;
      // Re-aplicar traducciones al footer recién inyectado
      applyTranslations(currentLang);
    })
    .catch(() => console.warn("Footer no encontrado:", src));
}

// ── Animación de entrada ──────────────────
function initFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

// ── Init ──────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHamburger();
  initLangSwitch();
  initFooter();
  initFadeIn();
  applyTranslations(currentLang);
  console.log("Inicilizado");
});
