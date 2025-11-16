<?php
// Set CORS headers to allow requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests for CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Set the content type to JSON
header('Content-Type: application/json');

// A simple API endpoint
if ($_SERVER['REQUEST_URI'] === '/api/') {
    $data = [
        'message' => 'Hello from the PHP backend!',
        'timestamp' => date('Y-m-d H:i:s')
    ];
    echo json_encode($data);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
?>
