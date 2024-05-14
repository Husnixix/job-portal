<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: http://127.0.0.1:3002");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['jobId'])) {
        $jobId = $data['jobId'];

        include("/xampp/htdocs/STAPH/Admin/Config/Connect-Database.php");

        $query = "SELECT * FROM company_job_posts WHERE id = '$jobId'";
        $result = mysqli_query($conn, $query);

        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $fileName = basename($row['company_logo']);
                    $row['company_logo'] = 'http://localhost/STAPH/Job-Provider/Profile/Files/' . $fileName;
                    $data[] = $row;
                }
                echo json_encode($data);
            } else {
                echo json_encode(array("error" => "No data found for the specified job ID"));
            }
        } else {
            echo json_encode(array("error" => "Error executing the query: " . mysqli_error($conn)));
        }
    } else {
        echo json_encode(array("error" => "Job ID not found in the request"));
    }
} else {
    echo json_encode(array("error" => "Invalid request method"));
}
?>
