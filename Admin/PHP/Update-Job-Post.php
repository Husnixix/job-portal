<?php

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

include("/xampp/htdocs/STAPH/Admin/Config/Connect-Database.php");

// Update Job Post Status 
$JobStatus = "Expired";
$Query = "UPDATE company_job_posts SET post_status = '$JobStatus' WHERE closing_date < CURDATE()";

if($Query){
    echo "Updated";
}


?>
