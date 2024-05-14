<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

    if(isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])){
        $User_ID = $_SESSION['AuthenticatedUser']['UserID'];
        
    
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        
        $resume = $_FILES["resume"];
        $address = $_POST["address"];
        $currentRole = $_POST["currentRole"];
        $rolesOpenTo = $_POST["rolesOpenTo"];
        $aboutMe = $_POST["aboutMe"];

        $uploadDir = "/xampp/htdocs/STAPH/Job-Seeker/Profile/Resume/";
        $uniqueFilename = time() . '_' . uniqid() . '_' . $_FILES['resume']['name'];
        $resumePath = $uploadDir . $uniqueFilename;

        if(move_uploaded_file($_FILES["resume"]["tmp_name"], $resumePath)){
            $insertData = "INSERT INTO candidates_about_me (user_id, user_resume, address, user_current_role, user_roles_open_to, bio)
            VALUES ('$User_ID', '$resumePath', '$address', '$currentRole', '$rolesOpenTo', '$aboutMe')";
            $result = mysqli_query($conn, $insertData);

            if ($result){
                // Success
                echo json_encode(array("success" => true, "message" => "Next add your skils"));
                $_SESSION['About_Created'][$User_ID]  = true;
            }else{
                // Failed
                echo json_encode(array("success" => false, "message" => "Fail to insert data"));
            }
        }else{
            echo json_encode(array("success" => false, "message" => "File upload failed"));
        }

    }else{
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
}else{
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}


?>
