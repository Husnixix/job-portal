<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "staph_management";
    
    $conn = new mysqli($servername, $username, $password, $databaseName);
    
    // connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
?>