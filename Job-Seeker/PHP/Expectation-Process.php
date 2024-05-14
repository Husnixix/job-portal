<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');
    
// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

if(isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])){
    $User_ID = $_SESSION["AuthenticatedUser"]["UserID"];

    if($_SERVER["REQUEST_METHOD"] === "POST"){
        // Sanitize input data
        $workstyle = mysqli_real_escape_string($conn, $_POST["workstyle"]);
        $currentlyEmployed = mysqli_real_escape_string($conn, $_POST["currentlyEmployed"]);
        $employmentStatus = mysqli_real_escape_string($conn, $_POST["employementStatus"]);
        $joiningPeriod = mysqli_real_escape_string($conn, $_POST["joiningPeriod"]);
        $salary = mysqli_real_escape_string($conn, $_POST["salary"]);
        $currency = mysqli_real_escape_string($conn, $_POST["currency"]);
        $paidEvery = mysqli_real_escape_string($conn, $_POST["paidEvery"]);

        // Insert data into the database
        $insertData = "INSERT INTO candidates_expectation (user_id, prefered_work_style, currently_employed, employment_status, joining_period, expected_salary, expected_currency, paid_every)
        VALUES ('$User_ID', '$workstyle', '$currentlyEmployed', '$employmentStatus', '$joiningPeriod', '$salary', '$currency', '$paidEvery')";
        $result = mysqli_query($conn, $insertData);

        // Check if data insertion was successful
        if ($result){
            $_SESSION["Expectation"][$User_ID] = true;

            // Check if all forms are completed
            $profileCompleted = isset($_SESSION['About_Created'][$User_ID]) && $_SESSION['About_Created'][$User_ID] === true &&
                                isset($_SESSION['Skills_Created'][$User_ID]) && $_SESSION['Skills_Created'][$User_ID] === true &&
                                isset($_SESSION['Expectation'][$User_ID]) && $_SESSION['Expectation'][$User_ID] === true;

            // If all forms are completed, update profile completion status
            if ($profileCompleted) {
                $query = "UPDATE profile_completion SET profile_completed = 1 WHERE user_id = '$User_ID'";
                mysqli_query($conn, $query);
            }

            echo json_encode(array("success" => true, "message" => "Profile created"));
        } else {
            // Failed
            echo json_encode(array("success" => false, "message" => "Fail to insert data"));
        }
    } else {
        
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
} else {
    // User not logged in
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
