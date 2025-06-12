// js/i18n.js

const I18N_LANG_KEY = "idiomaPreferido"; // Key para localStorage
const I18N_DEFAULT_LANG = "es";
let i18n_textosGlobales = {}; // Para almacenar las traducciones cargadas (ej. { common: {...}, bariloche: {...} })
let i18n_idiomaActual = I18N_DEFAULT_LANG;
let i18n_currentPageKey = "common"; // Default, se seteará desde cada HTML

// --- Funciones de Ayuda para Idioma ---
function i18n_obtenerIdiomaActual() {
  return localStorage.getItem(I18N_LANG_KEY) || I18N_DEFAULT_LANG;
}

function i18n_guardarIdioma(lang) {
  localStorage.setItem(I18N_LANG_KEY, lang);
  i18n_idiomaActual = lang; // Actualizar variable global también
}

// --- Funciones Principales de Traducción ---
async function i18n_cargarTraduccionesYAplicar(lang, pageKey) { // Nombre combinado y más descriptivo
  i18n_currentPageKey = pageKey; // Establecer la clave de la página actual
  i18n_idiomaActual = lang; // Establecer el idioma actual

  // Determinar la ruta correcta al archivo JSON
  // Si pageKey es 'index', la ruta es 'locales/[lang].json'
  // Si es una página de ciudad (ej. 'bariloche'), la ruta es '../locales/[lang].json'
  const jsonPath = (i18n_currentPageKey === 'index' || i18n_currentPageKey === 'home') ?
                   `locales/${lang}.json` :
                   `../locales/${lang}.json`;

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      console.error(`Error loading translation file for ${lang} from ${jsonPath}: ${response.statusText}`);
      i18n_textosGlobales = {};
      if (lang !== I18N_DEFAULT_LANG) {
        console.warn(`Falling back to default language: ${I18N_DEFAULT_LANG}`);
        // Importante: Al hacer fallback, asegurarse que pageKey se pasa correctamente
        await i18n_cargarTraduccionesYAplicar(I18N_DEFAULT_LANG, i18n_currentPageKey);
      }
      return;
    }
    i18n_textosGlobales = await response.json();
    // console.log(`DEBUG: Traducciones cargadas para ${lang} (${i18n_currentPageKey}):`, JSON.parse(JSON.stringify(i18n_textosGlobales)));
    i18n_aplicarTraduccionesDOM(); // Renombrado para claridad
  } catch (error) {
    console.error(`Error fetching translation file for ${lang} from ${jsonPath}:`, error);
    i18n_textosGlobales = {};
    if (lang !== I18N_DEFAULT_LANG) {
        console.warn(`Falling back to default language: ${I18N_DEFAULT_LANG}`);
        await i18n_cargarTraduccionesYAplicar(I18N_DEFAULT_LANG, i18n_currentPageKey);
    }
  }
}

function i18n_aplicarTraduccionesDOM() {
  if (Object.keys(i18n_textosGlobales).length === 0) {
    // console.warn("No translations loaded, skipping DOM application.");
    return;
  }

  document.body.dir = (i18n_idiomaActual === 'he') ? 'rtl' : 'ltr';
  document.documentElement.lang = i18n_idiomaActual;

  const pageTitleKey = "page-title"; // Asumimos que esta clave existe en la sección de la página o en common
  if (i18n_textosGlobales[i18n_currentPageKey] && typeof i18n_textosGlobales[i18n_currentPageKey][pageTitleKey] !== 'undefined') {
    document.title = i18n_textosGlobales[i18n_currentPageKey][pageTitleKey];
  } else if (i18n_textosGlobales.common && typeof i18n_textosGlobales.common[pageTitleKey] !== 'undefined') {
     document.title = i18n_textosGlobales.common[pageTitleKey];
  } else {
     document.title = i18n_currentPageKey; // Fallback al nombre de la página si no hay título específico
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    let translatedText = `[[${key} NOT FOUND]]`; // Default si no se encuentra la clave
    let keyToSearch = key;
    let searchInCommonExplicitly = false;

    if (key.startsWith('common.')) {
        keyToSearch = key.substring(7); // Remueve "common."
        searchInCommonExplicitly = true;
    }

    if (searchInCommonExplicitly) {
        if (i18n_textosGlobales.common && typeof i18n_textosGlobales.common[keyToSearch] !== 'undefined') {
          translatedText = i18n_textosGlobales.common[keyToSearch];
        }
    } else {
        if (i18n_textosGlobales[i18n_currentPageKey] && typeof i18n_textosGlobales[i18n_currentPageKey][keyToSearch] !== 'undefined') {
          translatedText = i18n_textosGlobales[i18n_currentPageKey][keyToSearch];
        } else if (i18n_textosGlobales.common && typeof i18n_textosGlobales.common[keyToSearch] !== 'undefined') {
          translatedText = i18n_textosGlobales.common[keyToSearch]; // Fallback a common
        }
    }

    const altKey = el.getAttribute('data-i18n-alt');
    if (altKey) {
        let translatedAlt = `[[ALT: ${altKey} NOT FOUND]]`;
        let altKeyToSearch = altKey;
        let searchAltInCommon = false;
        if (altKey.startsWith('common.')) {
            altKeyToSearch = altKey.substring(7);
            searchAltInCommon = true;
        }

        if (searchAltInCommon) {
            if (i18n_textosGlobales.common && typeof i18n_textosGlobales.common[altKeyToSearch] !== 'undefined') translatedAlt = i18n_textosGlobales.common[altKeyToSearch];
        } else {
            if (i18n_textosGlobales[i18n_currentPageKey] && typeof i18n_textosGlobales[i18n_currentPageKey][altKeyToSearch] !== 'undefined') translatedAlt = i18n_textosGlobales[i18n_currentPageKey][altKeyToSearch];
            else if (i18n_textosGlobales.common && typeof i18n_textosGlobales.common[altKeyToSearch] !== 'undefined') translatedAlt = i18n_textosGlobales.common[altKeyToSearch];
        }
        el.alt = translatedAlt;
    }

    // Para los placeholders de input/textarea
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if(el.placeholder) { // Solo si tiene placeholder
            el.placeholder = translatedText;
        }
    } else if (translatedText.includes('**') || key.includes('event-') || key.includes('stay-duration') || key.includes('how-to-arrive')) {
      el.innerHTML = translatedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    } else {
      el.textContent = translatedText;
    }
  });

  // Actualizar botones de idioma
  document.querySelectorAll(".btn-lang").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === i18n_idiomaActual);
  });
}

// --- Función de Inicialización Global ---
function initI18n(pageKey) {
    if (!pageKey) {
        console.error("initI18n fue llamado sin pageKey. Usando 'common' por defecto, pero esto podría no ser correcto.");
        i18n_currentPageKey = "common";
    } else {
        i18n_currentPageKey = pageKey;
    }

    document.querySelectorAll(".btn-lang").forEach(btn => {
        // Para evitar duplicar listeners si se llama accidentalmente varias veces.
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener("click", function() {
            const lang = newBtn.dataset.lang;
            if (lang && lang !== i18n_idiomaActual) {
                i18n_guardarIdioma(lang);
                i18n_cargarTraduccionesYAplicar(lang, i18n_currentPageKey);
            }
        });
    });

    const lang = i18n_obtenerIdiomaActual();
    i18n_cargarTraduccionesYAplicar(lang, i18n_currentPageKey);
}

// Ejemplo de cómo cada HTML llamaría a esto:
// <script>
//   const currentPageKey = 'bariloche'; // o 'index', 'rosario', etc.
//   document.addEventListener('DOMContentLoaded', () => initI18n(currentPageKey));
// </script>
