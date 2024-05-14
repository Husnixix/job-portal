<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

if (isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])) {
    $EmployerID = $_SESSION['AuthenticatedUser']['EmployerID'];

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        // Query for General information
        $GeneralInformationQuery = "SELECT * FROM companies WHERE id = '$EmployerID'";
        $GeneralInformationResult = mysqli_query($conn, $GeneralInformationQuery);

        if (mysqli_num_rows($GeneralInformationResult) > 0) {
            $GeneralInformationRow = mysqli_fetch_assoc($GeneralInformationResult);

            $Name = $GeneralInformationRow["company_name"];
            $PhoneNumber = $GeneralInformationRow["company_phone_number"];
            $Email = $GeneralInformationRow["company_email"];

            // Query for Skills
            $AboutQuery = "SELECT * FROM company_about_me WHERE company_id = '$EmployerID'";
            $AboutQueryResult = mysqli_query($conn, $AboutQuery);

            if (mysqli_num_rows($AboutQueryResult) > 0) {
                $AboutQueryRow = mysqli_fetch_assoc($AboutQueryResult);

                $Location = $AboutQueryRow["company_location"];
                $Organization =  $AboutQueryRow["organization"];
                $Bio = $AboutQueryRow["company_bio"];

                // Prepare data array
                $data = array(
                    'GeneralInformation' => array(
                        'name' => $Name,
                        'phone' => $PhoneNumber,
                        'email' => $Email,
                        'location' => $Location,
                        'organization' => $Organization,
                        'bio' => $Bio
                    )
                );

                // Encode and send JSON response
                echo json_encode($data);
                exit();
            } else {
                echo json_encode(array("success" => false, "message" => "About Information fetching failed"));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "General Information fetching failed"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Invalid request method"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
