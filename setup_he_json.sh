#!/bin/bash

# Crear carpeta locales si no existe
mkdir -p locales

# Crear o sobrescribir locales/he.json
cat > locales/he.json <<'EOF'
{
  "titulo": "ברוכים הבאים להרפתקה הארגנטינאית",
  "ciudad_rosario": "רוסאריו",
  "volver_itinerario": "⬅ חזרה למסלול",
  "idioma": "שפה:",
  "espanol": "ספרדית",
  "hebreo": "עברית",
  "bienvenida_rosario": "ברוכים הבאים למדור רוסאריו.",
  "atracciones_principales": "אטרקציות עיקריות",
  "monumento_bandera": "אנדרטת הדגל הלאומי",
  "parque_independencia": "פארק העצמאות",
  "costanera_parana": "הטיילת ונהר פרנה",
  "macro": "מוזיאון האמנות המודרנית (MACRO)",
  "tipos_restaurantes": "סוגי מסעדות",
  "parrillas": "מסעדות בשרים (פריח׳ס)",
  "pizzerias": "פיצריות",
  "heladerias": "גלידריות בוטיק",
  "bares": "ברים ופאבים",
  "mapa_rosario": "מפת רוסאריו",
  "ver_mapa_grande": "צפה במפה גדולה"
}
EOF

echo "Archivo locales/he.json creado o actualizado correctamente."