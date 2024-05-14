<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

if (isset($_SESSION["Authenticated"]) === true && isset($_SESSION["AuthenticatedUser"])) {
    $User_ID = $_SESSION['AuthenticatedUser']['UserID'];
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        // Initialize the data array
        $data = array();
    
        // Retrieve event calendar data
        $eventQuery = "SELECT * FROM event_calender WHERE user_id = $User_ID";
        $eventResult = mysqli_query($conn, $eventQuery);
        if ($eventResult && mysqli_num_rows($eventResult) > 0) {
            $eventData = mysqli_fetch_assoc($eventResult);
            $jobId = $eventData["job_id"];
            $companyId = $eventData["company_id"];
            $start = $eventData["start_time"];
            $end = $eventData["end_time"];
            $location = $eventData["location"];
    
            // Retrieve job title and company name from company_job_posts based on job_id and company_id
            $jobQuery = "SELECT job_title, employer FROM company_job_posts WHERE id = $jobId AND company_id = $companyId";
            $jobResult = mysqli_query($conn, $jobQuery);
            if ($jobResult && mysqli_num_rows($jobResult) > 0) {
                $jobData = mysqli_fetch_assoc($jobResult);
    
                // Assign relevant data to the data array
                $data['job_id'] = $jobId;
                $data['job_title'] = $jobData['job_title'];
                $data['company_name'] = $jobData['employer'];
                $data['start_time'] = $start;
                $data['end_time'] = $end;
                $data['location'] = $location;
            }
        }
    
        // Return data as JSON
        echo json_encode(array($data));
    
    } else {
        echo json_encode(array("success" => false, "message" => "Invalid request method"));
    }
    
} else {
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
