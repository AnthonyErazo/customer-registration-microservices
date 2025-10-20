# Microservices Backend

Sistema de microservicios con arquitectura modular para gestión de clientes, seguridad y emails.

## 🏗️ Arquitectura

- **Security-MS** (Puerto 3001): Generación y validación de tokens de seguridad
- **Clients-MS** (Puerto 3002): Registro y gestión de clientes
- **Emails-MS** (Puerto 3003): Procesamiento de emails via RabbitMQ

## 🚀 Inicio Rápido

### Opción 1: Docker Compose (Recomendado)

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down
```

### Opción 2: Desarrollo Individual

```bash
# Security-MS
cd security-ms
npm install
npm run dev

# Clients-MS
cd clients-ms
npm install
npm run dev

# Emails-MS
cd emails-ms
npm install
npm run dev
```

## 🐳 Dockerfiles

Cada microservicio tiene su propio Dockerfile optimizado:

- **Single-stage build**: Más simple y eficiente
- **Node.js 20 Alpine**: Imagen ligera
- **dumb-init**: Manejo correcto de señales
- **Usuario no-root**: Seguridad mejorada
- **Health checks**: Monitoreo automático

## 📊 Servicios de Infraestructura

### MySQL (Puerto 3306)
- **Base de datos**: `appdb`
- **Usuario**: `appuser` / `appsecret`
- **Root**: `rootpass`

### Redis (Puerto 6379)
- **Cache**: Para parámetros de configuración
- **Sin autenticación**: Solo para desarrollo

### RabbitMQ (Puertos 5672, 15672)
- **Usuario**: `admin` / `admin123`
- **Management UI**: http://localhost:15672
- **Cola**: `email_queue`

## 🔧 Variables de Entorno

### Security-MS
```bash
PORT=3001
MYSQL_HOST=mysql
MYSQL_USER=appuser
MYSQL_PASSWORD=appsecret
MYSQL_DATABASE=appdb
```

### Clients-MS
```bash
PORT=3002
MYSQL_HOST=mysql
REDIS_HOST=redis
SECURITY_MS_URL=http://security-ms:3001
RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672
```

### Emails-MS
```bash
PORT=3003
MYSQL_HOST=mysql
RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672
```

## 📡 Endpoints

### Security-MS
- `POST /token` - Generar token de 8 dígitos
- `POST /token/validate` - Validar token
- `GET /health` - Health check

### Clients-MS
- `POST /clients` - Registrar cliente
- `GET /health` - Health check

### Emails-MS
- `GET /health` - Health check
- Consume mensajes de RabbitMQ

## 🛠️ Comandos Útiles

```bash
# Ver estado de contenedores
docker-compose ps

# Reconstruir un servicio específico
docker-compose up --build security-ms

# Ejecutar comandos en contenedor
docker-compose exec security-ms sh

# Ver logs de un servicio
docker-compose logs -f security-ms

# Limpiar volúmenes
docker-compose down -v
```

## 🔍 Monitoreo

- **Health Checks**: Cada servicio tiene endpoint `/health`
- **Logs**: Centralizados con docker-compose logs
- **RabbitMQ Management**: http://localhost:15672
- **Base de datos**: Acceso directo en puerto 3306

## 🚨 Solución de Problemas

### Error de Conexión RabbitMQ
```bash
# Verificar que RabbitMQ esté corriendo
docker-compose ps rabbitmq

# Reiniciar RabbitMQ
docker-compose restart rabbitmq
```

### Error de Base de Datos
```bash
# Verificar MySQL
docker-compose logs mysql

# Reiniciar MySQL
docker-compose restart mysql
```

### Puerto en Uso
```bash
# Verificar puertos ocupados
netstat -tulpn | grep :3001

# Cambiar puertos en docker-compose.yml
```
