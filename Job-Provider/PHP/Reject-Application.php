<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

if (isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])) {
    $EmployerID = $_SESSION['AuthenticatedUser']['EmployerID'];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get the data sent in the request body
    $data = json_decode(file_get_contents('php://input'), true);

    
    if (isset($data['userId'], $data['jobId'])) {
        
        $userId = mysqli_real_escape_string($conn, $data['userId']);
        $jobId = mysqli_real_escape_string($conn, $data['jobId']);

        $status = "Rejected";
        
        $update = "UPDATE `job_applications` SET application_status ='$status' WHERE user_id = '$userId' AND job_id = '$jobId'";
        

        if (mysqli_query($conn, $update)) {

            echo json_encode(array("success" => true, "message" => "User Rejected"));

        } else {
            
            echo json_encode(array("success" => false, "message" => "Failed to Reject or Update"));
        }
    } else {
    
        echo json_encode(array("success" => false, "message" => "Required fields missing"));
    }
    } else {
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
