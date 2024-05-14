<?php
// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Here, you would include your database connection file
include("/xampp/htdocs/STAPH/Admin/Config/Connect-Database.php");

if($_SERVER["REQUEST_METHOD"] === "POST"){
    // Get filters from POST request
        $filters = json_decode($_POST['filters'], true);

        // Construct the SQL query based on the selected filters
        $query = "SELECT * FROM company_job_posts WHERE 1";

        // Check if any job type filter is selected
        if (!empty($filters['job_type'])) {
            $jobTypes = implode("','", $filters['job_type']);
            $query .= " AND job_type IN ('$jobTypes')";
        }

        // Check if any modality filter is selected
        if (!empty($filters['modality'])) {
            $modalities = implode("','", $filters['modality']);
            $query .= " AND modality IN ('$modalities')";
        }

        // Check if any country filter is selected
        if (!empty($filters['country'])) {
            $countries = implode("','", $filters['country']);
            $query .= " AND country IN ('$countries')";
        }

        // Check if any salary filter is selected
        if (!empty($filters['salary'])) {
            $salaries = implode("','", $filters['salary']);
            $query .= " AND salary_currency IN ('$salaries')";
        }

        // Execute the query
        $result = mysqli_query($conn, $query);

        // Check if query was successful
        if ($result) {
            // Fetch and format the results
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $fileName = basename($row['company_logo']);
                $row['company_logo'] = 'http://localhost/STAPH/Job-Provider/Profile/Files/' . $fileName;
                $data[] = $row;
            }

            // Return data as JSON
            echo json_encode($data);
        } else {
            // Return an error message
            echo json_encode(array("success" => false, "message" => "Error fetching filtered jobs"));
        }
}else{
    echo json_encode(array("success" => false, "message" => "Request not found"));
}



// Close the database connection
mysqli_close($conn);
?>
