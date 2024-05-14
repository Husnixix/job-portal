<?php
session_start();
// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');


// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

// Check if the user is logged in and session variables are set
if (isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])) {
    // Access the user's ID and Name from session
    $EmployerID = $_SESSION['AuthenticatedUser']['EmployerID'];
    $EmployerName = $_SESSION['AuthenticatedUser']['EmployerName'];
    

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Process the form data
        $companyLogo = $_FILES["companyLogo"];
        $organization = $_POST["Organization"];
        $location = $_POST["Location"];
        $bio = $_POST["companyAbout"];

        // Check for uploaded file and other form fields
        if (isset($_FILES["companyLogo"]) && isset($_POST["Organization"]) && isset($_POST["Location"]) && isset($_POST["companyAbout"])) {
            // Directory to upload files
            $uploadDir = "/xampp/htdocs/STAPH/Job-Provider/Profile/Files/";

            // Generate unique filename
            $uniqueFilename = time() . '_' . uniqid() . '_' . $_FILES['companyLogo']['name'];
            $logoPath = $uploadDir . $uniqueFilename;

            // Move uploaded file to destination
            if (move_uploaded_file($_FILES["companyLogo"]["tmp_name"], $logoPath)) {
                // Insert data into database
                $insertData = "INSERT INTO company_about_me (company_id, logo, organization, company_location, company_bio)
                               VALUES ('$EmployerID', '$logoPath', '$organization', '$location', '$bio')";
                $result = mysqli_query($conn, $insertData);

                if ($result) {
                    // Update profile completion status to 1
                    $updateQuery = "UPDATE company_profile_completion SET profile_completed = 1 WHERE company_id = '$EmployerID'";
                    $updateResult = mysqli_query($conn, $updateQuery);

                    if ($updateResult) {
                        // Success
                        $_SESSION['companyLogo'] = $logoPath;
                        echo json_encode(array("success" => true, "message" => "Profile Created"));
                    } else {
                        // Failed to update profile completion status
                        echo json_encode(array("success" => false, "message" => "Failed to update profile completion status"));
                    }
                } else {
                    // Failed to insert data
                    echo json_encode(array("success" => false, "message" => "Failed to insert data"));
                }
            } else {
                // File upload failed
                echo json_encode(array("success" => false, "message" => "File upload failed"));
            }
        } else {
            // Incomplete form data
            echo json_encode(array("success" => false, "message" => "Incomplete form data"));
        }
    } else {
        // Server not requested
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
} else {
    // User not logged in
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
