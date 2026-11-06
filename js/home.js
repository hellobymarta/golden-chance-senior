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
   - Entorno: cambia la foto fija según la tarjeta que está en pantalla.
   - Tarjetas y fotos arrastrables con el ratón (vuelven a su sitio).
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
  /* La portada es sticky y nunca sale de pantalla: se mide con la
     sección que viene después */
  const afterHero = document.querySelector(".Hero + *");
  const contactBlock = document.querySelector("#contacto");
  const stickyCta = document.querySelector(".StickyCta");
  const revealItems = document.querySelectorAll(".rv, .rv-img, .rv-group");
  const parallaxItems = document.querySelectorAll(".is-parallax");
  const settingScenes = document.querySelectorAll(".Setting-layer, .Setting-indexItem");
  const settingPanels = document.querySelectorAll(".Setting-panel[data-scene]");
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
  const canDrag = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Variables de estado ---------- */
  let isPastHero = false;
  let isNearForm = false;
  let isHeaderScrolled = false;
  let isFrameRequested = false;
  const visibleParallaxItems = new Set();
  const dragState = { element: null, startX: 0, startY: 0 };

  /* ---------- Funciones ---------- */

  /** Muestra la llamada fija tras la portada y la oculta junto al formulario. */
  function updateStickyCta() {
    stickyCta.classList.toggle("is-visible", isPastHero && !isNearForm);
  }

  /** Se ha pasado la portada cuando la sección siguiente llega arriba. */
  function heroObserverHandler(entries) {
    const entry = entries[0];

    isPastHero = entry.isIntersecting || entry.boundingClientRect.top < 0;
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

  /** Activa la foto de fondo y la etiqueta del índice de la escena indicada. */
  function showSettingScene(scene) {
    settingScenes.forEach((element) => {
      element.classList.toggle("is-active", element.dataset.scene === scene);
    });
  }

  /** La tarjeta que cruza el centro de la pantalla decide la foto de fondo. */
  function settingObserverHandler(entries) {
    const activeEntry = entries.find((entry) => entry.isIntersecting);

    if (activeEntry) {
      showSettingScene(activeEntry.target.dataset.scene);
    }
  }

  /** Empieza a arrastrar la tarjeta o foto que se ha pulsado. */
  function dragStartHandler(event) {
    const element = event.target.closest("[data-draggable]");

    if (!element || event.button !== 0) {
      return;
    }

    event.preventDefault();
    dragState.element = element;
    dragState.startX = event.clientX;
    dragState.startY = event.clientY;
    element.setPointerCapture(event.pointerId);
    element.classList.add("is-dragging");
  }

  /** Mueve el elemento siguiendo al ratón. */
  function dragMoveHandler(event) {
    if (!dragState.element) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    dragState.element.style.translate = `${deltaX}px ${deltaY}px`;
  }

  /** Al soltar, el elemento vuelve a su sitio con la transición del CSS. */
  function dragEndHandler() {
    if (!dragState.element) {
      return;
    }

    dragState.element.classList.remove("is-dragging");
    dragState.element.style.translate = "";
    dragState.element = null;
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

    new IntersectionObserver(heroObserverHandler, {
      rootMargin: "0px 0px -95% 0px",
    }).observe(afterHero);
    new IntersectionObserver(contactObserverHandler).observe(contactBlock);
    revealItems.forEach((item) => revealObserver.observe(item));

    const settingObserver = new IntersectionObserver(settingObserverHandler, {
      rootMargin: "-45% 0px -45% 0px",
    });

    settingPanels.forEach((panel) => settingObserver.observe(panel));

    if (canAnimate) {
      const parallaxObserver = new IntersectionObserver(parallaxObserverHandler);

      parallaxItems.forEach((item) => parallaxObserver.observe(item));
    }
  }

  window.addEventListener("scroll", scrollHandler, { passive: true });
  window.addEventListener("resize", scrollHandler);
  leadForm?.addEventListener("submit", formSubmitHandler);

  if (canDrag) {
    document.addEventListener("pointerdown", dragStartHandler);
    document.addEventListener("pointermove", dragMoveHandler);
    document.addEventListener("pointerup", dragEndHandler);
    document.addEventListener("pointercancel", dragEndHandler);
  }
  renderScrollFrame();
})();
