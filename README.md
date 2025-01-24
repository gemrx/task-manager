# Task Manager - Aplicación de Gestión de Tareas

## Índice

1. [Instalación](#instalación)
   - [Requisitos previos](#requisitos-previos)
   - [Clonar el repositorio](#clonar-este-repositorio-en-tu-máquina-local)
2. [Ejecución](#ejecución)
   - [Levantar los contenedores](#levantar-los-contenedores)
   - [Detener los contenedores](#detener-los-contenedores)
   - [Volver a correr la aplicación](#volver-a-correr-la-aplicación)
3. [Documentación de la API](#documentación-de-la-api)
   - [Base URL](#base-url)
   - [Endpoints](#endpoints)
   - [Ejemplo de solicitud](#ejemplo-de-solicitud)
4. [Acceso al Frontend](#acceso-al-frontend)
5. [Credenciales de Acceso a MySQL](#credenciales-de-acceso-a-mysql)
6. [Respuestas Teóricas](#respuestas-teóricas)

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

## Credenciales de Acceso a MySQL

La base de datos MySQL se expone a través del contenedor `task-manager-db`. Puedes acceder a ella utilizando las siguientes credenciales:

- **Host**: `localhost` o `127.0.0.1`
- **Puerto**: `3306`
- **Usuario**: `root`
- **Contraseña**: `rootpassword`
- **Base de datos**: `task-manager-db`

## Respuestas Teóricas

Para ver las respuestas teóricas a la prueba técnica, puedes consultar el siguiente [documento PDF](https://drive.google.com/file/d/1UPI_Dpa21elat51qTHE7SvVvhBlfccai/view?usp=drive_link).