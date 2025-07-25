<?php
header('Content-Type: application/json');
date_default_timezone_set('America/Sao_Paulo');

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

Dotenv::createImmutable(__DIR__ . '/../')->load();

$host   = 'localhost';
$user   = 'debugueicom_debugueicom';
$pass   = $_ENV['DB'] ?? '';
$dbname = 'debugueicom_debuguei_visits';

try {
  if (empty($pass)) {
    throw new Exception("Senha do banco não definida.");
  }

  $conn = new mysqli($host, $user, $pass, $dbname);
  if ($conn->connect_error) {
    throw new Exception("Erro na conexão: " . $conn->connect_error);
  }
  $conn->set_charset("utf8mb4");

  $ip = ($_SERVER['REMOTE_ADDR'] === '::1') ? '127.0.0.1' : $_SERVER['REMOTE_ADDR'];

  $stmt = $conn->prepare("SELECT timestamps FROM visits WHERE ip = ? ORDER BY id DESC LIMIT 1");
  if (!$stmt) {
    throw new Exception("Erro no prepare(): " . $conn->error);
  }
  $stmt->bind_param("s", $ip);
  $stmt->execute();
  $result = $stmt->get_result();
  $row    = $result->fetch_assoc();
  $stmt->close();

  $bloqueado    = false;
  $desbloqueio  = null;

  if ($row) {
    $timestamps = json_decode($row['timestamps'], true) ?: [];
    $recent     = array_filter(
      $timestamps,
      fn($ts) => strtotime($ts) > time() - 1800
    );

    if (count($recent) >= 3) {
      $bloqueado   = true;
      $ultimo      = end($recent);
      $desbloqueio = date('H:i', strtotime($ultimo) + 1800);
    }
  }

  echo json_encode([
    'bloqueado'     => $bloqueado,
    'desbloqueio_em' => $desbloqueio
  ]);

  $conn->close();
  exit;
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
  exit;
}
