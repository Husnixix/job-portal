<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Functions/Validate-Duplicate.php");

    if(isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])){
        $User_ID = $_SESSION['AuthenticatedUser']['UserID'];
        $User_Email = $_SESSION["AuthenticatedUser"]["UserEmail"];
        $User_Name = $_SESSION["AuthenticatedUser"]["UserFirstName"];
    
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        
       
        $jobId = $_POST['jobId'];
        
        // Get user resume 
        $UserQuery = "SELECT * FROM candidates_about_me WHERE user_id = '$User_ID'";
        $UserResult = mysqli_query($conn, $UserQuery);
        $UserRow = mysqli_fetch_assoc($UserResult);

        $ResumePath = $UserRow["user_resume"];

        // Get company ID
        $CompanyQuery = "SELECT * FROM company_job_posts WHERE id = '$jobId'";
        $CompanyResult = mysqli_query($conn, $CompanyQuery);
        $CompanyRow = mysqli_fetch_assoc($CompanyResult);

        $CompanyID = $CompanyRow["company_id"];
        $CompanyName = $CompanyRow["employer"];
        $JobTitle = $CompanyRow["job_title"];

        $Status = "Pending";


        // Query to check if user has already applied
        $QueryCheck = "SELECT * FROM job_applications WHERE job_id = $jobId AND user_id = $User_ID";
        $ExecuteCheck = mysqli_query($conn, $QueryCheck);   

        if(mysqli_num_rows($ExecuteCheck) > 0){

            echo json_encode(array("success" => false, "message" => "Already Applied"));

        }else{

            $Query = "INSERT INTO `job_applications`(`job_id`, `company_id`, `user_id`, `applicant_resume`, `application_status`)
            VALUES('$jobId', '$CompanyID', '$User_ID', '$ResumePath',  '$Status')";
            $execute = mysqli_query($conn, $Query);

            if($execute){

                $additionalData = array(
                    "job_id" => $jobId,
                    "company_id" => $CompanyID,
                    "company_name" => $CompanyName,
                    "job_title" => $JobTitle,
                    "UserEmail" => $User_Email,
                    "UserID" => $User_ID,
                    "UserFirstName" => $User_Name
                );

                echo json_encode(array("success" => true, "data" => $additionalData));
            }else{
                echo json_encode(array("success" => false, "message" => "Fail to apply"));
            }
        }

    }else{
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
}else{
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}


?>
