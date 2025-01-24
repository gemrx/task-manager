<?php

require_once 'config/Database.php';

class Task
{
    private $db;  // Conexión a la base de datos
    private $table = 'tasks';  // Nombre de la tabla

    public function __construct()
    {
        // Establecer la conexión con la base de datos
        $this->db = (new Database())->connect();
    }

    // Obtener todas las tareas
    public function getTasks()
    {
        $statment = $this->db->query("SELECT * FROM {$this->table}");
        return $statment->fetchAll();  // Retorna todas las tareas como un array
    }

    // Obtener una tarea por su ID
    public function getTaskById($id)
    {
        $statement = $this->db->prepare("SELECT * FROM {$this->table} WHERE id = :id");
        $statement->execute(['id' => $id]);
        $task = $statement->fetch();  // Obtiene una tarea por ID
        if ($task) {
            return $task;  // Si la tarea existe, la devuelve
        }
        return null;  // Si no existe, retorna null
    }

    // Eliminar una tarea por ID
    public function deleteTaskById($id)
    {
        $statement = $this->db->prepare("DELETE FROM {$this->table} WHERE id = :id");
        $statement->execute(['id' => $id]);

        // Si se eliminó al menos una fila, retorna true
        return $statement->rowCount() > 0;
    }

    // Crear una nueva tarea
    public function createTask($title, $description)
    {
        $statement = $this->db->prepare("INSERT INTO {$this->table} (title, description) VALUES (:title, :description)");
        $statement->execute(['title' => $title, 'description' => $description]);
        $newTaskId = $this->db->lastInsertId();  // Obtener el ID de la tarea recién creada
        $task = $this->getTaskById($newTaskId);  // Recuperar la tarea con el nuevo ID
        return $task;  // Retorna la tarea recién creada
    }

    // Actualizar el estado de una tarea (0 o 1)
    public function updateTaskStatus($id, $status)
    {
        if ($status !== 0 && $status !== 1) {
            return false;  // Si el estado no es 0 ni 1, retorna false
        }

        // Preparar y ejecutar la consulta de actualización
        $statement = $this->db->prepare("UPDATE {$this->table} SET status = :status WHERE id = :id");
        $result = $statement->execute([
            'status' => $status,
            'id' => $id,
        ]);

        return $result && $statement->rowCount() > 0;  // Retorna true si se actualizó la fila
    }

    // Actualizar el título y descripción de una tarea
    public function updateTask($id, $title, $description)
    {
        // Preparar y ejecutar la consulta de actualización
        $statement = $this->db->prepare("UPDATE {$this->table} SET title = :title, description = :description WHERE id = :id");
        $result = $statement->execute([
            'title' => $title,
            'description' => $description,
            'id' => $id,
        ]);

        return $result && $statement->rowCount() > 0;  // Retorna true si se actualizó la fila
    }
}
?>
