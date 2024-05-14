<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Functions/Validate-Duplicate.php");

if (isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])) {
    $User_ID = $_SESSION['AuthenticatedUser']['UserID'];

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $Query = "SELECT * FROM job_applications WHERE user_id = '$User_ID'";
        $Result = mysqli_query($conn, $Query);

        $applicationData = array(); // Array to hold application data

        while ($Details = mysqli_fetch_assoc($Result)) {
            $JobId = $Details["job_id"];
            $Status = $Details["application_status"];

            $JobQuery = "SELECT * FROM company_job_posts WHERE id = '$JobId'";
            $JobQueryResult = mysqli_query($conn, $JobQuery);
            $JobQueryRow = mysqli_fetch_assoc($JobQueryResult);

            $CompanyName = $JobQueryRow["employer"];
            $JobTitle = $JobQueryRow["job_title"];

            // Push data to the applicationData array
            $applicationData[] = array(
                'jobId' => $JobId,
                'companyName' => $CompanyName,
                'jobTitle' => $JobTitle,
                'status' => $Status
            );
        }

        // Send application data as JSON response
        echo json_encode(array("success" => true, "data" => $applicationData));
    } else {
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
