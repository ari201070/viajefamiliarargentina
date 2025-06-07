#!/bin/bash

# Crear carpeta locales si no existe
mkdir -p locales

# Crear o sobrescribir locales/es.json
cat > locales/es.json <<'EOF'
{
  "titulo": "Bienvenido a la Aventura Argentina",
  "ciudad_rosario": "Rosario",
  "volver_itinerario": "⬅ Volver al itinerario",
  "idioma": "Idioma:",
  "espanol": "Español",
  "hebreo": "Hebreo",
  "bienvenida_rosario": "Bienvenidos a la sección de Rosario.",
  "atracciones_principales": "Atracciones principales",
  "monumento_bandera": "Monumento Nacional a la Bandera",
  "parque_independencia": "Parque Independencia",
  "costanera_parana": "Costanera y Río Paraná",
  "macro": "Museo de Arte Contemporáneo (MACRO)",
  "tipos_restaurantes": "Tipos de restaurantes",
  "parrillas": "Parrillas",
  "pizzerias": "Pizzerías",
  "heladerias": "Heladerías artesanales",
  "bares": "Bares y cervecerías",
  "mapa_rosario": "Mapa de Rosario",
  "ver_mapa_grande": "Ver mapa más grande"
}
EOF

echo "Archivo locales/es.json creado o actualizado correctamente."