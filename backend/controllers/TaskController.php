<?php

require_once 'models/Task.php';

class TaskController
{
    private $taskModel;

    public function __construct()
    {
        // Inicializar el modelo de tareas
        $this->taskModel = new Task();
    }

    // Obtener todas las tareas
    public function getTasks() 
    {
        header('Content-Type: application/json');
        $tasks = $this->taskModel->getTasks();
        echo json_encode($tasks);
    }

    // Obtener una tarea por su ID
    public function getTaskById($id) 
    {
        header('Content-Type: application/json');
        $task = $this->taskModel->getTaskById($id);
        if ($task) {
            echo json_encode($task);
        } else {
            // Si la tarea no existe, devolver 404
            http_response_code(404);
            echo json_encode(["message" => "Task not found"]);
        }
    }

    // Eliminar una tarea por su ID
    public function deleteTaskById($id) 
    {
        header('Content-Type: application/json');
        $task = $this->taskModel->getTaskById($id);

        if (!$task) {
            // Si la tarea no existe, devolver 404
            http_response_code(404);
            echo json_encode(["message" => "Task not found"]);
        } else {
            // Eliminar la tarea
            $result = $this->taskModel->deleteTaskById($id);
            if ($result) {
                http_response_code(204);  // No content
            } else {
                http_response_code(500);  // Error en el servidor
                echo json_encode(["message" => "Failed to delete task"]);
            }
        }
    }

    // Crear una nueva tarea
    public function createTask() 
    {
        header('Content-Type: application/json');

        // Obtener los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true);

        // Validar que los datos sean correctos
        if (empty($data['title']) || empty($data['description'])) {
            http_response_code(400);  // Bad request
            echo json_encode(["message" => "Title and description are required"]);
            return;
        }

        // Crear la tarea
        $newTask = $this->taskModel->createTask($data['title'], $data['description']);

        if ($newTask) {
            // Si la tarea fue creada exitosamente
            http_response_code(201);  // Created
            echo json_encode($newTask);
        } else {
            http_response_code(500);  // Error en el servidor
            echo json_encode(["message" => "Failed to create task"]);
        }
    }

    // Actualizar el estado de una tarea
    public function updateTaskStatus($id)
    {
        header('Content-Type: application/json');

        // Obtener los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true);

        // Validar que el estado sea 0 o 1
        if (!isset($data['status']) || ($data['status'] !== 0 && $data['status'] !== 1)) {
            http_response_code(400);  // Bad request
            echo json_encode(["message" => "Status must be 0 or 1"]);
            return;
        }

        // Verificar si la tarea existe
        $task = $this->taskModel->getTaskById($id);

        if (!$task) {
            http_response_code(404);  // Not found
            echo json_encode(["message" => "Task not found"]);
            return;
        }

        // Actualizar el estado de la tarea
        $result = $this->taskModel->updateTaskStatus($id, $data['status']);
        if ($result) {
            http_response_code(204);  // No content
        } else {
            http_response_code(500);  // Error en el servidor
            echo json_encode(["message" => "Failed to update task status"]);
        }
    }

    // Actualizar una tarea existente
    public function updateTask($id)
    {
        header('Content-Type: application/json');

        // Obtener los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents("php://input"), true);

        // Validar que los datos sean correctos
        if (empty($data['title']) || empty($data['description'])) {
            http_response_code(400);  // Bad request
            echo json_encode(["message" => "Title and description are required"]);
            return;
        }

        // Verificar si la tarea existe
        $task = $this->taskModel->getTaskById($id);

        if (!$task) {
            http_response_code(404);  // Not found
            echo json_encode(["message" => "Task not found"]);
            return;
        }

        // Actualizar la tarea con los nuevos valores
        $result = $this->taskModel->updateTask($id, $data['title'], $data['description']);

        if ($result) {
            http_response_code(200);  // OK
            $updatedTask = $this->taskModel->getTaskById($id);
            echo json_encode($updatedTask);
        } else {
            http_response_code(500);  // Error en el servidor
            echo json_encode(["message" => "Failed to update task"]);
        }
    }
}