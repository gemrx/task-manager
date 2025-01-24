CREATE DATABASE IF NOT EXISTS `task-manager-db`;

USE `task-manager-db`;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    description TEXT CHARACTER SET utf8mb4 NOT NULL,
    status TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status)
VALUES 
('Comprar víveres', 'Comprar leche, huevos, pan y frutas en el supermercado.', 0),
('Estudiar para el examen', 'Repasar temas de matemáticas y resolver ejercicios.', 1),
('Hacer ejercicio', 'Completar 30 minutos de cardio.', 0),
('Organizar escritorio', 'Ordenar documentos y desechar papeles viejos.', 1);