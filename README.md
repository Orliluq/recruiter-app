# 🚀 Recruiter App - Plataforma de Reclutamiento Moderna

🎯 Una aplicación completa de reclutamiento construida con React, TypeScript y tecnologías modernas para gestionar candidatos, empleos y procesos de selección.

## ✨ Características Principales

### 👤 Gestión de Candidatos
- **📋 Perfil completo**: Información detallada de candidatos con habilidades, experiencia y contacto
- **⭐ Sistema de calificación**: Estrellas visuales para evaluar candidatos
- **📄 Gestión de documentos**: Subida y vista previa de CVs y documentos
- **🔗 Integración LinkedIn**: Enlaces directos a perfiles profesionales
- **🔍 Filtros avanzados**: Búsqueda por habilidades, ubicación, etapa del proceso

### 📊 Pipeline de Reclutamiento
- **📋 Kanban visual**: Tablero horizontal con arrastrar y soltar
- **🔄 6 etapas del proceso**: Sourced → Screening → Interview → Technical → Offer → Hired
- **🎯 Gestión por arrastre**: Mueve candidatos entre etapas fácilmente
- **📈 Contadores automáticos**: Visualización de candidatos por etapa
- **📝 Historial de cambios**: Seguimiento completo del progreso

### 💼 Gestión de Empleos
- **📝 Publicación de vacantes**: Creación y edición de ofertas de trabajo
- **📂 Categorización**: Departamentos, tipos de empleo y ubicaciones
- **👥 Seguimiento de candidatos**: Número de postulantes por empleo
- **💰 Gestión de salario**: Rangos salariales y tipo de contratación
- **🚦 Estado de vacantes**: Activo, cerrado, en pausa

### 📅 Calendario de Entrevistas
- **📆 Programación visual**: Vista de calendario mensual/semanal
- **🎥 Gestión de entrevistas**: Creación, edición y cancelación
- **🎯 Tipos de entrevista**: Técnica, cultural, final, etc.
- **🔔 Recordatorios automáticos**: Notificaciones para candidatos y reclutadores
- **📧 Integración con email**: Confirmaciones automáticas

### 🎨 Diseño y Experiencia
- **✨ Interfaz moderna**: Diseño limpio y profesional con glassmorphism
- **🌙 Modo oscuro/claro**: Toggle de tema con persistencia
- **📱 Totalmente responsivo**: Funciona perfectamente en móvil, tablet y desktop
- **📋 Sidebar colapsable**: Navegación optimizada para pantallas pequeñas
- **🎭 Animaciones suaves**: Transiciones y micro-interacciones
- **♿ Accesibilidad**: ARIA labels y navegación por teclado

### ⚙️ Características Técnicas
- **📘 TypeScript**: Tipado completo para mayor robustez
- **⚛️ React 18**: Última versión con hooks modernos
- **🎨 Tailwind CSS**: Diseño utility-first con personalización
- **⚡ Vite**: Build tool ultrarrápido para desarrollo
- **🛣️ React Router**: Navegación SPA con history API
- **🔄 React Query**: Gestión de estado y caché de datos
- **🎯 shadcn/ui**: Componentes de UI de alta calidad
- **🎭 Lucide Icons**: Iconos consistentes y modernos

## 📁 Estructura del Proyecto

```bash
recruitwise-os/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── CandidateCard.tsx      # Tarjeta de candidato
│   │   ├── PipelineStage.tsx       # Etapa del pipeline
│   │   ├── DraggableCandidateCard.tsx # Tarjeta arrastrable
│   │   ├── DocumentPreviewModal.tsx # Modal de vista previa
│   │   ├── ThemeToggle.tsx        # Toggle de tema
│   │   └── layout/               # Componentes de layout
│   │       ├── AppLayout.tsx     # Layout principal
│   │       └── AppSidebar.tsx    # Sidebar navegación
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Dashboard.tsx        # Panel principal
│   │   ├── Candidates.tsx       # Gestión de candidatos
│   │   ├── Pipeline.tsx         # Pipeline Kanban
│   │   ├── Jobs.tsx             # Gestión de empleos
│   │   ├── CalendarPage.tsx      # Calendario
│   │   └── CandidateProfile.tsx # Perfil detallado
│   ├── contexts/            # Contextos de React
│   │   └── ThemeContext.tsx    # Gestión del tema
│   ├── services/            # Lógica de negocio
│   │   └── documentService.ts  # Gestión de documentos
│   ├── data/               # Datos y mocks
│   │   └── mock-data.ts       # Datos de prueba
│   ├── types/              # Definiciones TypeScript
│   │   └── recruiter.ts        # Tipos principales
│   ├── integrations/       # Integraciones externas
│   │   └── supabase/         # Base de datos
│   ├── test/               # Suite de tests
│   │   ├── setup.ts           # Configuración de tests
│   │   ├── basic.test.tsx     # Tests básicos
│   │   └── components/       # Tests de componentes
│   │       ├── CandidateCard.test.tsx
│   │       └── CandidateCard.simple.test.tsx
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globales
├── package.json           # Dependencias y scripts
├── tsconfig.json         # Configuración TypeScript
├── vite.config.ts        # Configuración Vite
├── tailwind.config.js    # Configuración Tailwind
└── README.md             # Este archivo
```

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos
- **🟢 Node.js** 18+ 
- **📦 npm** o **🧶 yarn**
- **🔧 Git** para control de versiones

### ⚡ Instalación
```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/recruiter-app.git

# 2. Navegar al proyecto
cd recruiter-app

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

### 🔧 Variables de Entorno
```bash
# Crear archivo .env.local
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## 🧪 Tests y Calidad

### 📊 Suite de Tests
- **🔬 Tests unitarios**: Componentes y funciones individuales
- **🔗 Tests de integración**: Flujo completo de la aplicación
- **📈 Cobertura**: Funcionalidades principales verificadas
- **🛠️ Framework**: Vitest con React Testing Library

### 🏃‍♂️ Ejecutar Tests
```bash
# Ejecutar todos los tests
npm test

# Ejecutar en modo watch
npm run test:watch

# Ver cobertura
npm run test:coverage
```

### 🎯 Calidad del Código
- **📘 TypeScript**: Tipado estricto
- **🔍 ESLint**: Linting automático
- **🎨 Prettier**: Formato consistente
- **🐕 Husky**: Git hooks para calidad

## 🛠️ Tecnologías y Dependencias

### ⚛️ Frontend Core
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1", 
  "react-router-dom": "^6.30.1",
  "typescript": "^5.6.3"
}
```

### 🎨 UI y Estilos
```json
{
  "tailwindcss": "^3.4.17",
  "@radix-ui/react-accordion": "^1.2.11",
  "@radix-ui/react-alert-dialog": "^1.1.14",
  "lucide-react": "^0.462.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.4"
}
```

### 🔄 Estado y Datos
```json
{
  "@tanstack/react-query": "^5.64.2",
  "@supabase/supabase-js": "^2.49.1",
  "date-fns": "^3.6.0",
  "react-hook-form": "^7.61.1",
  "@hookform/resolvers": "^3.10.0"
}
```

### ⚡ Desarrollo y Build
```json
{
  "vite": "^6.3.0",
  "@types/react": "^18.3.17",
  "@types/react-dom": "^18.3.17",
  "eslint": "^9.18.0",
  "prettier": "^3.3.3"
}
```

## 📜 Scripts Disponibles

```bash
# 🚀 Desarrollo
npm run dev          # Servidor con hot reload
npm run build        # Build para producción
npm run preview      # Previsualizar build

# 🎯 Calidad  
npm run lint         # Análisis ESLint
npm run lint:fix     # Auto-corrección ESLint
npm run type-check   # Verificación TypeScript

# 🧪 Tests
npm test             # Ejecutar tests
npm run test:watch    # Tests en modo watch
npm run test:coverage # Tests con cobertura
```

## ⚙️ Configuración

### ⚡ Vite (vite.config.ts)
- **🚀 Build optimizado**: Code splitting y lazy loading
- **🛣️ Alias de paths**: Importaciones limpias (@/components, etc.)
- **🔐 Variables de entorno**: Soporte completo para .env
- **🔥 Dev server**: HMR y configuración proxy

### 📘 TypeScript (tsconfig.json)
- **🔒 Estricto**: Todas las verificaciones activadas
- **🛣️ Path mapping**: Alias para imports limpios
- **🎯 Target moderno**: ES2022+ para últimas características
- **⚛️ React 18**: Tipos actualizados para JSX

### 🎨 Tailwind (tailwind.config.js)
- **🎨 Diseño personalizado**: Colores y espaciado custom
- **🎯 Componentes UI**: Integración con shadcn/ui
- **🌙 Modo oscuro**: Variables CSS para temas
- **📱 Responsive**: Breakpoints optimizados

## 🎨 Sistema de Diseño

### 🎨 Colores y Tema
```css
:root {
  /* Primarios */
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  
  /* Secundarios */
  --secondary: #f1f5f9;
  --secondary-foreground: #64748b;
  
  /* Fondos */
  --background: #ffffff;
  --foreground: #0f172a;
  
  /* Estados */
  --success: #10b981;
  --warning: #f59e0b;
  --destructive: #ef4444;
}
```

### 🎯 Componentes UI
- **🔮 Glassmorphism**: Efectos de cristal con backdrop-blur
- **✨ Micro-interacciones**: Hover states, transiciones suaves
- **♿ Accesibilidad**: ARIA labels, focus states, keyboard nav
- **📱 Responsive**: Mobile-first con breakpoints optimizados

## 🏗️ Arquitectura y Patrones

### 📐 Estructura de Componentes
```typescript
interface ComponentProps {
  // Props tipadas
}

export const Component: React.FC<ComponentProps> = ({ prop }) => {
  // Lógica del componente
  return <div>{/* JSX */}</div>;
};
```

### 🔄 Gestión de Estado
- **🌐 Context API**: Para estado global (tema, auth)
- **🔄 React Query**: Para estado del servidor y caché
- **🏠 Local State**: useState para estado local del componente
- **🎣 Custom Hooks**: Lógica reutilizable

### 🎭 Patrones Utilizados
- **🧩 Compound Components**: Componentes complejos (Sidebar, Modal)
- **🎭 Render Props**: Componentes flexibles y reutilizables
- **🏗️ Higher-Order Components**: Para funcionalidades compartidas
- **🎣 Custom Hooks**: Abstracción de lógica

## 🚀 Despliegue

### 📦 Build de Producción
```bash
# Crear build optimizado
npm run build

# Resultado en dist/
# - 🗜️ Archivos minificados y comprimidos
# - ⚡ Code splitting automático
# 🔒 Hash de archivos para cache
```

### 🌐 Despliegue Estático
```bash
# Previsualizar build local
npm run preview

# Desplegar en Vercel, Netlify, etc.
# - 📤 Subir carpeta dist/
# - 🔄 Configurar rewrites para SPA
# - 🔐 Variables de entorno en plataforma
```

### 🔐 Variables de Entorno de Producción
```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-key-produccion
VITE_APP_NAME=Recruiter App
VITE_APP_VERSION=1.0.0
```

## 🔒 Seguridad

### 🔐 Autenticación
- **🔑 Supabase Auth**: Proveedor OAuth completo
- **🎫 JWT Tokens**: Manejo seguro de sesiones
- **🛡️ RLS**: Row Level Security en base de datos
- **🌐 CORS**: Configuración segura de orígenes

### 🛡️ Mejores Prácticas
- **✅ Input validation**: Sanitización de datos
- **🛡️ XSS Prevention**: Escape de contenido dinámico
- **🔒 HTTPS**: Todo en producción con SSL
- **🔐 Env vars**: Variables sensibles en entorno

## 📊 Monitoreo y Analytics

### 📈 Métricas de Usuario
- **⏱️ Tiempo en página**: Performance metrics
- **🎯 Tasa de conversión**: Pipeline effectiveness
- **📊 Uso de features**: Track de funcionalidades
- **🐛 Errores**: Captura automática de fallos

### 📋 Logs y Debugging
- **📝 Console logging**: Niveles de log configurados
- **🚨 Error boundaries**: Captura de errores React
- **⚡ Performance monitoring**: Métricas de renderizado
- **💬 User feedback**: Sistema de reporte de issues

## 🗺️ Roadmap Futuro

### 🚀 Próximas Características
- [ ] **🤖 AI Matching**: Recomendación automática de candidatos
- [ ] **📹 Video Interviews**: Integración de videollamadas
- [ ] **📊 Analytics Dashboard**: Métricas avanzadas
- [ ] **📧 Email Templates**: Plantillas personalizables
- [ ] **📱 Mobile App**: Versión nativa para móviles
- [ ] **🔌 API REST**: Endpoints para integraciones
- [ ] **🔔 Webhooks**: Notificaciones en tiempo real

### 🔧 Mejoras Técnicas
- [ ] **🧩 Micro-frontends**: Arquitectura modular
- [ ] **📱 PWA**: Funcionalidad offline
- [ ] **💾 Caching**: Estrategia avanzada de caché
- [ ] **🧪 Testing E2E**: Cypress o Playwright
- [ ] **🔄 CI/CD**: GitHub Actions automático
- [ ] **⚡ Performance**: Optimización de Core Web Vitals

## 🤝 Contribución

### 🔄 Flujo de Trabajo
1. **🍴 Fork** el repositorio
2. **🌿 Crear rama** feature/tu-feature
3. **⚡ Desarrollar** con tests incluidos
4. **📝 Commits** con mensajes claros
5. **📤 Pull Request** con descripción detallada
6. **👀 Code Review** por mantenedores
7. **🔀 Merge** a main después de aprobación

### 📋 Estándares de Código
- **📏 Convenciones**: Seguir ESLint y Prettier
- **📝 Commits**: Convencionales (feat:, fix:, docs:)
- **🧪 Tests**: Cobertura mínima del 80%
- **📖 Documentación**: Comentarios en código complejo

### 🆘 Issues y Soporte
- **🐛 Bug Reports**: Usar plantilla de GitHub Issues
- **💡 Feature Requests**: Discusión en GitHub Discussions
- **❓ Questions**: Stack Overflow con tag [recruitwise-os]
- **🔒 Security**: Reportar a security@recruitwise.com

## 📄 Licencia

Este proyecto está licenciado bajo **MIT License** - ver archivo [MIT](LICENSE) para detalles completos.

---

## 🎉 Gracias por usar Recruiter App!

🎯 Una solución moderna y completa para el reclutamiento técnico.

**🚀 Hecho con ❤️ usando React, TypeScript y las mejores prácticas del desarrollo web.**

---
