# Frontend Angular - Sistema de Registro de Clientes

Aplicación frontend desarrollada en Angular 20 para el registro de clientes con integración a microservicios de seguridad y gestión de clientes.

## 🏗️ Arquitectura del Frontend

```
src/app/
├── config/
│   └── app.config.ts              # Configuraciones centralizadas
├── models/
│   ├── interfaces.ts              # Interfaces TypeScript
│   └── constants.ts               # Constantes y mensajes
├── shared/
│   └── utils.ts                   # Utilidades compartidas
├── services/
│   └── microservices-sdk.service.ts # SDK para comunicación
├── components/
│   ├── client-registration.component.ts
│   ├── client-registration.component.html
│   └── client-registration.component.scss
├── app.ts                         # Componente principal
├── app.html                       # Template principal
├── app.scss                       # Estilos globales
└── app.config.ts                  # Configuración HTTP
```

## 🚀 Inicio Rápido

### **Prerrequisitos**
- Node.js 18+ 
- npm 9+
- Angular CLI 20+

### **Instalación**
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Build para producción
npm run build
```

### **URLs de Desarrollo**
- **Aplicación**: http://localhost:4200
- **Security-MS**: http://localhost:3001
- **Clients-MS**: http://localhost:3002

## 🔧 Configuración

### **Variables de Entorno**
```bash
# .env
SECURITY_MS_URL=http://localhost:3001
CLIENTS_MS_URL=http://localhost:3002
API_TIMEOUT=10000
```

### **Configuración Centralizada**
```typescript
// config/app.config.ts
export const MICROSERVICES_CONFIG = {
  SECURITY_MS_URL: 'http://localhost:3001',
  CLIENTS_MS_URL: 'http://localhost:3002',
  TIMEOUT: 10000
};
```

## 🛠️ Comandos de Desarrollo

### **Desarrollo**
```bash
# Servidor de desarrollo
npm start

# Build con watch
npm run watch

# Tests
npm test
```

### **Producción**
```bash
# Build optimizado
npm run build

# Servir build local
npx http-server dist/clientes-app
```

## 🐳 Docker

### **Build y Ejecución**
```bash
# Build imagen
docker build -t clientes-app .

# Ejecutar contenedor
docker run -p 8080:8080 clientes-app

# Con docker-compose (recomendado)
docker-compose up frontend
```

### **Configuración Docker**
- **Multi-stage build**: Optimizado para producción
- **Nginx**: Servidor web ligero
- **Puerto**: 8080
- **Health check**: Endpoint `/health`

## 🔍 Debugging y Testing

### **Herramientas de Desarrollo**
- **Angular DevTools**: Browser extension
- **Console Logs**: SDK y componentes
- **Network Tab**: Verificar llamadas HTTP
- **Sources Tab**: Debug TypeScript

### **Testing**
```bash
# Tests unitarios
npm test

# Tests con coverage
npm run test -- --code-coverage

# Tests E2E (si está configurado)
npm run e2e
```

## 🔄 Actualizaciones

### **Dependencias**
```bash
# Actualizar Angular
ng update @angular/core @angular/cli

# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit
```


