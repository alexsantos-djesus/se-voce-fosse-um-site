<?php
header('Content-Type: application/json');
date_default_timezone_set('America/Sao_Paulo');

// Valida entrada
$input = json_decode(file_get_contents('php://input'), true);
$prompt = $input['prompt'] ?? null;

if (!$prompt) {
    http_response_code(400);
    echo json_encode(['error' => 'Prompt inválido.']);
    exit;
}

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

Dotenv::createImmutable(__DIR__ . '/../')->load();

$apiKey = $_ENV['OPENAI_API_KEY'];

try {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/images/generations');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);

    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'prompt' => $prompt,
        'n' => 1,
        'size' => '1024x1024'
    ]));

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey"
    ]);

    $res = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    if ($httpCode !== 200) {
        throw new Exception("Erro na API da OpenAI: $res");
    }

    echo $res;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
