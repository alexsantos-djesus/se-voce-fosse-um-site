<?php
// 1) Desativa warnings
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/php_errors.log');

// 2) Carrega autoload + .env
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

Dotenv::createImmutable(__DIR__ . '/../')->load();

// 3) CORS + JSON
header("Access-Control-Allow-Origin: https://site.debuguei.com.br/");
header("Content-Type: application/json");

// 4) Só POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

// 5) Decodifica body
$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

// 6) Valida campos mínimos
if (empty($data["name"]) || empty($data["style"]) || empty($data["function"])) {
    http_response_code(400);
    echo json_encode(["error" => "Dados insuficientes"]);
    exit;
}

// 7) Monta prompt para o ChatGPT
$system = "Você é um assistente que responde **apenas** JSON com as chaves 'domain' e 'description'.";
$user = sprintf(
    "Crie um nome de domínio e uma descrição de site com base nestes dados:\n" .
        "- Nome: %s\n- Idade: %s\n- Cidade: %s\n- Time: %s\n- Cor favorita: %s\n- Estilo: %s\n- Função: %s\n- Hobby: %s\n" .
        "Retorne somente:\n{\n  \"domain\": \"...\",\n  \"description\": \"...\"\n}",
    $data["name"],
    $data["age"] ?? "",
    $data["city"] ?? "",
    $data["team"] ?? "",
    $data["color"] ?? "",
    $data["style"],
    $data["function"],
    $data["hobby"] ?? ""
);

// 8) Chave da OpenAI
$key = $_ENV["OPENAI_API_KEY"] ?? "";
if (!$key) {
    http_response_code(500);
    echo json_encode(["error" => "Chave da OpenAI ausente"]);
    exit;
}

// 9) Monta payload
$payload = [
    "model"    => "gpt-3.5-turbo",
    "messages" => [
        ["role" => "system", "content" => $system],
        ["role" => "user",   "content" => $user]
    ],
    "temperature" => 0.8,
    "max_tokens"  => 100
];

// 10) Executa chamada
$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_HTTPHEADER     => [
        "Content-Type: application/json",
        "Authorization: Bearer {$key}"
    ],
]);
$response = curl_exec($ch);
$code     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 11) Erros
if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Erro na cURL"]);
    exit;
}
if ($code !== 200) {
    http_response_code($code);
    echo $response;
    exit;
}

// 12) Pega o JSON gerado pelo ChatGPT
$body = json_decode($response, true);
$content = $body["choices"][0]["message"]["content"] ?? "{}";

// 13) Retorna esse conteúdo (parseado caso já seja JSON)
$result = json_decode($content, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    // Se o modelo não devolver JSON válido, encapsula num fallback simples
    echo json_encode([
        "domain"      => "meusite-" . strtolower(preg_replace('/\s+/', '', $data["name"])),
        "description" => trim($content)
    ]);
} else {
    echo json_encode($result);
}
