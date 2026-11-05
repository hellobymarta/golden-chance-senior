/* ========================================================
   Proyecto Golden Chance Senior
   Este archivo ha sido desarrollado por la autora
   (Marta Alarcón Rodríguez).
   Durante el desarrollo se utilizaron herramientas de
   Inteligencia Artificial (ChatGPT y Claude) como apoyo para:
   - optimización del código
   - revisión de lógica JavaScript
   - mejoras de accesibilidad
   - depuración
   Todo el código fue revisado, probado y adaptado por
   la autora antes de su integración.
======================================================== */

/* ==========================================================
   MAIN
   Menú de navegación en móvil y tablet: apertura y cierre,
   cierre al elegir una sección y cierre con la tecla Escape.
========================================================== */

(() => {
  "use strict";

  const OPEN_CLASS = "is-open";

  const navToggle = document.querySelector(".Nav-toggle");
  const nav = document.querySelector(".Nav");

  /**
   * Abre o cierra el menú y sincroniza aria-expanded.
   * @param {boolean} isOpen
   */
  function setMenuState(isOpen) {
    nav.classList.toggle(OPEN_CLASS, isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  /** Alterna el menú al pulsar el botón. */
  function toggleMenuHandler() {
    setMenuState(!nav.classList.contains(OPEN_CLASS));
  }

  /** Cierra el menú al elegir un enlace (delegación en el contenedor). */
  function closeMenuOnLinkHandler(event) {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  }

  /** Cierra el menú con Escape y devuelve el foco al botón. */
  function closeMenuOnEscapeHandler(event) {
    const isMenuOpen = nav.classList.contains(OPEN_CLASS);

    if (event.key === "Escape" && isMenuOpen) {
      setMenuState(false);
      navToggle.focus();
    }
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", toggleMenuHandler);
    nav.addEventListener("click", closeMenuOnLinkHandler);
    document.addEventListener("keydown", closeMenuOnEscapeHandler);
  }
})();
