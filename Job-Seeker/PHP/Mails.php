<?php   
session_start();

// Set response content type to JSON
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");

include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");
    
if(isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])){
    $User_ID = $_SESSION['AuthenticatedUser']['UserID'];
    $UserName = $_SESSION['AuthenticatedUser']['UserFirstName'];

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Initialize an array to hold job applications
        $applications = array();

        $query = "SELECT * FROM reschedule WHERE user_id = '$User_ID'";
        $result = mysqli_query($conn, $query);

        // Fetch all rows of reschedule requests
        while ($row = mysqli_fetch_assoc($result)) {
            $rescheduleID = $row["id"];
            $jobID = $row["job_id"];
            $companyID = $row["company_id"];
            $Request = $row["request"];
            $Response = $row["response"];


            // Fetch job details
            $getJobQuery = "SELECT * FROM company_job_posts WHERE id = '$jobID'";
            $jobResult = mysqli_query($conn, $getJobQuery);
            $jobRow = mysqli_fetch_assoc($jobResult);
            $jobTitle = $jobRow["job_title"];

            // Fetch job details
            $getCompanyQuery = "SELECT * FROM companies WHERE id = '$companyID'";
            $companyResult = mysqli_query($conn, $getCompanyQuery);
            $companyRow = mysqli_fetch_assoc($companyResult);
            $companyName = $companyRow["company_name"];

            // Build application details array
            $application = array(
                'rescheduleID' => $rescheduleID,
                'jobID' => $jobID,
                'jobTitle' => $jobTitle,
                'userID' => $User_ID,
                'username' => $UserName,
                'companyname' => $companyName

            );

            // Push application details array into applications array
            $applications[] = $application;
        }

        // Send applications data as JSON response
        echo json_encode(array("success" => true, "data" => $applications));
    } else {
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
}else{
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}

?>
