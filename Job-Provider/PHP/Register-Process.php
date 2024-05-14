<?php
session_start();
    header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
    header('Content-Type: application/json');
    // Connect Database
    include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

    // Import Functions
    include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Functions/Validate-Duplicate.php");

    
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $Company_Name = $_POST["organizationName"];
        $Company_Contact = $_POST["phoneNumber"];
        $Company_Email = $_POST["email"];
        $Company_Password = password_hash($_POST["password"], PASSWORD_DEFAULT);

        if(checkDuplicate($conn, 'companies', 'company_name', $Company_Name)){
            echo json_encode(array("success" => false, "message" => "Name has already taken"));
        }
        else if(checkDuplicate($conn, 'companies', 'company_phone_number', $Company_Contact)){
            echo json_encode(array("success" => false, "message" => "Phone number already exist"));
        }
        else if(checkDuplicate($conn, 'companies', 'company_email', $Company_Email)){
            echo json_encode(array("success" => false, "message" => "Email already exist"));
        }
        else{
            $insertData = "INSERT INTO companies (company_name, company_phone_number, company_email, company_password)
            VALUES ('$Company_Name', '$Company_Contact', '$Company_Email', '$Company_Password')";
            $result = mysqli_query($conn, $insertData);
            
            if($result){
                echo json_encode(array("success" => true, "message" => "Registered"));
            }else{
                echo json_encode(array("success" => false, "message" => "Fail to insert data"));
            }
        }

    }
 
    else{
        echo json_encode(array("success" => false, "message" => "Server request not found"));
    }
     

?>
