#!/bin/bash

# Crear carpetas necesarias
mkdir -p locales
mkdir -p js

# Crear archivo de textos en español
cat > locales/es.json <<'EOF'
{
  "titulo": "Bienvenido a la Aventura Argentina",
  "ciudad_rosario": "Rosario",
  "volver_itinerario": "⬅ Volver al itinerario",
  "idioma": "Idioma:",
  "hebreo": "עברית",
  "espanol": "Español"
}
EOF

# Crear archivo de textos en hebreo
cat > locales/he.json <<'EOF'
{
  "titulo": "ברוכים הבאים להרפתקה בארגנטינה",
  "ciudad_rosario": "רוסאריו",
  "volver_itinerario": "⬅ חזרה למפת המסלול",
  "idioma": "שפה:",
  "hebreo": "עברית",
  "espanol": "ספרדית"
}
EOF

# Crear script de traducción
cat > js/i18n.js <<'EOF'
// Script central de traducción y cambio de idioma
const LANG_KEY = "idiomaSeleccionado";
const DEFAULT_LANG = "es";
let textos = {};
let idiomaActual = DEFAULT_LANG;

// Cargar idioma guardado o predeterminado
function obtenerIdiomaActual() {
  return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
}

// Guardar idioma elegido
function guardarIdioma(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

// Cargar archivo de textos y traducir la página
function cargarIdioma(lang, callback) {
  fetch(`locales/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      textos = data;
      idiomaActual = lang;
      traducirPagina();
      if(callback) callback();
    });
}

// Traducir los textos marcados en la página
function traducirPagina() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if(textos[key]) {
      el.innerText = textos[key];
    }
  });
  // Actualiza el selector visualmente
  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === idiomaActual);
  });
}

// Cambiar idioma desde el selector
function translatePage(lang) {
  guardarIdioma(lang);
  cargarIdioma(lang);
}

// Inicialización automática al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  const lang = obtenerIdiomaActual();
  cargarIdioma(lang);
});
EOF

# Crear ejemplo de index.html
cat > index.html <<'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title data-i18n="titulo">Bienvenido a la Aventura Argentina</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <div id="language-selector">
    <span data-i18n="idioma">Idioma:</span>
    <button onclick="translatePage('es')" class="language-btn" data-lang="es" data-i18n="espanol">Español</button>
    <button onclick="translatePage('he')" class="language-btn" data-lang="he" data-i18n="hebreo">עברית</button>
  </div>

  <h1 data-i18n="titulo">Bienvenido a la Aventura Argentina</h1>
  <a href="ciudades/rosario.html" data-i18n="ciudad_rosario">Rosario</a><br>
  <a href="index.html" data-i18n="volver_itinerario">⬅ Volver al itinerario</a>

  <script src="js/i18n.js"></script>
</body>
</html>
EOF

echo "¡Listo! Carpetas y archivos creados:"
echo "- locales/es.json"
echo "- locales/he.json"
echo "- js/i18n.js"
echo "- index.html"
echo "Ya podés abrir 'index.html' en tu navegador y probar el selector de idioma."