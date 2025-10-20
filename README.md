# Sistema de Microservicios Completo

Sistema completo de gestión de clientes con arquitectura de microservicios, frontend Angular y base de datos unificada.

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                        SISTEMA COMPLETO                        │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Angular)     │  Backend (Microservicios)  │  Infra  │
│  ┌─────────────────┐    │  ┌─────────────────────┐   │  ┌─────┐│
│  │   Clientes App   │◄──►│  │   Security-MS      │   │  │MySQL││
│  │   (Puerto 8080)  │    │  │   (Puerto 3001)    │◄──►│  │3306 ││
│  └─────────────────┘    │  └─────────────────────┘   │  └─────┘│
│                         │  ┌─────────────────────┐   │  ┌─────┐│
│                         │  │   Clients-MS       │◄──►│  │Redis││
│                         │  │   (Puerto 3002)    │   │  │6379 ││
│                         │  └─────────────────────┘   │  └─────┘│
│                         │  ┌─────────────────────┐   │  ┌─────┐│
│                         │  │   Emails-MS        │◄──►│  │Rabbit││
│                         │  │   (Puerto 3003)    │   │  │MQ   ││
│                         │  └─────────────────────┘   │  └─────┘│
└─────────────────────────────────────────────────────────────────┘
```

### **Frontend**
- **Angular App** (Puerto 8080): Interfaz de usuario para registro de clientes

### **Backend - Microservicios**
- **Security-MS** (Puerto 3001): Generación y validación de tokens de seguridad
- **Clients-MS** (Puerto 3002): Registro y gestión de clientes  
- **Emails-MS** (Puerto 3003): Procesamiento de emails via RabbitMQ

### **Infraestructura**
- **MySQL** (Puerto 3306): Base de datos unificada
- **Redis** (Puerto 6379): Cache para parámetros
- **RabbitMQ** (Puertos 5672, 15672): Cola de mensajes

## 🚀 Inicio Rápido

### **Opción 1: Todo el Sistema (Recomendado)**
```bash
cd microservices
docker-compose up --build
```

### **Opción 2: Solo Backend**
```bash
cd microservices/backend
docker-compose up --build
```

### **Opción 3: Solo Frontend**
```bash
cd microservices/frontend/clientes-app
npm install
npm start
```

## 📡 URLs del Sistema

| Servicio | URL | Descripción | Puerto |
|----------|-----|-------------|--------|
| **Frontend** | http://localhost:8080 | Aplicación Angular | 8080 |
| **Security-MS** | http://localhost:3001 | API de tokens | 3001 |
| **Clients-MS** | http://localhost:3002 | API de clientes | 3002 |
| **Emails-MS** | http://localhost:3003 | API de emails | 3003 |
| **RabbitMQ UI** | http://localhost:15672 | Management (admin/admin123) | 15672 |
| **MySQL** | localhost:3306 | Base de datos | 3306 |
| **Redis** | localhost:6379 | Cache | 6379 |

## 🔧 Variables de Entorno

### **Frontend (.env)**
```bash
SECURITY_MS_URL=http://localhost:3001
CLIENTS_MS_URL=http://localhost:3002
API_TIMEOUT=10000
```

### **Backend (Docker Compose)**
```bash
# MySQL
MYSQL_HOST=mysql
MYSQL_USER=appuser
MYSQL_PASSWORD=appsecret
MYSQL_DATABASE=appdb

# Redis
REDIS_HOST=redis

# RabbitMQ
RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672

# Microservicios
SECURITY_MS_URL=http://security-ms:3001
```

## 📊 Flujo de la Aplicación

1. **Usuario accede** al frontend Angular (puerto 8080)
2. **Frontend solicita** token al Security-MS (puerto 3001)
3. **Usuario completa** formulario de registro
4. **Frontend envía** datos al Clients-MS (puerto 3002)
5. **Clients-MS valida** token con Security-MS
6. **Clients-MS registra** cliente en MySQL
7. **Clients-MS envía** email a RabbitMQ
8. **Emails-MS procesa** email de la cola

## 🛠️ Comandos Útiles

### **Docker Compose**
```bash
# Construir y ejecutar todo
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Reconstruir un servicio
docker-compose up --build security-ms
```

### **Desarrollo Individual**
```bash
# Security-MS
cd backend/security-ms
npm run dev

# Clients-MS  
cd backend/clients-ms
npm run dev

# Emails-MS
cd backend/emails-ms
npm run dev

# Frontend
cd frontend/clientes-app
npm start
```

## 🔍 Monitoreo y Debugging

### **Health Checks**
- **Frontend**: http://localhost:8080/health
- **Security-MS**: http://localhost:3001/health
- **Clients-MS**: http://localhost:3002/health
- **Emails-MS**: http://localhost:3003/health

### **Logs**
```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f security-ms

# Ver logs del frontend
docker-compose logs -f frontend
```

### **Base de Datos**
```bash
# Conectar a MySQL
docker-compose exec mysql mysql -u appuser -p appdb

# Ver tablas
SHOW TABLES;
SELECT * FROM security_tokens;
SELECT * FROM customers;
SELECT * FROM email_logs;
```

## 🚨 Solución de Problemas

### **Error de Conexión**
```bash
# Verificar que todos los servicios estén corriendo
docker-compose ps

# Verificar logs de errores
docker-compose logs | grep ERROR
```

### **Puerto en Uso**
```bash
# Verificar puertos ocupados
netstat -tulpn | grep :3001

# Cambiar puertos en docker-compose.yml
```

### **Problemas de Base de Datos**
```bash
# Reiniciar MySQL
docker-compose restart mysql

# Verificar conexión
docker-compose exec mysql mysqladmin ping
```

### **Problemas de RabbitMQ**
```bash
# Reiniciar RabbitMQ
docker-compose restart rabbitmq

# Verificar cola
docker-compose exec rabbitmq rabbitmqctl list_queues
```

## 📁 Estructura del Proyecto

```
microservices/
├── docker-compose.yml          # Orquestación completa
├── README.md                   # Este archivo
├── backend/                    # Microservicios
│   ├── security-ms/           # Puerto 3001
│   ├── clients-ms/           # Puerto 3002
│   ├── emails-ms/            # Puerto 3003
│   └── db/mysql/init.sql     # Schema de BD
└── frontend/                   # Aplicación Angular
    └── clientes-app/          # Puerto 8080
```

## 🎯 Próximos Pasos

1. **Ejecutar**: `docker-compose up --build`
2. **Abrir**: http://localhost:8080
3. **Probar**: Registro de cliente
4. **Monitorear**: Logs y RabbitMQ UI
5. **Desarrollar**: Modificar código según necesidades