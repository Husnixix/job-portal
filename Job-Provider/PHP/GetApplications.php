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
        // Initialize an array to hold job applications
        $applications = array();

        // Check if category parameter is provided
        if (isset($_GET['category'])) {
            $category = $_GET['category'];
            // Get job applications for the employer filtered by category
            $query = "SELECT ja.*, cjp.job_title, cjp.job_primary_role, ca.first_name, ca.phone_number, ca.email
                      FROM job_applications AS ja
                      JOIN candidates AS ca ON ja.user_id = ca.id
                      JOIN company_job_posts AS cjp ON ja.job_id = cjp.id
                      WHERE cjp.job_primary_role = '$category' AND cjp.company_id = '$EmployerID'";
        } else {
            // Get all job applications for the employer
            $query = "SELECT ja.*, cjp.job_title, cjp.job_primary_role, ca.first_name, ca.phone_number, ca.email
                      FROM job_applications AS ja
                      JOIN candidates AS ca ON ja.user_id = ca.id
                      JOIN company_job_posts AS cjp ON ja.job_id = cjp.id
                      WHERE cjp.company_id = '$EmployerID'";
        }

        $result = mysqli_query($conn, $query);

        if ($result) {
            // Fetch all rows of job applications
            while ($row = mysqli_fetch_assoc($result)) {
                // Build application details array
                $application = array(
                    'jobId' => $row["job_id"],
                    'jobTitle' => $row["job_title"],
                    'jobPrimaryRole' => isset($row["job_primary_role"]) ? $row["job_primary_role"] : null,
                    'userId' => $row["user_id"],
                    'resume' => $row["applicant_resume"],
                    'username' => $row["first_name"],
                    'phoneNumber' => $row["phone_number"],
                    'email' => $row["email"]
                );

                // Push application details array into applications array
                $applications[] = $application;
            }

            // Send applications data as JSON response
            echo json_encode(array("success" => true, "data" => $applications));
        } else {
            echo json_encode(array("success" => false, "message" => "Error executing query"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}
?>
