<?php
date_default_timezone_set('America/Sao_Paulo');
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// 1) Carrega ENV
Dotenv::createImmutable(__DIR__ . '/../')->load();

// 2) Conexão com MySQL
$conn = new mysqli(
    $_ENV['DB_host'] ?? '',
    $_ENV['DB_user'] ?? '',
    $_ENV['DB'] ?? '',
    $_ENV['DB_dbname'] ?? ''
);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro na conexão: ' . $conn->connect_error]);
    exit;
}
$conn->set_charset('utf8mb4');

// 3) Lê entrada JSON uma única vez
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido']);
    exit;
}
$name  = trim($data['name'] ?? '');
$ip    = ($_SERVER['REMOTE_ADDR'] === '::1' ? '127.0.0.1' : $_SERVER['REMOTE_ADDR']);
$now   = time();
$limit = 3;
$window = 1800; // 30 minutos

// 4) Busca registro existente
$stmt = $conn->prepare("SELECT id, name, count, timestamps FROM visits WHERE ip = ? LIMIT 1");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Prepare falhou: ' . $conn->error]);
    exit;
}
$stmt->bind_param('s', $ip);
$stmt->execute();
$res = $stmt->get_result();
$row = $res->fetch_assoc();
$res->free();
$stmt->close();

if ($row) {
    // 5.a) Atualiza nome se necessário
    if ($name !== '' && $name !== $row['name']) {
        $upd = $conn->prepare("UPDATE visits SET name = ? WHERE ip = ?");
        if (!$upd) {
            http_response_code(500);
            echo json_encode(['error' => 'Prepare falhou: ' . $conn->error]);
            exit;
        }
        $upd->bind_param('ss', $name, $ip);
        $upd->execute();
        $upd->close();
    }

    // 5.b) Computa bloqueio
    $timestamps = json_decode($row['timestamps'], true) ?: [];
    $recent     = array_filter($timestamps, function ($ts) use ($now, $window) {
        return strtotime($ts) > $now - $window;
    });
    if (count($recent) >= $limit) {
        http_response_code(429);
        echo json_encode(['error' => 'Você excedeu o limite de 3 tentativas. Tente novamente em 30 minutos.']);
        exit;
    }

    // 5.c) Registra nova visita
    $timestamps[] = date('c');
    $tsJson       = json_encode($timestamps);
    $upd2         = $conn->prepare("UPDATE visits SET count = count + 1, timestamps = ? WHERE ip = ?");
    if (!$upd2) {
        http_response_code(500);
        echo json_encode(['error' => 'Prepare falhou: ' . $conn->error]);
        exit;
    }
    $upd2->bind_param('ss', $tsJson, $ip);
    $upd2->execute();
    $upd2->close();

    $userId = (int)$row['id'];
    $count  = (int)$row['count'] + 1;
} else {
    // 6) Primeiro acesso: insere registro
    $timestamps = [date('c')];
    $tsJson     = json_encode($timestamps);

    $ins = $conn->prepare("INSERT INTO visits (ip, name, count, timestamps) VALUES (?, ?, 1, ?)");
    if (!$ins) {
        http_response_code(500);
        echo json_encode(['error' => 'Prepare falhou: ' . $conn->error]);
        exit;
    }
    $ins->bind_param('sss', $ip, $name, $tsJson);
    $ins->execute();
    $userId = (int)$ins->insert_id;
    $count  = 1;
    $ins->close();
}

// 7) Resposta final
$conn->close();
echo json_encode([
    'userId'     => $userId,
    'name'       => $name ?: ($row['name'] ?? null),
    'count'      => $count,
    'timestamps' => $timestamps
]);
