/* ========================================================
   Proyecto Golden Chance Senior
   Este archivo ha sido desarrollado por la autora
   (Marta Alarcón Rodríguez).
   Durante el desarrollo se utilizaron herramientas de
   Inteligencia Artificial (ChatGPT y Claude) como apoyo para:
   - optimización del código
   - revisión de lógica JavaScript
   - mejoras de rendimiento
   - animaciones
   - depuración
   Todo el código fue revisado, probado y adaptado por
   la autora antes de su integración.
======================================================== */

/* ==========================================================
   HOME
   - Cabecera: sombra y barra de progreso al hacer scroll.
   - Llamada fija inferior en móvil y tablet.
   - Aparición de contenidos y parallax suave (IntersectionObserver).
   - Formulario: validación accesible y envío por FormSubmit.
========================================================== */

(() => {
  "use strict";

  /* ---------- Constantes ---------- */
  const FORM_ENDPOINT = "https://formsubmit.co/ajax/info@goldenchance.es";
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const SCROLL_SHADOW_OFFSET = 40;
  const PARALLAX_STRENGTH = 36;
  const INTEREST_LABELS = {
    novedades: "Novedades del proyecto",
    dossier: "Dossier informativo",
    llamada: "Llamada o videollamada",
  };
  const PROFILE_LABELS = ["—", "Para sí", "Para sí y su pareja", "Para un familiar"];

  const root = document.documentElement;
  const header = document.querySelector(".Header");
  const progressBar = document.querySelector(".Header-progress");
  const hero = document.querySelector(".Hero");
  const contactBlock = document.querySelector("#contacto");
  const stickyCta = document.querySelector(".StickyCta");
  const revealItems = document.querySelectorAll(".rv, .rv-img, .rv-group");
  const parallaxItems = document.querySelectorAll(".is-parallax");
  const leadForm = document.querySelector("#lead-form");
  const nameInput = document.querySelector("#f-name");
  const emailInput = document.querySelector("#f-email");
  const privacyInput = document.querySelector("#f-privacy");
  const nameError = document.querySelector("#e-name");
  const emailError = document.querySelector("#e-email");
  const privacyError = document.querySelector("#e-privacy");
  const sendError = document.querySelector("#e-send");
  const submitButton = document.querySelector(".Form-submit");
  const successMessage = document.querySelector("#form-success");
  const canAnimate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  /* ---------- Variables de estado ---------- */
  let isPastHero = false;
  let isNearForm = false;
  let isHeaderScrolled = false;
  let isFrameRequested = false;
  const visibleParallaxItems = new Set();

  /* ---------- Funciones ---------- */

  /** Muestra la llamada fija tras la portada y la oculta junto al formulario. */
  function updateStickyCta() {
    stickyCta.classList.toggle("is-visible", isPastHero && !isNearForm);
  }

  function heroObserverHandler(entries) {
    isPastHero = !entries[0].isIntersecting;
    updateStickyCta();
  }

  function contactObserverHandler(entries) {
    isNearForm = entries[0].isIntersecting;
    updateStickyCta();
  }

  /** Marca como visible cada elemento al entrar en pantalla (una sola vez). */
  function revealObserverHandler(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    });
  }

  /** Solo se calcula el parallax de las fotos que están en pantalla. */
  function parallaxObserverHandler(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleParallaxItems.add(entry.target);
      } else {
        visibleParallaxItems.delete(entry.target);
      }
    });
  }

  /**
   * Un fotograma de scroll: primero todas las lecturas de layout y
   * después todas las escrituras, para no forzar reflujos.
   */
  function renderScrollFrame() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const maxScroll = root.scrollHeight - viewportHeight;
    const shouldShowShadow = scrollY > SCROLL_SHADOW_OFFSET;
    const shifts = [...visibleParallaxItems].map((item) => {
      const rect = item.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;

      return { image: item.querySelector(".Photo-img"), value: offset * -PARALLAX_STRENGTH };
    });

    isFrameRequested = false;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0})`;
    }

    if (shouldShowShadow !== isHeaderScrolled) {
      isHeaderScrolled = shouldShowShadow;
      header.classList.toggle("is-scrolled", isHeaderScrolled);
    }

    shifts.forEach((shift) => {
      shift.image.style.translate = `0 ${shift.value.toFixed(1)}px`;
    });
  }

  /** Agrupa los eventos de scroll en un único fotograma. */
  function scrollHandler() {
    if (!isFrameRequested) {
      isFrameRequested = true;
      window.requestAnimationFrame(renderScrollFrame);
    }
  }

  /**
   * Muestra u oculta el error de un campo y actualiza aria-invalid.
   * @param {HTMLInputElement} input
   * @param {HTMLElement} errorElement
   * @param {boolean} hasError
   */
  function setFieldError(input, errorElement, hasError) {
    errorElement.hidden = !hasError;
    input.setAttribute("aria-invalid", String(hasError));
  }

  /** Datos que recibe Golden Chance por correo, siempre en español. */
  function buildPayload() {
    const isEnglish = root.lang === "en";
    const interests = [...leadForm.querySelectorAll('input[name="interes"]:checked')].map(
      (checkbox) => INTEREST_LABELS[checkbox.value]
    );

    return {
      _subject: "Nueva solicitud · Golden Chance Senior",
      _template: "table",
      Nombre: nameInput.value.trim(),
      "Correo electrónico": emailInput.value.trim(),
      Teléfono: leadForm.telefono.value.trim() || "—",
      "País de residencia": leadForm.pais.value.trim() || "—",
      "Idioma de contacto": leadForm.idioma.value === "en" ? "Inglés" : "Español",
      "Quiere recibir": interests.join(" · ") || "—",
      "Se interesa": PROFILE_LABELS[leadForm.perfil.selectedIndex],
      "Idioma de la web": isEnglish ? "Inglés" : "Español",
      "Acepta la política de privacidad": "Sí",
    };
  }

  /** Valida, envía con fetch y muestra el resultado sin recargar la página. */
  async function formSubmitHandler(event) {
    const hasNameError = !nameInput.value.trim();
    const hasEmailError = !EMAIL_PATTERN.test(emailInput.value.trim());
    const hasPrivacyError = !privacyInput.checked;
    const isBot = Boolean(leadForm._honey.value);
    const firstInvalidField = [
      [hasNameError, nameInput],
      [hasEmailError, emailInput],
      [hasPrivacyError, privacyInput],
    ].find(([hasError]) => hasError)?.[1];
    const originalLabel = submitButton.textContent;

    event.preventDefault();
    setFieldError(nameInput, nameError, hasNameError);
    setFieldError(emailInput, emailError, hasEmailError);
    setFieldError(privacyInput, privacyError, hasPrivacyError);

    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    if (isBot) {
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = root.lang === "en" ? "Sending…" : "Enviando…";
    sendError.hidden = true;

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const result = await response.json();

      if (!response.ok || String(result.success) !== "true") {
        throw new Error(result.message || response.status);
      }

      contactBlock.classList.add("is-sent");
      successMessage.focus();
    } catch {
      sendError.hidden = false;
      sendError.focus();
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  }

  /* ---------- Asignaciones ---------- */
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(revealObserverHandler, {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
    });

    new IntersectionObserver(heroObserverHandler).observe(hero);
    new IntersectionObserver(contactObserverHandler).observe(contactBlock);
    revealItems.forEach((item) => revealObserver.observe(item));

    if (canAnimate) {
      const parallaxObserver = new IntersectionObserver(parallaxObserverHandler);

      parallaxItems.forEach((item) => parallaxObserver.observe(item));
    }
  }

  window.addEventListener("scroll", scrollHandler, { passive: true });
  window.addEventListener("resize", scrollHandler);
  leadForm?.addEventListener("submit", formSubmitHandler);
  renderScrollFrame();
})();
