<?php
session_start();
    header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
    header('Content-Type: application/json');
    // Connect Database
    include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

    // Import Functions
    include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Functions/Validate-Duplicate.php");

    
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $firstName = $_POST["firstName"];
        $lastName = $_POST["lastName"];
        $phoneNumber = $_POST["phoneNumber"];
        $email = $_POST["email"];
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

        if(checkDuplicate($conn, 'candidates', 'phone_number', $phoneNumber)){
            echo json_encode(array("success" => false, "message" => "Phone number already exists"));
        }
        else if(checkDuplicate($conn, 'candidates', 'email', $email)){
            echo json_encode(array("success" => false, "message" => "Email already exist"));
        }
        else{
            $insertData = "INSERT INTO candidates (first_name, last_name, phone_number, email, password)
            VALUES ('$firstName', '$lastName', '$phoneNumber', '$email', '$password')";
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
