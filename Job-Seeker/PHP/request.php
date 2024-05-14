<?php
session_start();

// Set response content type to JSON
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");

include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Functions/Validate-Duplicate.php");

if(isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])){
    $User_ID = $_SESSION['AuthenticatedUser']['UserID'];

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        // Get id from post
        $postData = json_decode(file_get_contents("php://input"), true);
        if (isset($postData['job_id'])) {
        
            $job_id = $postData['job_id'];

            // Check if the user has already requested this job
            $query = "SELECT * FROM reschedule WHERE job_id = $job_id AND user_id = $User_ID";
            $result = mysqli_query($conn, $query);

            if(mysqli_num_rows($result) > 0){
                // User has already requested this job
                echo json_encode(array("success" => false, "message" => "You have already requested this job."));
            } else {
                // User hasn't requested this job yet, proceed to insert the request
                $query = "SELECT * FROM event_calender WHERE job_id = $job_id AND user_id = $User_ID";
                $result = mysqli_query($conn, $query);

                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_assoc($result);
                    $companyID = $row["company_id"];

                    $request = "Requested";
                    $response = "Pending";

                    $insert = "INSERT INTO reschedule (job_id, user_id, company_id, request, response)
                            VALUES('$job_id', '$User_ID', '$companyID', '$request', '$response')";
                    $execute = mysqli_query($conn, $insert);

                    if($execute){
                        echo json_encode(array("success" => true, "message" => "Requested, check your mail for the response"));
                    }else{
                        echo json_encode(array("success" => false, "message" => "Failed to insert data"));
                    }
                        
                }else{
                    echo json_encode(array("success" => false, "message" => "Failed to retrieve event data"));  
                }
            }
        } else {
            echo json_encode(array("success" => false, "message" => "Job ID not found"));
        }

    } else {
        echo json_encode(array("success" => false, "message" => "Request not found"));
    }

} else {
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
