<?php

// Configuración de CORS
header('Access-Control-Allow-Origin: *'); // Permitir solicitudes desde cualquier origen
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Métodos HTTP permitidos
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Encabezados permitidos
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
  http_response_code(200);  // Respuesta 200 para solicitudes OPTIONS
  exit();  // Terminar la ejecución para evitar que se siga procesando
}

require_once 'routers/TaskRouter.php';

$router = new TaskRouter();
$router->handleRequest();
