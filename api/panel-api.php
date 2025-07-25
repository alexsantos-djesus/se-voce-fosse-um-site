<?php
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// 1) Carrega variáveis de ambiente e headers
Dotenv::createImmutable(__DIR__ . '/../')->load();
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('America/Sao_Paulo');

// 2) Conexão com MySQL
$host   = $_ENV['DB_host'] ?? '';
$user   = $_ENV['DB_user'] ?? '';
$pass   = $_ENV['DB_pass'] ?? '';
$dbname = $_ENV['DB_dbname'] ?? '';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro na conexão: ' . $conn->connect_error], JSON_UNESCAPED_UNICODE);
    exit;
}
$conn->set_charset('utf8mb4');

// 3) Executa a query e checa erros
$sql = "SELECT id, name, ip, count, timestamps FROM visits ORDER BY id DESC";
if (!($res = $conn->query($sql))) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro na consulta: ' . $conn->error], JSON_UNESCAPED_UNICODE);
    $conn->close();
    exit;
}

$data = [];
$window = 1800; // 30 minutos

while ($row = $res->fetch_assoc()) {
    // Decodifica e filtra timestamps dos últimos 30 minutos
    $timestamps = json_decode($row['timestamps'], true) ?: [];
    $recent = array_filter($timestamps, fn($ts) => strtotime($ts) > time() - $window);

    $ultimo     = end($timestamps) ?: null;
    $bloqueado  = count($recent) >= 3;

    $data[] = [
        'id'               => (int)$row['id'],
        'nome'             => $row['name'] !== '' ? $row['name'] : '—',
        'ip'               => $row['ip'],
        'count'            => (int)$row['count'],
        'bloqueado'        => $bloqueado ? 'SIM' : 'NÃO',
        'ultimo_acesso'    => $ultimo ? date('d/m/Y H:i:s', strtotime($ultimo)) : null,
        'quantidade_30min' => count($recent),
        'timestamps'       => array_map(
            fn($t) => date('d/m/Y H:i:s', strtotime($t)),
            $timestamps
        )
    ];
}

// 4) Libera recursos e fecha conexão
$res->free();
$conn->close();

// 5) Retorna JSON com acentos preservados
echo json_encode($data, JSON_UNESCAPED_UNICODE);
