# Country Explorer 🌍

Aplicación web para explorar información de países de todo el mundo utilizando la API pública de REST Countries.

## 🚀 Características

### Requisitos Implementados

- **Listado de países** con nombre, bandera, región y población
- **Búsqueda por nombre** (case-insensitive)
- **Filtro por región**
- **Rango de población** (mínimo y máximo)
- **Modal de detalle** con información completa del país
- **Página de favoritos** con gestión de estado global

### Opcional Implementado

✅ **Ordenar por nombre o población** (ascendente/descendente)

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** (App Router)
- **TypeScript**
- **Zustand** (gestión de estado global)
- **Tailwind CSS** (estilos)
- **shadcn/ui** (componentes UI)
- **Lucide React** (iconos)

## 📦 Instalación

1. Clonar el repositorio:
  
    ```
    git clone https://github.com/erickdc7/country-explorer.git
    cd countries-app
    ```

2. Instalar dependencias:

    ```
    npm install
    ```
    
3. Ejecutar en desarrollo:

    ```
    npm run dev
    ```

4. Abrir en el navegador:

   http://localhost:3000

## 🌟 Funcionalidades

### Página Principal

- Búsqueda de países por nombre
- Filtros por región y rango de población
- Ordenamiento por nombre o población
- Sistema de favoritos persistente (localStorage)
- Contador de resultados

### Página de Favoritos

- Visualización de países marcados como favoritos
- Persistencia en localStorage con Zustand
- Gestión completa (agregar/eliminar)

### Modo Oscuro

- Toggle light/dark mode
- Persistencia de preferencia en localStorage

### Modal de Detalles

- Nombre oficial
- Capital
- Región
- Población formateada
- Bandera en alta resolución

### Responsive

La aplicación es completamente responsive y funciona en:

- Móviles
- Tablets
- Desktop


## 🔗 API

La aplicación consume la API de REST Countries:

  https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital














