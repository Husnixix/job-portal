<?php
session_start();
    header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
    header('Content-Type: application/json');
    // Connect Database
    include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

    // Import Functions
    include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Functions/Validate-Duplicate.php");

  
    if(isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])) {
        $EmployerID = $_SESSION['AuthenticatedUser']['EmployerID'];

        if($_SERVER["REQUEST_METHOD"] === "POST"){

            $PhoneNumber = $_POST["Phone"];
            $Location = $_POST["location"];
            $Bio = $_POST["bio"];
    
            if(checkDuplicate($conn, 'companies', 'company_phone_number', $PhoneNumber)){

                echo json_encode(array("success" => false, "message" => "Phone number already exists"));

            }
            else{
                
                $PhoneQuery = "UPDATE companies SET company_phone_number='$PhoneNumber' WHERE id='$EmployerID'";
                if(mysqli_query($conn, $PhoneQuery)){

                    $GeneralInfoQuery = "UPDATE company_about_me SET company_location='$Location', company_bio='$Bio' WHERE company_id='$EmployerID'";

                    if(mysqli_query($conn, $GeneralInfoQuery)){

                        echo json_encode(array("success" => true, "message" => "Updated"));

                    }else{
                        
                        echo json_encode(array("success" => false, "message" => "Fail to update General Info"));
                    }


                }else{
                    echo json_encode(array("success" => false, "message" => "Fail to update phone number"));
                }
            }
    
           
        }else{
            echo json_encode(array("success" => false, "message" => "Server request not found"));
        }


    }else{
        echo json_encode(array("success" => false, "message" => "User not logged in"));
    }
    
    

  
     
     

?>
