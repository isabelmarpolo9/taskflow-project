# Herramientas del ecosistema backend

## Axios

Axios es una librería HTTP para el navegador y Node.js que simplifica las peticiones de red frente a `fetch`. Sus ventajas principales son la transformación automática de JSON, la interceptación de peticiones y respuestas, la cancelación de peticiones y un manejo de errores más consistente. A diferencia de `fetch`, Axios lanza errores automáticamente cuando el servidor devuelve códigos 4xx o 5xx, sin necesidad de comprobar `res.ok` manualmente.

## Postman

Postman es una plataforma para diseñar, probar y documentar APIs. Permite crear colecciones de peticiones HTTP organizadas, definir entornos con variables (como la URL base del servidor), escribir tests automatizados en JavaScript que verifican las respuestas, y generar documentación interactiva de la API. Es la herramienta estándar en equipos profesionales para probar APIs antes de conectar el frontend.

## Sentry

Sentry es una plataforma de monitorización de errores en tiempo real. Cuando una aplicación en producción lanza un error, Sentry lo captura automáticamente y envía una alerta con toda la información relevante: el stack trace completo, el usuario afectado, el contexto de la petición y la frecuencia del error. Permite detectar y corregir problemas en producción antes de que los usuarios los reporten.

## Swagger

Swagger (ahora llamado OpenAPI) es un estándar para describir APIs REST mediante un archivo de especificación en formato JSON o YAML. A partir de ese archivo se genera automáticamente una interfaz web interactiva donde los desarrolladores pueden explorar los endpoints, ver los parámetros esperados y hacer peticiones de prueba directamente desde el navegador. Es la forma estándar de documentar APIs en entornos profesionales.
