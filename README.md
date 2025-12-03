no# GarrApp

**GarrApp** es una aplicación web desarrollada con **React** que permite gestionar un catálogo de productos, añadirlos a un carrito y controlar cantidades de manera sencilla. Está pensada como ejercicio de práctica para reforzar conceptos de **frontend moderno**, manejo de **estado**, componentes reutilizables y experiencia de usuario.

---

## 📄 Descripción

La aplicación simula el flujo básico de compra en un comercio:

- Visualización de productos en una grilla.
- Botones para **aumentar / disminuir** la cantidad de cada producto.
- Carrito de compras con **resumen de unidades** y **total**.
- Interfaz limpia y responsive, centrada en la usabilidad.

El objetivo principal del proyecto es practicar:

- Componentización en React.
- Comunicación entre componentes mediante props.
- Manejo de estado local (hooks).
- Buenas prácticas de maquetado con CSS.

---

## 📦 Características

- Listado de productos con información básica.
- Botones de `+` y `-` para modificar cantidades.
- Carrito con detalle de productos seleccionados.
- Cálculo automático del total.
- Estilos personalizados con CSS.
- Arquitectura pensada para poder crecer (nuevos filtros, categorías, etc.).

---

## 🛠️ Tecnologías utilizadas

- **React** (SPA)
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **Vite / npm** (según la configuración del proyecto)
- **Git / GitHub** para control de versiones

---

## 🚀 Cómo ejecutar el proyecto localmente

### ✅ Requisitos previos

- **Node.js** (versión 18+ recomendada)
- **npm** o **yarn**
- Git (opcional, para clonar el repositorio)

### 🧩 Pasos

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/Maty1337/garrapp.git
   cd garrapp
   ```

2. Instalá las dependencias:

   ```bash
   npm install
   ```

3. Iniciá el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrí tu navegador en la URL que indique la consola, por ejemplo:

   ```
   http://localhost:5173/
   ```

> ⚠️ Los comandos pueden variar ligeramente según el contenido de `package.json`, pero en general siguen la estructura estándar de un proyecto React con Vite.

---

## 📁 Estructura del proyecto (general)

```bash
garrapp/
├── public/           # Archivos estáticos
├── src/
│   ├── components/   # Componentes reutilizables (cards, carrito, etc.)
│   ├── assets/       # Imágenes, íconos, estilos
│   ├── App.jsx       # Componente raíz
│   ├── main.jsx      # Punto de entrada de React
│   └── styles/       # Hojas de estilos (si aplica)
├── .gitignore
├── package.json
└── README.md
```

> La estructura puede variar levemente, pero la idea general es separar componentes, estilos y punto de entrada.

---

## ✨ Próximas mejoras (ideas)

- Agregar filtros por categoría o precio.
- Persistir el carrito en `localStorage`.
- Integrar una API real para los productos.
- Agregar tests básicos (Jest / React Testing Library).
- Mejorar la accesibilidad (labels, focus, ARIA, etc.).

---

## 👤 Autor

**Matías** — Full Stack Developer Jr  
- GitHub: [@Maty1337](https://github.com/Maty1337)
- Portfolio: https://maty1337.github.io

---

## 📄 Licencia

Proyecto de práctica personal. Podés usarlo como referencia educativa o base para tus propios experimentos.
