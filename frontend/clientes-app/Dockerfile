FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY src/ ./src/

RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist/clientes-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]