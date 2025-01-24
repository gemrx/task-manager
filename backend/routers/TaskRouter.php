<?php

require_once 'controllers/TaskController.php';

class TaskRouter
{
    private $taskController;  // Instancia del controlador de tareas

    public function __construct()
    {
        // Crear la instancia del controlador de tareas
        $this->taskController = new TaskController();
    }

    // Maneja las solicitudes entrantes
    public function handleRequest()
    {
        // Obtener la URL de la solicitud (simplificada para este ejemplo)
        $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $url = trim($url, '/');  // Eliminar las barras laterales (por ejemplo, '/tasks')

        // Obtener el tipo de solicitud HTTP (GET, POST, PUT, DELETE)
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        // Verificar las rutas y redirigir al método adecuado según el tipo de solicitud y la URL
        if ($requestMethod === 'GET' && $url === 'tasks') {
            // Obtener todas las tareas
            $this->taskController->getTasks();
        } elseif ($requestMethod === 'GET' && preg_match('/^tasks\/(\d+)$/', $url, $matches)) {
            // Obtener tarea por ID
            $this->taskController->getTaskById($matches[1]);
        } elseif ($requestMethod === 'DELETE' && preg_match('/^tasks\/(\d+)$/', $url, $matches)) {
            // Eliminar tarea por ID
            $this->taskController->deleteTaskById($matches[1]);
        } elseif ($requestMethod === 'POST' && $url === 'tasks') {
            // Crear una nueva tarea
            $this->taskController->createTask();
        } elseif ($requestMethod === 'PUT' && preg_match('/^tasks\/(\d+)\/status$/', $url, $matches)) {
            // Actualizar el estado de una tarea
            $this->taskController->updateTaskStatus($matches[1]);
        } elseif ($requestMethod === 'PUT' && preg_match('/^tasks\/(\d+)$/', $url, $matches)) {
            // Actualizar una tarea (título, descripción)
            $this->taskController->updateTask($matches[1]);
        } else {
            // Si no se encuentra una ruta válida, devolver un error 404
            http_response_code(404);
            echo json_encode(["message" => "Route not found"]);
        }
    }
}
?>
