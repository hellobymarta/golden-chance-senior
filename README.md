# Golden Chance Senior — Landing del proyecto

Landing bilingüe (español/inglés) de **Golden Chance Senior**, una cooperativa de viviendas sénior en el norte de España impulsada por Golden Chance (Burgos). Presenta la filosofía del proyecto, cómo funciona la cooperativa y capta personas interesadas mediante un formulario de contacto.

Web publicada: https://golden-chance-senior.vercel.app/

---

## Objetivos del proyecto

- Construir la landing con **HTML5, CSS3 y JavaScript Vanilla (ES2023)**, sin frameworks ni librerías de terceros.
- Aplicar una arquitectura CSS ordenada con metodología **SUIT CSS** y estrategia **Mobile First**.
- Cumplir los criterios de **accesibilidad WCAG 2.2 AA**.
- Aplicar buenas prácticas de **SEO técnico** y **rendimiento web** (Core Web Vitals).
- Mantener un código legible, comentado y sin redundancias (cero `!important`).

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| **HTML5** | Marcado semántico de la home y de la página legal |
| **CSS3** | Maquetación, diseño responsive, animaciones y custom properties |
| **JavaScript (Vanilla, ES2023)** | Menú, traducción ES/EN, aparición en scroll, parallax y formulario |
| **FormSubmit** | Envío del formulario al correo de Golden Chance (sin servidor propio) |
| **Vercel** | Alojamiento y despliegue automático desde GitHub |

Las tipografías (Fraunces y Source Sans 3) se alojan en el propio proyecto: la web no hace peticiones a servicios externos de fuentes.

---

## Estructura de carpetas

```
golden-chance-senior/
├── index.html                # Home (landing)
├── favicon.ico
├── vercel.json               # Cabeceras de caché/seguridad y redirección antigua
├── html/
│   └── legal.html            # Aviso legal, privacidad y cookies (ES/EN)
├── css/
│   ├── base.css              # Tipografías, tokens, reset, utilidades, botones y cabecera
│   ├── home.css              # Secciones de la home y animaciones
│   └── legal.css             # Página legal
├── js/
│   ├── main.js               # Menú de navegación (móvil y tablet)
│   ├── i18n.js               # Traducción ES → EN
│   ├── home.js               # Scroll, aparición, parallax, llamada fija y formulario
│   └── legal.js              # Cambio de idioma de la página legal
└── assets/
    ├── fonts/                # WOFF2 de Fraunces y Source Sans 3
    ├── icons/                # Logotipo y favicons
    └── images/               # Fotografías en AVIF, WebP y JPG (dos tamaños)
```

---

## Instalación y uso

No requiere build ni dependencias: es HTML/CSS/JS estático.

1. Clona o descarga la carpeta del proyecto.
2. Sírvela con un servidor local (recomendado) o abre `index.html` en el navegador:

   ```bash
   python3 -m http.server 8000
   # o con la extensión Live Server de VS Code
   ```

---

## Características principales

- **Bilingüe**: español por defecto; inglés con el botón EN o con `?lang=en`. La elección se recuerda.
- **Menú responsive** con cierre al elegir sección y con `Escape`, devolviendo el foco al botón.
- **Formulario accesible**: `label` en cada campo, errores asociados con `aria-describedby`, foco en el primer error y envío sin recargar. Sin JavaScript, el formulario se envía igualmente por `action`/`method`.
- **Aparición progresiva en scroll** con `IntersectionObserver`: el observador marca el contenedor y sus elementos aparecen escalonados por CSS. Todo el contenido es visible si JavaScript no está disponible.
- **Parallax suave** en tres fotografías, solo mientras están en pantalla.

---

## Accesibilidad (WCAG 2.2 AA)

- Jerarquía de encabezados correcta y `<h1>` único por página.
- Contrastes verificados: los colores de texto tienen variantes «Ink» con ratio ≥ 4.5:1.
- Foco visible en todos los elementos interactivos y navegación completa por teclado.
- `prefers-reduced-motion: reduce`: las duraciones se anulan reasignando los tokens `--duration-*` y las animaciones de entrada no se aplican.
- Imágenes informativas con `alt` descriptivo; decorativas con `alt=""`.

---

## Diseño responsive

- **Mobile First**: estilos base de móvil ampliados con `@media (min-width: …px)`.
- Revisado en móvil pequeño (320 px), móvil, tablet vertical y horizontal, portátil, escritorio y escritorio grande (1920 px), sin scroll horizontal.
- Unidades relativas (`rem`, `em`, `%`, `clamp()`); `vh`/`vw` solo donde el diseño depende del viewport.

---

## Rendimiento

- Fotografías en `<picture>` con **AVIF → WebP → JPG**, dos tamaños por imagen y `sizes` ajustado al recorte de cada composición.
- `loading="lazy"` fuera del primer viewport; `fetchpriority="high"` en la imagen principal; `width`/`height` en todas las imágenes.
- Tipografía principal precargada y scripts con `defer`.
- Animaciones solo con `transform` y `opacity` (compositor); el scroll agrupa lecturas y escrituras en un único `requestAnimationFrame`.

---

## SEO

- `title`, `description`, `robots`, `canonical`, Open Graph y X/Twitter Card con imagen de vista previa (1200 × 630).
- Estructura semántica (`header`, `nav`, `main`, `section`, `article`, `footer`).

---

## Pendiente

- Completar el CIF de GOLDENCHANCE, S.L. en la página legal y validar los textos legales con el despacho.
- Activar FormSubmit desde el correo info@goldenchance.es (primer envío).
- Sustituir las imágenes de referencia por fotografías reales cuando exista proyecto arquitectónico.

---

## Autora

**Marta Alarcón Rodríguez**
Proyecto Golden Chance Senior — desarrollo frontend con HTML5, CSS3 y JavaScript Vanilla.

**Fecha:** noviembre de 2026
