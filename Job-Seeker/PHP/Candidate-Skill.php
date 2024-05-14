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
            $skOne = $_POST["skOne"];
            $skExpOne = $_POST["skExpOne"];
            $skTwo = $_POST["skTwo"];
            $skExpTwo = $_POST["skExpTwo"];
            $skThree = $_POST["skThree"];
            $skExpThree = $_POST["skExpThree"];

            echo json_encode($skExpThree);

           $updateSkills = "UPDATE candidates_skills SET skill_one='$skOne', sk_one_no_of_experience='$skExpOne',
           skill_two='$skTwo', sk_two_no_of_experience='$skExpTwo', skill_three='$skThree', sk_three_no_of_experience='$skExpThree' WHERE user_id='$User_ID'";

            if(mysqli_query($conn, $updateSkills)){
                echo json_encode(array("success" => true, "message" => "Updated")); 
            }else{
                echo json_encode(array("success" => false, "message" => "Fail to update skills")); 
            }
        }
        else{
            echo json_encode(array("success" => false, "message" => "Request not found"));
            exit();
        }
    }
    else{
        echo json_encode(array("success" => false, "message" => "User not logged in"));
        exit();
    }
?>