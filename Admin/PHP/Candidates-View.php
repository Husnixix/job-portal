<?php

    // Allow requests from specified origin
    header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
    // Set response content type to JSON
    header('Content-Type: application/json');

    include("/xampp/htdocs/STAPH/Admin/Config/Connect-Database.php");

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        
        $query = "SELECT * FROM candidates";
        $result = mysqli_query($conn, $query);

        if(mysqli_num_rows($result) > 0){

            // Convert result to an array  
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            
            // Return data as JSON
            echo json_encode($data);
        }
        else{
            echo "No data found";
        }
        

    }else{
        echo "Request not found";
    }

?>