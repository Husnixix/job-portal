<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

if(isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])){
    
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        session_destroy();
        echo json_encode(array("success" => true, "message" => "Your session has ended"));
    }else{
        echo json_encode(array("success" => false, "message" => "Request not found"));
    }
    
} else {
    // If the user is not logged in, return an error message
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}

?>
