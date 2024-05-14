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
        // Check if all required fields are present
        if(isset($_POST["ApplicantID"], $_POST["ApplicantName"], $_POST["ApplicantEmail"], $_POST["JobID"], $_POST["StartTime"], $_POST["EndTime"], $_POST["Location"])) {

            $ApplicantID = $_POST["ApplicantID"];
            $ApplicantName = $_POST["ApplicantName"];
            $ApplicantEmail = $_POST["ApplicantEmail"];
            $JobID = $_POST["JobID"];
            $StartTime = $_POST["StartTime"];
            $EndTime = $_POST["EndTime"];
            $Location = $_POST["Location"];

            $query = "INSERT INTO event_calender( job_id, company_id, user_id, candidate_name, 
                    candidate_email, start_time, end_time, location)
                    VALUES ('$JobID', '$EmployerID', '$ApplicantID', '$ApplicantName', '$ApplicantEmail', '$StartTime', '$EndTime', '$Location')";
            $result = mysqli_query($conn, $query);

            if($result){
                $status = "Accepted";        
                $updateUserStatus = "UPDATE `job_applications` SET `application_status` = '$status' WHERE job_id = '$JobID'";
                if(mysqli_query($conn, $updateUserStatus)){
                    echo json_encode(array("success" => true, "message" => "Interview Scheduled"));
                }
            }else{
                echo json_encode(array("success" => false, "message" => "Failed to insert"));
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
