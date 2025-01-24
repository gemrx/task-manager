# Task Manager - Aplicación de Gestión de Tareas

## Instalación

### Requisitos previos:

1. **Instalar Docker Engine o Docker Desktop**:
   - **En Linux**: Instalar Docker Engine siguiendo la [documentación oficial](https://docs.docker.com/engine/install/).
   - **En Windows o macOS**: Instalar Docker Desktop desde [Docker Desktop](https://www.docker.com/products/docker-desktop).

2. **Clonar este repositorio en tu máquina local**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DE_LA_CARPETA>
   ```

## Ejecución

### Levantar los contenedores:
En el directorio raíz del proyecto, ejecutar:

```bash
docker compose up -d
```

Esto:

- Levantará el contenedor de la base de datos MySQL.
- Iniciará el backend PHP/Apache.
- Servirá el frontend con Nginx.

### Detener los contenedores:
Para detener los contenedores sin eliminar los datos:

```bash
docker compose down
```

### Volver a correr la aplicación:
Si ya has configurado los contenedores anteriormente:

```bash
docker compose up -d
```

## Documentación de la API

### Base URL

La API está disponible en:  
[http://localhost:8080](http://localhost:8080)

### Endpoints

| Método | Endpoint             | Descripción                             |
|--------|----------------------|-----------------------------------------|
| GET    | /tasks               | Obtener todas las tareas.               |
| GET    | /tasks/{id}          | Obtener una tarea por su ID.            |
| POST   | /tasks               | Crear una nueva tarea.                  |
| PUT    | /tasks/{id}          | Actualizar título y descripción.        |
| PUT    | /tasks/{id}/status   | Actualizar el estado de una tarea.      |
| DELETE | /tasks/{id}          | Eliminar una tarea por su ID.           |

### Ejemplo de solicitud

**Crear una nueva tarea** (POST a `/tasks`):

Cuerpo del JSON:

```json
{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea"
}
```

**Actualizar estado de una tarea** (PUT a `/tasks/{id}/status`):

Cuerpo del JSON:

```json
{
  "status": 1
}
```

## Acceso al Frontend

Una vez levantados los contenedores, el frontend estará disponible en:  
[http://localhost](http://localhost)

En el navegador, podrás:

- Ver la lista de tareas.
- Crear nuevas tareas.
- Editar tareas existentes.
- Marcar tareas como completadas.
- Eliminar tareas.