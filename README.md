# Argentina Aventura Familiar de 30 Días

## 1. Objetivo y Alcance

Este proyecto tiene como objetivo documentar y organizar un viaje familiar de un mes por Argentina, orientado a familias (pareja + 2 hijos). La información se presentará en español y hebreo.

El itinerario incluirá destinos principales, duración en cada lugar, actividades clave, y sugerencias de alojamiento y transporte, con un enfoque en la comodidad, seguridad y variedad de experiencias familiares. Se priorizarán opciones de comida aptas para diabéticos y bajas en carbohidratos.

El proyecto está diseñado para funcionar tanto online como offline, en navegadores móviles y de escritorio.

## 2. Estructura del Proyecto y Carpetas

A continuación, se describe la estructura principal de carpetas del proyecto:

-   `/ (raíz del proyecto)`
    -   `index.html`: Página principal del itinerario del viaje.
    -   `Promp para github.txt` (Existente - Guía general del proyecto)
    -   `Promp-organizado-por-temas.txt` (Existente - Guía general del proyecto)
    -   `docs/`: Contiene documentos de apoyo, imágenes, agendas y otros recursos.
        -   `imagenes/`: Imágenes para las ciudades, organizadas en subcarpetas por ciudad.
        -   `agenda/`: Agendas generales y por ciudad (archivos .ics, .ical, README.md).
        -   `recursos/`: Otros recursos como mapas, PDFs, etc.
    -   `ciudades/`: Contiene los archivos `.html` y `.md` específicos para cada ciudad.
    -   `css/`: Archivos CSS para los estilos visuales del sitio.
    -   `js/`: Archivos JavaScript para la funcionalidad interactiva.
    -   `components/`: Componentes reutilizables de la interfaz de usuario (ej. React).
        -   `CityCard.tsx`: Componente para mostrar la tarjeta de una ciudad.
    -   `pages/`: Páginas o vistas principales de la aplicación (ej. React).
        -   `CityDetailPage.tsx`: Página para mostrar los detalles de una ciudad.
    -   `constants.ts`: Constantes utilizadas en la aplicación, como la lista de ciudades.
    -   `locales/`: Archivos de traducción para soporte multilenguaje.
        -   `es.json`: Traducciones al español.
        -   `he.json`: Traducciones al hebreo.
    -   `data/`: Archivos de datos en formato JSON que la aplicación podría consumir.
    -   `libs/`: Bibliotecas o módulos de terceros.
    -   `README.md`: Este archivo, explicando el proyecto.
    -   `.gitignore`: Especifica los archivos y carpetas que Git debe ignorar.
