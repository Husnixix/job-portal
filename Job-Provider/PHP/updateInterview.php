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
        if(isset($_POST["UserID"], $_POST["JobID"], $_POST["EventID"], $_POST["StartTime"], $_POST["EndTime"])) {

            $UserID = $_POST["UserID"];
            $JobID = $_POST["JobID"];
            $EventID = $_POST["EventID"];
            $StartTime = $_POST["StartTime"];
            $EndTime = $_POST["EndTime"];
            
            $UpdateInterview = "UPDATE event_calender SET start_time = '$StartTime', end_time = '$EndTime'
             WHERE job_id = '$JobID' AND company_id = '$EmployerID'";

            if(mysqli_query($conn, $UpdateInterview)){
                $Response = "Updated";
            
                $UpdateResponse = "UPDATE reschedule SET response = '$Response'  
                WHERE job_id = '$JobID' AND company_id = '$EmployerID'";

                if(mysqli_query($conn, $UpdateResponse)){
                    echo json_encode(array("success" => true, "message" => "Interview Updated"));
                }else{
                    echo json_encode(array("success" => false, "message" => "Fail to update response"));
                }
                
            }else{
                echo json_encode(array("success" => false, "message" => "Fail to update Event Calender"));
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
