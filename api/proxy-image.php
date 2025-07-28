<?php
// api/proxy-image.php

// 1) Permitir CORS
header('Access-Control-Allow-Origin: *');

// 2) Recebe e valida a URL
$url = filter_input(INPUT_GET, 'url', FILTER_VALIDATE_URL);
if (!$url) {
    http_response_code(400);
    exit('URL inválida');
}

// 3) Busca o binário
$img = @file_get_contents($url);
if ($img === false) {
    http_response_code(404);
    exit('Não encontrou a imagem');
}

// 4) Repasse o Content-Type original
$h = @get_headers($url, 1);
if (isset($h['Content-Type'])) {
    $ct = is_array($h['Content-Type']) ? $h['Content-Type'][0] : $h['Content-Type'];
    header("Content-Type: $ct");
} else {
    header('Content-Type: application/octet-stream');
}

// 5) Envia só o binário da imagem
echo $img;
