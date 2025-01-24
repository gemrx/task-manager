<?php

class Database
{
    private $host = 'db';
    private $db = 'task-manager-db';
    private $user = 'root';
    private $pass = 'rootpassword';
    private $charset = 'utf8mb4';
    private $pdo = null;

    public function connect()
    {
        if ($this->pdo === null) {
            try {
                $dsn = "mysql:host={$this->host};dbname={$this->db};charset={$this->charset}";
                $options = [
                    \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
                    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                    \PDO::ATTR_EMULATE_PREPARES   => false,
                ];
                $this->pdo = new \PDO($dsn, $this->user, $this->pass, $options);
            } catch (\PDOException $e) {
                throw new \RuntimeException('Connection failed: ' . $e->getMessage());
            }
        }
        return $this->pdo;
    }
}
