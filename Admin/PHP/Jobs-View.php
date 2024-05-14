<?php
// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

include("/xampp/htdocs/STAPH/Admin/Config/Connect-Database.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['category'])) {
        $category = $_GET['category'];

        if ($category === "Active") {
            $query = "SELECT * FROM company_job_posts WHERE post_status = 'Active'";
        } elseif ($category === "Expired") {
            $query = "SELECT * FROM company_job_posts WHERE post_status = 'Expired'";
        } else {
            $query = "SELECT * FROM company_job_posts";
        }
    } else {
        $query = "SELECT * FROM company_job_posts";
    }

    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            // Convert result to an array  
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }

   
            echo json_encode(array("success" => true, "data" => $data));
        } else {
            echo json_encode(array("success" => false, "message" => "No jobs found"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Error executing query"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Request not found"));
}
?>
