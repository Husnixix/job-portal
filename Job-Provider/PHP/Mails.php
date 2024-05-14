<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

if (isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])) {
    $employerID = $_SESSION['AuthenticatedUser']['EmployerID'];

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Initialize an array to hold job applications
        $applications = array();

        $query = "SELECT * FROM reschedule WHERE company_id = '$employerID'";
        $result = mysqli_query($conn, $query);

        // Fetch all rows of reschedule requests
        while ($row = mysqli_fetch_assoc($result)) {
            $eventID = $row["id"];
            $jobID = $row["job_id"];
            $userID = $row["user_id"];

            // Fetch user details
            $getUserQuery = "SELECT * FROM candidates WHERE id = '$userID'";
            $userResult = mysqli_query($conn, $getUserQuery);
            $userRow = mysqli_fetch_assoc($userResult);
            $username = $userRow["first_name"];

            // Fetch job details
            $getJobQuery = "SELECT * FROM company_job_posts WHERE id = '$jobID'";
            $jobResult = mysqli_query($conn, $getJobQuery);
            $jobRow = mysqli_fetch_assoc($jobResult);
            $jobTitle = $jobRow["job_title"];

            // Build application details array
            $application = array(
                'eventID' => $eventID,
                'jobID' => $jobID,
                'jobTitle' => $jobTitle,
                'userID' => $userID,
                'username' => $username,
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
