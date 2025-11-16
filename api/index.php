<?php
// Allow requests from any origin (for public access)
header("Access-Control-Allow-Origin: *");
// Specify allowed methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Specify allowed headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests sent by browsers
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Set the response content type to JSON
header('Content-Type: application/json');

// A simple API endpoint to return a JSON message
if ($_SERVER['REQUEST_URI'] === '/api/') {
    $data = [
        'message' => 'Hello from the PHP backend!',
        'timestamp' => date('Y-m-d H:i:s')
    ];
    echo json_encode($data);
} else {
    // Handle 404 Not Found for other API paths
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
?>
