<?php

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

include("/xampp/htdocs/STAPH/Admin/Config/Connect-Database.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Receive JSON data sent from JavaScript
    $jsonData = file_get_contents('php://input');

    // Decode JSON data into PHP associative array
    $data = json_decode($jsonData, true);

    // Check if decoding was successful
    if ($data !== null) {
        // Access the 'id' property from the decoded data
        $UserID = $data['id'];

        // Delete related records from other tables first
        $tables = array("candidates_about_me", "candidates_skills", "candidates_expectations", "profile_completion", "job_applications", "event_calender");

        foreach ($tables as $table) {
            // Check if the table has foreign key constraint
            $foreign_key_query = "SELECT COUNT(*) AS count FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = 'staph_management' AND TABLE_NAME = '$table' AND COLUMN_NAME = 'user_id'";
            $foreign_key_result = mysqli_query($conn, $foreign_key_query);
            $row = mysqli_fetch_assoc($foreign_key_result);
            $count = $row['count'];

            if ($count > 0) {
                // Delete related records
                $delete_query = "DELETE FROM $table WHERE user_id = '$UserID'";
                mysqli_query($conn, $delete_query);
            }
        }

        // Now delete user from candidates table
        $delete_candidate_query = "DELETE FROM candidates WHERE id = '$UserID'";
        if (mysqli_query($conn, $delete_candidate_query)) {
            echo json_encode(array("success" => true, "message" => "Candidate Deleted"));
        } else {
            echo json_encode(array("success" => false, "message" => "Failed to delete"));
        }
    } else {
        // Handling error if JSON decoding fails
        echo json_encode(array("success" => false, "message" => "Invalid JSON data"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Request not found"));
}

?>
