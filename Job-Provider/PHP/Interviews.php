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

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Initialize an array to hold job applications
        $applications = array();

        // Get job applications for the employer
        $query = "SELECT * FROM event_calender WHERE company_id = '$EmployerID'";
        $result = mysqli_query($conn, $query);

        // Fetch all rows of events
        while ($row = mysqli_fetch_assoc($result)) {
            // Fetch event details for the applicant
            $start = $row["start_time"];
            $end = $row["end_time"];
            $userId = $row["user_id"];
            $location = $row["location"];
            $jobId = $row["job_id"];

            // fetch user details
            $queryUser = "SELECT * FROM candidates WHERE id = '$userId'";
            $resultUser = mysqli_query($conn, $queryUser);
            $rowUser = mysqli_fetch_assoc($resultUser);
    
            // Fetch job title for the job application    
            $queryJob = "SELECT job_title FROM company_job_posts WHERE id = '$jobId'";
            $resultJob = mysqli_query($conn, $queryJob);
            $rowJob = mysqli_fetch_assoc($resultJob);
            $jobTitle = $rowJob["job_title"];


            // Build application details array
            $application = array(
                'jobId' => $jobId,
                'jobTitle' => $jobTitle,
                'userId' => $userId,
                'username' => $rowUser["first_name"],
                'phoneNumber' => $rowUser["phone_number"],
                'email' => $rowUser["email"],
                'start' => $start,
                'end' => $end,
                'location' => $location
            );

            // Push application details array into applications array
            $applications[] = $application;
        }

        // Send applications data as JSON response
        echo json_encode(array("success" => true, "data" => $applications));
    } else {
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
