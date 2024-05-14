<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

if (isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])) {
    $User_ID = $_SESSION['AuthenticatedUser']['UserID'];

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if ($_FILES && $_FILES['userResume']) { // Check if files are being uploaded
            $resume = $_FILES["userResume"];

            $uploadDir = "/xampp/htdocs/STAPH/Job-Seeker/Profile/Resume/";
            $uniqueFilename = time() . '_' . uniqid() . '_' . $_FILES['userResume']['name'];
            $resumePath = $uploadDir . $uniqueFilename;

            if (move_uploaded_file($_FILES["userResume"]["tmp_name"], $resumePath)) {

                $UserResume = "UPDATE candidates_about_me SET user_resume='$resumePath' WHERE user_id='$User_ID'";
                if (mysqli_query($conn, $UserResume)) {
                    echo json_encode(array("success" => true, "message" => "Resume updated"));
                } else {
                    echo json_encode(array("success" => false, "message" => "Resume update failed"));
                }
            } else {
                echo json_encode(array("success" => false, "message" => "File upload failed"));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "No file uploaded"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Request not found"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
