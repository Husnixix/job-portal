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
            $SkillOne = $_POST["skillOne"];
            $SkillTwo = $_POST["skillTwo"];
            $SkillThree = $_POST["skillThree"];
            $SKillExperienceOne = $_POST["skillExperienceOne"];
            $SKillExperienceTwo = $_POST["skillExperienceTwo"];
            $SKillExperienceThree = $_POST["skillExperienceThree"];

            $insertData = "INSERT INTO candidates_skills (user_id, skill_one, sk_one_no_of_experience, skill_two, sk_two_no_of_experience, skill_three, sk_three_no_of_experience)
                VALUES ('$User_ID', '$SkillOne', '$SKillExperienceOne', '$SkillTwo', '$SKillExperienceTwo', '$SkillThree', '$SKillExperienceThree')";
            $result = mysqli_query($conn, $insertData);

            if ($result){
                // Success
                echo json_encode(array("success" => true, "message" => "Next add your expecations"));
                $_SESSION['Skills_Created'][$User_ID] = true;
            }else{
                // Failed
                echo json_encode(array("success" => false, "message" => "Fail to insert data"));
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