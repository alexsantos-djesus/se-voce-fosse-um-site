<?php
date_default_timezone_set('America/Sao_Paulo');
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

Dotenv::createImmutable(__DIR__ . '/../')->load();

$host   = $_ENV['DB_host'] ?? '';
$user   = $_ENV['DB_user'] ?? '';
$pass   = $_ENV['DB_pass'] ?? '';
$dbname = $_ENV['DB_dbname'] ?? '';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro na conexão: ' . $conn->connect_error]);
    exit;
}

$ipRaw  = $_SERVER['REMOTE_ADDR'] === '::1' ? '127.0.0.1' : $_SERVER['REMOTE_ADDR'];
$ip     = $conn->real_escape_string($ipRaw);
$data   = json_decode(file_get_contents('php://input'), true);
$name   = $conn->real_escape_string($data['name'] ?? '');
$now    = time();

$sql    = "SELECT * FROM visits WHERE ip = '$ip' LIMIT 1";
$res    = $conn->query($sql);
$row    = $res->fetch_assoc();

$limit = 3;
$window = 1800; // 30 min

if ($row) {
    $t = json_decode($row['timestamps'], true) ?: [];
    $recent = array_filter($t, fn($ts) => strtotime($ts) > $now - $window);

    if (count($recent) >= $limit) {
        http_response_code(429);
        echo json_encode(['error' => 'Você excedeu o limite de 3 tentativas. Tente novamente em 30 minutos.']);
        exit;
    }

    // atualiza timestamps e contador
    $t[]   = date('c');
    $tsJson = json_encode($t);
    $upd   = $conn->prepare("UPDATE visits SET name=?, count=count+1, timestamps=? WHERE ip=?");
    $upd->bind_param("sss", $name, $tsJson, $ip);
    $upd->execute();
    $userId = (int)$row['id'];
    $count = (int)$row['count'] + 1;
    $upd->close();
} else {
    // insere novo registro
    $t      = [date('c')];
    $tsJson = json_encode($t);
    $ins    = $conn->prepare("INSERT INTO visits (ip,name,count,timestamps) VALUES (?,?,1,?)");
    $ins->bind_param("sss", $ip, $name, $tsJson);
    $ins->execute();
    $userId = $ins->insert_id;
    $count  = 1;
    $ins->close();
}

$res->free();
$conn->close();

// resposta final
echo json_encode([
    'userId'     => $userId,
    'name'       => $name,
    'count'      => $count,
    'timestamps' => $t
]);
