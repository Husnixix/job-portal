<?php
session_start();
// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');


// Include database connection file
include("/xampp/htdocs/STAPH/Job-Provider/PHP/Config/Connect-Database.php");

// Check if the user is logged in and session variables are set
if (isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])) {
    // Access the user's ID and Name from session
    $EmployerID = $_SESSION['AuthenticatedUser']['EmployerID'];
    $EmployerName = $_SESSION['AuthenticatedUser']['EmployerName'];
    
    
    $Query = "SELECT * FROM company_about_me WHERE company_id = '$EmployerID'";
    $result = mysqli_query($conn, $Query);
    if(mysqli_num_rows($result) > 0){
        $resultRow = mysqli_fetch_assoc($result);
        $Logo = $resultRow["logo"];
    }
    
    
    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Process the form data
        $JobTitle = $_POST["jobTitle"];
        $JobPrimaryRole = $_POST["primaryRole"];
        $JobModality = $_POST["modality"];
        $JobType = $_POST["jobType"];
        $JobCountry = $_POST["country"];
        $JobSalary = $_POST["salary"];
        $JobCurrency = $_POST["Currency"];
        $JobLocation = $_POST["location"];
        $JobRequirements = $_POST["Requirements"];
        $JobResponsibilities = $_POST["Responsibilities"];
        $JobClosingDate = $_POST["closing"];
        $PostStatus = "Active";

        $insertData = "INSERT INTO company_job_posts (company_id, employer, company_logo, job_title, job_primary_role, job_modality, job_type, job_country, job_salary, job_currency, job_location, job_requirments, job_responsibilites, closing_date, post_status) 
        VALUES ('$EmployerID','$EmployerName', '$Logo', '$JobTitle','$JobPrimaryRole','$JobModality','$JobType','$JobCountry','$JobSalary','$JobCurrency','$JobLocation','$JobRequirements','$JobResponsibilities', '$JobClosingDate', '$PostStatus')";

        $result = mysqli_query($conn, $insertData);

        if($result){
            echo json_encode(array("success" => true, "message" => "Job Posted"));
        }else{
            echo json_encode(array("success" => false, "message" => "Fail to insert data"));
        }
    } else {
        // Server not requested
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
} else {
    // User not logged in
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
