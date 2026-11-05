/* ========================================================
   Proyecto Golden Chance Senior
   Este archivo ha sido desarrollado por la autora
   (Marta Alarcón Rodríguez).
   Durante el desarrollo se utilizaron herramientas de
   Inteligencia Artificial (ChatGPT y Claude) como apoyo para:
   - traducción y revisión del inglés
   - revisión de lógica JavaScript
   - depuración
   Todo el código fue revisado, probado y adaptado por
   la autora antes de su integración.
======================================================== */

/* ==========================================================
   I18N
   La web está escrita en español (idioma principal). Al pulsar
   EN, o con ?lang=en en la URL, cada texto se sustituye por su
   traducción del diccionario EN; al volver a ES se restaura el
   texto original. La elección se recuerda en localStorage.
========================================================== */

(() => {
  "use strict";

  /* ---------- Constantes ---------- */
  const STORAGE_KEY = "gcs-lang";
  const TRANSLATABLE_ATTRIBUTES = ["alt", "aria-label", "content"];
  const EN = {
    "¿Cómo funciona la cooperativa? ¿Seré propietario?": "How does the cooperative work? Will I own my home?",
    "Será una cooperativa de viviendas: los futuros residentes se unen como socios y aportan el dinero para construir sus propias viviendas. Si cada socio tendrá su vivienda en propiedad o en uso se está definiendo; antes de pedir ningún compromiso, te lo explicaremos por escrito.": "It will be a housing cooperative: future residents join as members and contribute the funds to build their own homes. Whether each member will own their home or hold a right of use is still being decided; before asking for any commitment, we will explain it to you in writing.",
    "¿Estará protegido el dinero que aporte?": "Will the money I contribute be protected?",
    "La ley obliga a garantizar las cantidades que los socios adelantan para la construcción, mediante aval o seguro y una cuenta bancaria especial. Antes de pedir ninguna aportación, te detallaremos por escrito las garantías concretas del proyecto.": "By law, the money members pay in advance towards construction must be guaranteed, through a bank guarantee or insurance and a dedicated bank account. Before asking for any contribution, we will set out the project’s specific guarantees for you in writing.",
    "Cómo funciona": "How it works",
    "Paso a paso, sin prisas.": "Step by step, at your own pace.",
    "Así será el camino desde que nos escribes hasta que el proyecto sea una realidad. Tú decides cuándo dar cada paso.": "This is the journey from your first message to the day the project becomes a reality. You decide when to take each step.",
    "Nos cuentas qué buscas": "Tell us what you're looking for",
    "Rellenas el formulario o nos llamas. Sin compromiso.": "Fill in the form or give us a call. No obligation.",
    "Hablamos contigo": "We talk it through",
    "Te presentamos el proyecto en persona o por videollamada y resolvemos tus dudas.": "We present the project in person or by video call and answer your questions.",
    "Recibes toda la información": "You receive the full details",
    "Cuando estén definidas, te enviamos por escrito la ubicación y las condiciones del proyecto.": "Once they are defined, we send you the project's location and terms in writing.",
    "Decides con calma": "You decide in your own time",
    "Revisas la documentación con tu familia o tu asesor. Solo entonces te unes como socio.": "You review the documents with your family or adviser. Only then do you join as a member.",
    "Te acompañamos hasta el final": "We're with you all the way",
    "Te informamos de cada avance, desde el proyecto hasta la entrega.": "We keep you informed at every stage, from the plans to the handover.",
    "Veranos suaves, paisaje verde y la tranquilidad del norte. Si vienes de otro país, te atendemos en español o en inglés, también por videollamada, y te explicamos cada trámite, como el NIE.": "Mild summers, green landscapes and the calm of the north. If you are coming from abroad, we can help you in Spanish or English, including by video call, and walk you through the paperwork, such as the NIE (Spain's foreigner identification number).",
    "¿Cuánto costará y cuándo estará listo?": "How much will it cost, and when will it be ready?",
    "Aún no hay condiciones económicas ni calendario. No publicaremos cifras ni fechas hasta que estén confirmadas, e informaremos de cada avance a las personas inscritas.": "No costs or timeline have been set yet. We will not publish any figures or dates until they have been confirmed, and we will keep everyone who signs up informed at every stage.",
    "Sí, el proyecto está abierto también a personas de otros países. Te atendemos en español o en inglés y, cuando se confirmen las condiciones, te explicaremos los requisitos y trámites, como el NIE (número de identidad de extranjero).": "Yes, the project is also open to people from other countries. We can help you in Spanish or English and, once the terms are confirmed, we will explain the requirements and paperwork, such as the NIE (Spain's foreigner identification number).",
    "Golden Chance Senior · Una nueva forma de vivir": "Golden Chance Senior · A new way of living",
    "Golden Chance Senior: un nuevo proyecto residencial sénior en el norte de España, impulsado por Golden Chance. Independencia, comunidad y futuro. Proyecto en desarrollo.": "Golden Chance Senior: a new senior living project in northern Spain, led by Golden Chance. Independence, community and the future. Project in development.",
    "Saltar al contenido": "Skip to content",
    "Golden Chance Senior, ir al inicio": "Golden Chance Senior, go to home page",
    "Menú": "Menu",
    "Principal": "Main",
    "Idioma": "Language",
    "La filosofía": "Philosophy",
    "Forma de vivir": "Way of living",
    "Comunidad": "Community",
    "El proyecto": "The project",
    "Quiénes somos": "About us",
    "Preguntas": "FAQ",
    "Quiero conocer el proyecto": "I'd like to know more",
    "Conocer el proyecto": "Discover the project",
    "Tu casa.": "Your home.",
    "Tu vida.": "Your life.",
    "Tu futuro.": "Your future.",
    "Un nuevo proyecto residencial sénior en el norte de España, impulsado por Golden Chance.": "A new senior living project in northern Spain, led by Golden Chance.",
    "Porque el futuro no consiste en dejar de elegir, sino en seguir haciéndolo. Estamos desarrollando una nueva propuesta de vida para quienes quieren mantener su independencia y explorar una forma diferente de vivir esta etapa.": "Because the future isn't about giving up choices — it's about continuing to make them. We are creating a new way of life for people who want to stay independent and approach this stage of life differently.",
    "Descubre la filosofía": "Discover the philosophy",
    "Proyecto en desarrollo · Primera fase": "Project in development · Phase one",
    "Pilares del proyecto": "Project pillars",
    "Independencia": "Independence",
    "Tu espacio, tus decisiones y tu ritmo de vida.": "Your space, your decisions, your own pace.",
    "Compartir experiencias sin renunciar a tu intimidad.": "Sharing experiences without giving up your privacy.",
    "Seguridad": "Peace of mind",
    "Transparencia sobre cómo funcionará el proyecto.": "Clear information on how the project will work.",
    "Futuro": "Future",
    "Planificar esta etapa con ilusión y criterio propio.": "Planning this stage with enthusiasm, on your own terms.",
    "Envejecer no significa dejar de empezar.": "Growing older doesn't mean an end to new beginnings.",
    "Hay una etapa en la que el tiempo adquiere otro valor. Elegir dónde vivir, con quién compartir experiencias y cómo organizar el día a día se vuelve más importante que nunca.": "There comes a stage in life when time takes on a new value. Choosing where to live, who to share experiences with and how to shape your days matters more than ever.",
    "Seguir tomando decisiones sobre tu propia vida.": "Keep making your own decisions about your life.",
    "Disfrutar de la tranquilidad de un espacio personal.": "Enjoy the calm of a space of your own.",
    "Tener la posibilidad de crear nuevas relaciones y experiencias.": "Have the chance to make new friends and enjoy new experiences.",
    "Una nueva etapa no tiene por qué significar renunciar a nada.": "A new chapter doesn't have to mean giving anything up.",
    "Una nueva forma de vivir": "A new way of living",
    "Vivir como tú decides.": "Live the way you choose.",
    "Ni una residencia ni una urbanización convencional: una propuesta pensada para quienes quieren seguir eligiendo cómo vivir.": "Neither a care home nor a conventional residential development: a project for people who want to keep choosing how they live.",
    "Tu espacio": "Your space",
    "Privacidad y autonomía en el día a día. Un hogar propio donde mantener tus costumbres, tus objetos y tu ritmo.": "Privacy and autonomy in everyday life. A home of your own, with your routines, your belongings and your own pace.",
    "Tu comunidad": "Your community",
    "La posibilidad de compartir momentos y experiencias con personas que buscan lo mismo que tú, cuando tú lo decidas.": "The chance to share moments and experiences with people looking for the same things as you — whenever you choose.",
    "Tu manera de vivir": "Your way of life",
    "Un proyecto pensado para mantener intacta la capacidad de elegir: hoy, mañana y en los años que vienen.": "A project designed to keep your freedom of choice intact: today, tomorrow and in the years to come.",
    "El modelo de comunidad": "The community model",
    "Un lugar donde tener tu propio espacio y, al mismo tiempo, la oportunidad de compartir una forma de vida con personas que tienen inquietudes similares.": "A place where you have your own space and, at the same time, the chance to share a way of life with like-minded people.",
    "Ideas que guían la comunidad": "Ideas that guide the community",
    "Convivencia": "Living together",
    "Participación": "Participation",
    "Actividades compartidas": "Shared activities",
    "Intimidad": "Privacy",
    "Los espacios comunes, servicios y la organización de la comunidad se definirán junto con el proyecto. Solo los comunicaremos cuando estén confirmados.": "Shared spaces, services and how the community is organised will be defined as the project develops. We will only announce them once they are confirmed.",
    "Un proyecto que empieza contigo.": "A project that starts with you.",
    "Estamos trabajando en una nueva propuesta residencial que pone en el centro la independencia, la comunidad y la planificación del futuro.": "We are working on a new residential project built around independence, community and planning for the future.",
    "En esta primera etapa queremos compartir la visión del proyecto, escuchar a las personas interesadas y ofrecer información transparente a medida que se definan sus características.": "In this first phase, we want to share our vision, listen to those who are interested and provide clear information as the details take shape.",
    "Estado del proyecto": "Project status",
    "Visión y concepto": "Vision and concept",
    "Definidos": "Defined",
    "Ubicación": "Location",
    "Norte de España · emplazamiento por confirmar": "Northern Spain · exact site to be confirmed",
    "Modelo jurídico y condiciones": "Legal structure and terms",
    "En definición": "Being defined",
    "Proyecto arquitectónico": "Architectural design",
    "Próximamente": "Coming soon",
    "Déjanos tus datos y te enviaremos novedades del proyecto a medida que se confirmen. Sin compromiso.": "Leave your details and we will keep you updated as plans are confirmed. No obligation.",
    "Nombre": "Name",
    "Escribe tu nombre.": "Please enter your name.",
    "Correo electrónico": "Email",
    "Escribe un correo válido, por ejemplo nombre@correo.es.": "Please enter a valid email address, for example name@email.com.",
    "Teléfono": "Phone",
    "(opcional)": "(optional)",
    "País de residencia": "Country of residence",
    "Idioma de contacto": "Preferred language",
    "¿Qué te interesa recibir?": "What would you like to receive?",
    "Novedades del proyecto": "Project updates",
    "El dossier informativo cuando esté disponible": "The information pack when it is available",
    "Una llamada o videollamada para resolver dudas": "A phone or video call to answer my questions",
    "Me intereso por el proyecto…": "I'm interested in the project…",
    "Prefiero no indicarlo": "I'd rather not say",
    "Para mí": "For me",
    "Para mí y mi pareja": "For me and my partner",
    "Para un familiar": "For a relative",
    "He leído y acepto la": "I have read and accept the",
    "política de privacidad": "privacy policy",
    "Necesitamos tu aceptación para poder contactarte.": "We need your consent to contact you.",
    "Responsable: GOLDENCHANCE, S.L. Finalidad: informarte sobre el proyecto Golden Chance Senior. Legitimación: tu consentimiento. Puedes ejercer tus derechos de acceso, rectificación, supresión y demás en cualquier momento. Más información en la": "Data controller: GOLDENCHANCE, S.L. Purpose: to keep you informed about the Golden Chance Senior project. Legal basis: your consent. You may exercise your rights of access, rectification and erasure, among others, at any time. Find out more in our",
    "Enviar solicitud": "Send request",
    "Gracias por tu interés": "Thank you for your interest",
    "Hemos recibido tu solicitud. Te escribiremos cuando haya novedades del proyecto.": "We have received your request. We will write to you when there is news about the project.",
    "No hemos podido enviar tu solicitud. Inténtalo de nuevo o escríbenos a": "We couldn't send your request. Please try again or email us at",
    "Quién está detrás": "Who is behind it",
    "Un proyecto impulsado por Golden Chance.": "A project led by Golden Chance.",
    "Golden Chance es una inmobiliaria de Burgos que acompaña a cada cliente con trato personalizado y seguridad en cada operación.": "Golden Chance is an estate agency based in Burgos, Spain, offering every client personal attention and secure transactions.",
    "Trato personalizado": "Personal attention",
    "Atención directa y cercana en cada paso.": "Direct, friendly support at every step.",
    "Respaldo jurídico": "Legal backing",
    "Un despacho de abogados con más de 30 años de experiencia.": "A law firm with more than 30 years of experience.",
    "Patrimonio y herencias": "Assets and inheritance",
    "Asesoramiento en propiedades y planificación patrimonial.": "Property advice and estate planning.",
    "El equipo técnico y las entidades colaboradoras específicas del proyecto sénior se presentarán cuando estén confirmados.": "The technical team and partner organisations for Golden Chance Senior will be introduced once confirmed.",
    "Qué nos hace diferentes": "What makes us different",
    "Tú decides cómo vivir. Nosotros te acompañamos.": "You decide how to live. We're with you every step of the way.",
    "Un proyecto de vida en comunidad, con la experiencia de un equipo inmobiliario y jurídico detrás.": "A community living project, backed by an experienced property and legal team.",
    "Un proyecto en manos de profesionales": "A professionally managed project",
    "Detrás hay un equipo inmobiliario y un despacho de abogados con más de 30 años de experiencia. Nos ocupamos de la gestión técnica, jurídica e inmobiliaria para que tú puedas centrarte en decidir cómo quieres vivir.": "Behind it are a property team and a law firm with more than 30 years of experience. We take care of the technical, legal and property side, so that you can focus on deciding how you want to live.",
    "Te acompañamos con tu vivienda actual": "Support with your current home",
    "Dar este paso suele empezar por una pregunta: ¿qué hago con mi casa? Si tienes una vivienda en España, te ayudamos a venderla o alquilarla, y te asesoramos sobre cómo encaja este cambio en la planificación de tu patrimonio y tu herencia.": "Taking this step often starts with one question: what should I do with my home? If you own a home in Spain, we can help you sell or let it, and advise you on how this move fits into your financial and estate planning.",
    "En el norte de España, abierto a quien llega de fuera": "In northern Spain, open to people from abroad",
    "¿Qué hago con mi vivienda actual?": "What should I do with my current home?",
    "Depende de tu situación y de tus planes. Si tu vivienda está en España, Golden Chance puede ayudarte a venderla o alquilarla. También te asesoramos sobre cómo encaja este paso en la planificación de tu patrimonio y tu herencia.": "That depends on your circumstances and plans. If your home is in Spain, Golden Chance can help you sell or let it. We can also advise you on how this step fits into your financial and estate planning.",
    "Preguntas frecuentes": "Frequently asked questions",
    "Lo que probablemente te estás preguntando.": "What you're probably wondering.",
    "Si tu duda no está aquí,": "If your question isn't here,",
    "escríbenos": "write to us",
    "¿Qué es Golden Chance Senior?": "What is Golden Chance Senior?",
    "Es un nuevo proyecto residencial impulsado por Golden Chance para personas que quieren vivir su etapa sénior con independencia, en un entorno que facilite la vida en comunidad.": "It is a new residential project by Golden Chance for people who want to live their later years independently, in a setting designed to make community life easier.",
    "¿Es una residencia de mayores?": "Is it a care home?",
    "No. No es un centro asistencial. Es una propuesta de vivienda pensada para personas autónomas que quieren seguir decidiendo cómo vivir.": "No. It is not a care facility. It is a housing project for independent people who want to keep deciding how they live.",
    "¿Dónde estará ubicado el proyecto?": "Where will the project be located?",
    "El proyecto está previsto en el norte de España. El emplazamiento concreto está pendiente de confirmación; lo compartiremos en cuanto esté definido.": "The project is planned for northern Spain. The exact site has yet to be confirmed; we will share it as soon as it is decided.",
    "¿Puedo participar si no vivo en España?": "Can I take part if I don't live in Spain?",
    "Una nueva forma de vivir. A tu manera. Proyecto en desarrollo: la información se actualizará a medida que se confirme.": "A new way of living. Your way. This project is in development: information will be updated as it is confirmed.",
    "Contacto": "Contact",
    "Solicitar información": "Request information",
    "Burgos": "Burgos, Spain",
    "Política de privacidad": "Privacy policy",
    "Aviso legal": "Legal notice",
    "Las imágenes son de referencia y no corresponden al proyecto final.": "Images are for reference only and do not show the final development.",
    "Acantilados verdes sobre el mar Cantábrico en un día despejado": "Green cliffs above the Cantabrian Sea on a clear day",
    "Cabaña de piedra en un valle de montaña junto a un camino": "Stone cabin beside a path in a mountain valley",
    "Una pareja mayor pasea por la montaña a su ritmo, con la luz dorada de la tarde": "An older couple walking in the mountains at their own pace in the golden afternoon light",
    "Paseos junto al mar, aire limpio y un clima templado, sin calores extremos.": "Seaside walks, fresh air and a mild climate without extreme heat.",
    "Calles de piedra, mercados y la vida tranquila de los pueblos del norte.": "Stone streets, local markets and the unhurried pace of northern villages.",
    "Valles verdes y caminos para recorrer a tu ritmo.": "Green valleys and trails to explore at your own pace.",
    "Tres amigos mayores juegan al ajedrez en un banco del parque": "Three older friends playing chess on a park bench",
    "Una pareja mayor pasea abrazada por un camino arbolado": "An older couple walking arm in arm along a tree-lined road",
    "Calle empedrada de un pueblo de piedra con geranios en los balcones": "Cobbled street in a stone village with geraniums on the balconies",
    "Manos de un arquitecto dibujando a mano los planos de una vivienda": "An architect's hands sketching the plans for a home by hand",
    "Una pareja mayor descansa sobre una roca frente a un lago de montaña": "An older couple resting on a rock by a mountain lake",
    "Una pareja mayor camina por un sendero de montaña entre pinos": "An older couple walking along a mountain trail through the pines",
    "El entorno": "The setting",
    "Entre el mar y la montaña.": "Between the sea and the mountains.",
    "Un entorno de costa, pueblos de piedra y montaña en el norte de España. La ubicación exacta se comunicará cuando esté confirmada.": "Coastline, stone villages and mountains in northern Spain. We will share the exact location once it is confirmed.",
    "El mar Cantábrico": "The Cantabrian Sea",
    "El mar": "The sea",
    "Los pueblos": "The villages",
    "La montaña": "The mountains",
    "Pueblos con historia": "Villages steeped in history",
    "La montaña, cerca": "Mountains close by"
  };

  const root = document.documentElement;
  const langGroup = document.querySelector(".Lang");
  const langButtons = document.querySelectorAll(".Lang-btn");
  const formLanguageSelect = document.querySelector("#f-lang");
  const legalLinks = document.querySelectorAll('a[href^="html/legal.html"]');
  const spanishTitle = document.title;

  /* ---------- Variables de estado ---------- */
  const textEntries = [];
  const attributeEntries = [];
  let isFormLanguageTouched = false;

  /* ---------- Funciones ---------- */

  /** Normaliza espacios para que el texto coincida con la clave del diccionario. */
  function normalize(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  /** Recorre la página una sola vez y guarda los textos y atributos traducibles. */
  function collectTranslatableContent() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();

    while (node) {
      const key = normalize(node.nodeValue);

      if (key && EN[key]) {
        textEntries.push({ node, original: node.nodeValue, key });
      }

      node = walker.nextNode();
    }

    document.querySelectorAll('[alt], [aria-label], meta[name="description"]').forEach((element) => {
      TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
        const value = element.getAttribute(attribute);

        if (value && EN[normalize(value)]) {
          attributeEntries.push({ element, attribute, original: value, key: normalize(value) });
        }
      });
    });
  }

  /**
   * Aplica el idioma a textos, atributos, título, botones, formulario,
   * enlaces a la página legal y URL.
   * @param {"es"|"en"} language
   */
  function applyLanguage(language) {
    const isEnglish = language === "en";
    const url = new URL(window.location.href);

    textEntries.forEach((entry) => {
      const leadingSpace = entry.original.match(/^\s*/)[0];
      const trailingSpace = entry.original.match(/\s*$/)[0];

      entry.node.nodeValue = isEnglish ? leadingSpace + EN[entry.key] + trailingSpace : entry.original;
    });

    attributeEntries.forEach((entry) => {
      entry.element.setAttribute(entry.attribute, isEnglish ? EN[entry.key] : entry.original);
    });

    langButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === language));
    });

    legalLinks.forEach((link) => {
      const [path, anchor] = link.getAttribute("href").split("#");
      const basePath = path.split("?")[0];

      link.setAttribute("href", `${basePath}${isEnglish ? "?lang=en" : ""}${anchor ? `#${anchor}` : ""}`);
    });

    root.lang = language;
    document.title = isEnglish ? EN[spanishTitle] || spanishTitle : spanishTitle;

    if (formLanguageSelect && !isFormLanguageTouched) {
      formLanguageSelect.value = language;
    }

    if (isEnglish) {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }

    window.history.replaceState(null, "", url);

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* Sin almacenamiento disponible: el idioma se mantiene solo en esta visita. */
    }
  }

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

  /** Delegación de eventos: un único listener en el grupo de botones. */
  function languageClickHandler(event) {
    const button = event.target.closest(".Lang-btn");

    if (button) {
      applyLanguage(button.dataset.lang);
    }
  }

  /** Si la persona elige el idioma de contacto, ya no se cambia solo. */
  function formLanguageChangeHandler() {
    isFormLanguageTouched = true;
  }

  /* ---------- Asignaciones ---------- */
  collectTranslatableContent();
  langGroup?.addEventListener("click", languageClickHandler);
  formLanguageSelect?.addEventListener("change", formLanguageChangeHandler);

  if (getInitialLanguage() === "en") {
    applyLanguage("en");
  }
})();
