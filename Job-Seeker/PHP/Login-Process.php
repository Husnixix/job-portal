<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get email and password from the POST data
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Fetch user data from the database based on email
    $query = "SELECT * FROM candidates WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    // Check if the query was successful
    if ($result) {
        // Check if any rows were returned
        if(mysqli_num_rows($result) > 0){
            // Fetch user data
            $row = mysqli_fetch_assoc($result);
            $hashedPassword = $row["password"];

            // Verify Password
            if(password_verify($password, $hashedPassword)){
                // Store user data in session
                $_SESSION["Authenticated"] = true;
                $_SESSION["AuthenticatedUser"] = [
                    'UserID' => $row["id"],
                    'UserFirstName' => $row["first_name"],
                    'UserLastName' => $row["last_name"],
                    'UserPhoneNumber' => $row["phone_number"],
                    'UserEmail' => $row["email"],
                    'UserPassword' => $row["password"]
                ];

                $FirstName = $_SESSION["AuthenticatedUser"]["UserFirstName"];
                $User_ID = $_SESSION["AuthenticatedUser"]["UserID"];
               
                // Check if profile completion record exists
                $checkQuery = "SELECT COUNT(*) AS count FROM profile_completion WHERE user_id = '$User_ID'";
                $checkResult = mysqli_query($conn, $checkQuery);
                $count = mysqli_fetch_assoc($checkResult)['count'];

                if ($count == 0) {
                    // No record exists, insert a new record indicating incomplete profile
                    $insertQuery = "INSERT INTO profile_completion (user_id, profile_completed) VALUES ('$User_ID', 0)";
                    mysqli_query($conn, $insertQuery);
                }
                
                // Check if profile is completed
                $profileCompleted = ($count > 0) ? true : false;

                if($profileCompleted){
                    echo json_encode(array("member" => true, "message" => "Welcome Back" . " " . $FirstName));
                }else{
                    echo json_encode(array("success" => true, "message" => "Logged In"));
                    exit();
                }
            } else {
                // Password doesn't match
                echo json_encode(array("success" => false, "message" => "Incorrect Password"));
                exit();
            }
        } else {
            // Email not found
            echo json_encode(array("success" => false, "message" => "Email not found"));
            exit();
        }
    } else {
        // Query execution failed
        echo json_encode(array("success" => false, "message" => "Query Execution Failed"));
        exit();
    }
} else {
    // Invalid request method
    echo json_encode(array("success" => false, "message" => "Invalid Request Method"));
    exit();
}
?>
