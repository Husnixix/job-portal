<?php
// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

include("/xampp/htdocs/STAPH/Admin/Config/Connect-Database.php");

if($_SERVER["REQUEST_METHOD"] === "POST"){
    // Get the search parameters
    $title = $_POST["title"];
    $location = $_POST["location"];

    // Prepare the SQL statement using prepared statements to prevent SQL injection
    $query = "SELECT * FROM company_job_posts WHERE job_title LIKE ? AND job_location LIKE ?";
    $stmt = mysqli_prepare($conn, $query);

    // Bind parameters to the prepared statement
    mysqli_stmt_bind_param($stmt, "ss", $title, $location);

    // Execute the prepared statement
    mysqli_stmt_execute($stmt);

    // Get the result
    $result = mysqli_stmt_get_result($stmt);
    
    if(mysqli_num_rows($result) > 0){
        // Convert result to an array  
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $fileName = basename($row['company_logo']);
            $row['company_logo'] = 'http://localhost/STAPH/Job-Provider/Profile/Files/' . $fileName;
            // Add the job details to the data array
            $data[] = $row;
        }
        
        // Return data as JSON with success flag
        echo json_encode(array("success" => true, "data" => $data));
    }
    else{
        // Return JSON with success flag indicating no data found
        echo json_encode(array("success" => false, "message" => "No data found"));
    }

}else{
    // Return JSON with success flag indicating invalid request method
    echo json_encode(array("success" => false, "message" => "Request not found"));
}

// Close the prepared statement and database connection
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
