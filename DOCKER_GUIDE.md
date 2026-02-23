# Guía de Docker para Recruiter App

## Arquitectura

Esta aplicación está dockerizada con un enfoque multi-stage:

- **Stage 1 (Builder)**: Compila la aplicación React + Vite
- **Stage 2 (Production)**: Sirve los archivos estáticos con Nginx

## Comandos Rápidos

### Producción
```bash
# Construir y ejecutar en producción
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Detener
docker-compose down
```

### Desarrollo
```bash
# Ejecutar en modo desarrollo (con hot reload)
docker-compose --profile dev up dev

# Ver logs de desarrollo
docker-compose --profile dev logs -f dev

# Detener desarrollo
docker-compose --profile dev down
```

### Construcción Manual
```bash
# Construir imagen de producción
docker build -t recruiter-app:latest .

# Construir imagen de desarrollo
docker build -f Dockerfile.dev -t recruiter-app:dev .

# Ejecutar contenedor de producción
docker run -d -p 3000:80 --name recruiter-app recruiter-app:latest

# Ejecutar contenedor de desarrollo
docker run -d -p 8080:8080 --name recruiter-app-dev recruiter-app:dev
```

## Variables de Entorno

Las variables de entorno se configuran en el archivo `.env`:
- `VITE_SUPABASE_PROJECT_ID`: ID del proyecto Supabase
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Clave pública de Supabase
- `VITE_SUPABASE_URL`: URL del proyecto Supabase

## Puertos

- **Producción**: `http://localhost:3000` (Nginx)
- **Desarrollo**: `http://localhost:8080` (Vite dev server)

## Health Check

La aplicación incluye un health check que verifica cada 30 segundos si el servidor responde correctamente.

## Optimizaciones

- **Multi-stage build**: Reduce el tamaño final de la imagen
- **Nginx Alpine**: Servidor web ligero para producción
- **Gzip compression**: Optimiza la entrega de assets
- **Cache headers**: Mejora el rendimiento del navegador
- **Security headers**: Añade cabeceras de seguridad básicas

## Troubleshooting

### Problemas comunes

1. **Error de permisos**: Asegúrate que Docker está corriendo con los permisos adecuados
2. **Puerto ocupado**: Cambia el puerto en docker-compose.yml si 3000 está en uso
3. **Variables de entorno**: Verifica que el archivo .env exista y tenga los valores correctos

### Reconstrucción forzada
```bash
# Forzar reconstrucción sin caché
docker-compose build --no-cache

# Limpiar imágenes no utilizadas
docker image prune -f
```

### Inspección de contenedores
```bash
# Ver estado de los contenedores
docker-compose ps

# Entrar al contenedor en producción
docker-compose exec app sh

# Entrar al contenedor en desarrollo
docker-compose exec dev sh
```
