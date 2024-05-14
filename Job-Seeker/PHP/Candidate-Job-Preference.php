<?php
session_start();
    header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
    header('Content-Type: application/json');
    // Connect Database
    include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

    // Import Functions
    include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Functions/Validate-Duplicate.php");

    if(isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])){
        $User_ID = $_SESSION['AuthenticatedUser']['UserID'];

        if($_SERVER["REQUEST_METHOD"] === "POST"){

            $WorkStyle = $_POST["WorkStyle"];
            $IsEmployed = $_POST["IsEmployed"];
            $JobSearch = $_POST["JobSearch"];
            $NoticePeriod = $_POST["NoticePeriod"];

            $JobPreferenceQuery = "UPDATE candidates_expectation SET prefered_work_style='$WorkStyle', currently_employed='$IsEmployed',
            employment_status='$JobSearch', joining_period='$NoticePeriod' WHERE user_id='$User_ID'";
  
                if(mysqli_query($conn, $JobPreferenceQuery)){

                    echo json_encode(array("success" => true, "message" => "Updated"));
                    
                }else{
                    echo json_encode(array("success" => false, "message" => "Fail to update Job Preference"));
                }
            
    
           
        }else{
            echo json_encode(array("success" => false, "message" => "Server request not found"));
        }


    }else{
        echo json_encode(array("success" => false, "message" => "User not logged in"));
    }
    
    

  
     
     

?>
