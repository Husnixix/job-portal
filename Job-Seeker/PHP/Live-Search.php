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
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $input = $_POST['input'];
        $JobStatus = "Active";
        $Query = "SELECT * FROM company_job_posts WHERE post_status = '$JobStatus' AND job_title LIKE '%$input%'";
        $Result = mysqli_query($conn, $Query);
        if(mysqli_num_rows($Result) > 0){

            // Convert result to an array  
            $data = array();
            while ($row = mysqli_fetch_assoc($Result)) {
                $fileName = basename($row['company_logo']);
                $row['company_logo'] = 'http://localhost/STAPH/Job-Provider/Profile/Files/' . $fileName;
                // Add the job details to the data array
                $data[] = $row;
            }
            
            // Return data as JSON
            echo json_encode(array('success' => true, 'message' => $data));

        }else{
            echo json_encode(array("success" => false, "message" => "Data not found"));
        }
        
       
    
    } else {
        echo json_encode(array("success" => false, "message" => "Invalid request method"));
    }
    
} else {
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
