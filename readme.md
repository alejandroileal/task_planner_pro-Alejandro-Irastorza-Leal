# 🧠 Devotion — Frontend (Task Planner Pro)

**Devotion** es una aplicación web de organización minimalista construida en **Vanilla JavaScript**, inspirada en herramientas como Notion. Es parte del proyecto final del módulo en **Evolve Academy** para el **Máster en Desarrollo Web & IA**. Esta versión evoluciona el proyecto _TaskPlanner_, reemplazando `localStorage` por una conexión con un backend propio y agregando autenticación, renderizado condicional por roles, interacción con una base de datos y comunicación en tiempo real.

La interfaz está diseñada para ser intuitiva y responsive, permitiendo a los usuarios visualizar tareas, eventos y fotos, mientras que los administradores tienen control completo sobre la gestión del contenido.

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/alejandroileal/task_planner_pro-Alejandro-Irastorza-Leal
cd task_planner_pro-Alejandro-Irastorza-Leal
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en entorno local

Esta aplicación está pensada para funcionar con la extensión **Live Server** de VS Code.

Pasos:

- Abrir el proyecto en VS Code.
- Instalar la extensión **Live Server** (si aún no la tienes).
- Hacer clic derecho sobre `index.html` y seleccionar **"Open with Live Server"**.
- ⚠️ Asegúrate de que se ejecute en el **puerto 5500** y el host sea **localhost** (esto puede hacerse manualmente cambiando la ip en la barra de navegación del navegador por 'localhost')

> No se requieren variables de entorno para esta parte del proyecto.

---

## 📁 Estructura del proyecto

```
├── images/                 # Imágenes utilizadas
├── src/
│   ├── api/                # Funciones para consumir el backend y APIs externas
│   ├── components/         # Elementos de interfaz visual y reutilizable
│   ├── state/              # Gestión del estado dividida en slices
│   ├── ui/                 # Renderizado dinámico del DOM y listeners
│   ├── utils/              # Utilidades como validaciones y helpers
│   ├── views/              # Manejadores de renderizado
│   ├── app.js              # Controlador principal, enrutado, elementos base
│   └── config.js           # Configuración general (URLs del backend)
├── index.html              # Página principal
├── styles.css              # Estilos globales
├── .gitignore
└── readme.md               # Este documento
```

---

## 🧠 Funcionalidades implementadas

- 🔒 **Login y registro con validación de campos**
- ✅ **Renderizado condicional según rol de usuario**
  - Admin: acceso completo a tareas, eventos y fotos.
  - Usuario: solo visualización.
- 📝 **Gestión de tareas y eventos**, incluyendo:
  - Filtros por estado de tarea.
  - Orden cronológico.
- 🖼️ **Galería de fotos**:
  - Visualización completa de imágenes al hacer clic.
- 🔔 **Notificaciones y actualización en tiempo real vía WebSocket**
- 🌤️ **Consumo de APIs externas** (por ejemplo, clima y noticias)
- 📩 **Interacción con backend para todas las operaciones**
- 📱 **Diseño responsive** compatible con móvil y escritorio

---

## ⚙️ Decisiones técnicas

- **Modularización total**: cada carpeta representa una responsabilidad (estado, UI, lógica de red…).
- **App como punto central**: controla el enrutado, almacenamiento de elementos clave del DOM y el arranque general de la aplicación.
- **Slices de estado**: cada entidad (`user`, `tasks`, `events`) tiene su propio slice con lógica encapsulada.
- **Renderizado condicional**: un mismo componente puede adaptarse a diferentes roles, reduciendo duplicación.
- **Socket integrado**: se actualiza la interfaz en tiempo real si se detectan cambios desde el backend.
- **Validaciones frontend**: se previenen formularios vacíos o con datos incorrectos antes de enviar al backend.

---

## 📌 Consideraciones importantes

- Si bien el frontend no contiene lógica de seguridad por sí solo, **oculta o desactiva visualmente acciones no permitidas** a los usuarios sin permisos.
- Los formularios visibles pero no funcionales (por ejemplo, el de eventos para usuarios no admin) **refuerzan la separación de roles** a nivel visual.

---

## 📬 Futuras mejoras

- Activar funcionalidad de **eliminar imágenes** desde el frontend (actualmente solo visual).
- Implementar alertas visuales cuando una tarea esté próxima a vencer.
- Mejorar la galería de fotos con filtros por tipo o fecha.

---

## 🧪 Validaciones y errores

- Validaciones personalizadas en formularios (`email`, campos vacíos, formatos).
- Mensajes de error visibles en pantalla con instrucciones claras.
- Conexión robusta con el backend para detectar respuestas 401/403 y redirigir al login si el token caduca.

---

## 👤 Autor

Desarrollado por **Alejandro Irastorza Leal**  
Proyecto final de módulo - **Máster en Desarrollo Web & IA**  
**Evolve Academy · 2025**
