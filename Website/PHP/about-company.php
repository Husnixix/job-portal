<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: http://127.0.0.1:3002");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['companyId'])) {
        $companyID = $data['companyId'];

        include("/xampp/htdocs/STAPH/Admin/Config/Connect-Database.php");

        // Query to fetch company name
        $queryName = "SELECT * FROM companies WHERE id = '$companyID'";
        $resultName = mysqli_query($conn, $queryName);

        if ($resultName) {
            if (mysqli_num_rows($resultName) > 0) {
                $rowName = mysqli_fetch_assoc($resultName);
                $Name = $rowName["company_name"];
            } else {
                $Name = "Unknown Company"; // Provide a default value if company name is not found
            }
        } else {
            $Name = "Unknown Company"; // Provide a default value if query fails
        }

        // Query to fetch company bio
        $query = "SELECT * FROM company_about_me WHERE company_id = '$companyID'";
        $result = mysqli_query($conn, $query);
        
        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                $data = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $fileName = basename($row['logo']); // Using 'logo' instead of 'company_logo'
                    $row['company_logo'] = 'http://localhost/STAPH/Job-Provider/Profile/Files/' . $fileName;
                    $row['company_name'] = $Name; // Add company name to the row
                    unset($row['logo']); // Remove 'logo' key from the row
                    $data[] = $row;
                }
                echo json_encode($data);
            } else {
                echo json_encode(array("error" => "No data found for the specified company ID"));
            }
        } else {
            echo json_encode(array("error" => "Error executing the query: " . mysqli_error($conn)));
        }
        
        mysqli_close($conn);
    } else {
        echo json_encode(array("error" => "Company ID not found in the request"));
    }
} else {
    echo json_encode(array("error" => "Invalid request method"));
}
?>
