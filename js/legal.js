/* ========================================================
   Proyecto Golden Chance Senior
   Este archivo ha sido desarrollado por la autora
   (Marta Alarcón Rodríguez).
   Durante el desarrollo se utilizaron herramientas de
   Inteligencia Artificial (ChatGPT y Claude) como apoyo para:
   - revisión de lógica JavaScript
   - depuración
   Todo el código fue revisado, probado y adaptado por
   la autora antes de su integración.
======================================================== */

/* ==========================================================
   LEGAL
   Cambio de idioma de la página legal. Cada idioma tiene su
   propio bloque de contenido; los anclajes (#privacidad ↔
   #privacy) se traducen para que el enlace siga funcionando.
========================================================== */

(() => {
  "use strict";

  const STORAGE_KEY = "gcs-lang";
  const TITLES = {
    es: "Información legal · Golden Chance Senior",
    en: "Legal information · Golden Chance Senior",
  };
  const ANCHORS_EN = {
    "aviso-legal": "legal-notice",
    privacidad: "privacy",
    cookies: "cookies-en",
  };
  const ANCHORS_ES = Object.fromEntries(
    Object.entries(ANCHORS_EN).map(([spanish, english]) => [english, spanish])
  );

  const root = document.documentElement;
  const langGroup = document.querySelector(".Lang");
  const langButtons = document.querySelectorAll(".Lang-btn");
  const homeLinks = document.querySelectorAll(".js-homeLink");

  /** Idioma inicial: ?lang=… en la URL, si no la preferencia guardada. */
  function getInitialLanguage() {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");

    if (urlLanguage === "en" || urlLanguage === "es") {
      return urlLanguage;
    }

    try {
      return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "es";
    } catch {
      return "es";
    }
  }

  /**
   * Aplica el idioma: contenido visible, título, botones, enlaces,
   * URL y anclaje equivalente.
   * @param {"es"|"en"} language
   */
  function applyLanguage(language) {
    const isEnglish = language === "en";
    const currentAnchor = window.location.hash.slice(1);
    const targetAnchor = isEnglish
      ? ANCHORS_EN[currentAnchor] || currentAnchor
      : ANCHORS_ES[currentAnchor] || currentAnchor;
    const targetSection = targetAnchor ? document.getElementById(targetAnchor) : null;
    const url = new URL(window.location.href);

    root.lang = language;
    document.title = TITLES[language];

    langButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === language));
    });

    homeLinks.forEach((link) => {
      link.setAttribute("href", isEnglish ? "../index.html?lang=en" : "../index.html");
    });

    if (isEnglish) {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }

    url.hash = targetAnchor ? `#${targetAnchor}` : "";
    window.history.replaceState(null, "", url);
    targetSection?.scrollIntoView();

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* Sin almacenamiento disponible: el idioma se mantiene solo en esta visita. */
    }
  }

  /** Delegación de eventos: un único listener en el grupo de botones. */
  function languageClickHandler(event) {
    const button = event.target.closest(".Lang-btn");

    if (button) {
      applyLanguage(button.dataset.lang);
    }
  }

  langGroup?.addEventListener("click", languageClickHandler);
  applyLanguage(getInitialLanguage());
})();
