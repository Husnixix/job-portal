<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: http://127.0.0.1:3002");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    echo json_encode(array("success" => true, "message" => "Not logged in"));
} 
else {
    echo json_encode(array("success" => false, "message" => "Request not found"));
}
?>
