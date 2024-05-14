<?php
session_start();

// Allow requests from specified origin
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
// Set response content type to JSON
header('Content-Type: application/json');

// Include database connection file
include("/xampp/htdocs/STAPH/Job-Seeker/PHP/Config/Connect-Database.php");

    if(isset($_SESSION["Authenticated"]) && isset($_SESSION["AuthenticatedUser"])){
        $User_ID = $_SESSION['AuthenticatedUser']['UserID'];
        $firstName = $_SESSION["AuthenticatedUser"]["UserFirstName"];
        $lastName = $_SESSION["AuthenticatedUser"]["UserLastName"];
        $phoneNumber = $_SESSION["AuthenticatedUser"]["UserPhoneNumber"];
        $email = $_SESSION["AuthenticatedUser"]["UserEmail"];
        
    
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        
        // Query for General information
        $GeneralInformationQuery = "SELECT * FROM candidates_about_me WHERE user_id = '$User_ID'";
        $GeneralInformationResult = mysqli_query($conn, $GeneralInformationQuery);


        if(mysqli_num_rows($GeneralInformationResult) > 0){
            $GeneralInformationRow = mysqli_fetch_assoc($GeneralInformationResult);

            $Resume = $GeneralInformationRow["user_resume"];
            $Location = $GeneralInformationRow["address"];
            $UserCurrentRole = $GeneralInformationRow["user_current_role"];
            $UserRoleOpenTO = $GeneralInformationRow["user_roles_open_to"];
            $UserBio = $GeneralInformationRow["bio"];

            // Query for Skills
            $SkillsQuery = "SELECT * FROM candidates_skills WHERE user_id = '$User_ID'";
            $SkillsResult = mysqli_query($conn, $SkillsQuery);

            if(mysqli_num_rows($SkillsResult) > 0){
                $SkillRow = mysqli_fetch_assoc($SkillsResult);

                $skillOne = $SkillRow["skill_one"];
                $skillExperienceOne = $SkillRow["sk_one_no_of_experience"];
                $skillTwo = $SkillRow["skill_two"];
                $skillExperienceTwo = $SkillRow["sk_two_no_of_experience"];
                $skillThree = $SkillRow["skill_three"];
                $skillExperienceThree = $SkillRow["sk_three_no_of_experience"];
                
                 // Query for Job Preference
                $JobPreferenceQuery = "SELECT * FROM candidates_expectation WHERE user_id = '$User_ID'";
                $JobPreferenceResult = mysqli_query($conn, $JobPreferenceQuery);

                if(mysqli_num_rows($JobPreferenceResult) > 0){
                    $JobPreferenceRow = mysqli_fetch_assoc($JobPreferenceResult);
    
                    $WorkStyle = $JobPreferenceRow["prefered_work_style"];
                    $isEmployed = $JobPreferenceRow["currently_employed"];
                    $JobSearchStatus = $JobPreferenceRow["employment_status"];
                    $NoticePeriod = $JobPreferenceRow["joining_period"];
                    $ExpectedSalary = $JobPreferenceRow["expected_salary"];
                    $PaymentFrequency = $JobPreferenceRow["paid_every"];

                    // Query for phone number
                    $PhoneNumberQuery = "SELECT * FROM candidates WHERE id = '$User_ID'";
                    $PhoneNumberResult = mysqli_query($conn, $PhoneNumberQuery);

                    if(mysqli_num_rows($PhoneNumberResult) > 0){
                        $PhoneNumberRow = mysqli_fetch_assoc($PhoneNumberResult);
                        $PhoneNumber = $PhoneNumberRow["phone_number"];

                                // Prepare data array
                            $data = array(
                                'GeneralInformation' => array(
                                    'resume' => $Resume,
                                    'email' => $email,
                                    'name' => "$firstName $lastName",
                                    'phone'=> $PhoneNumber,
                                    'location' => $Location,
                                    'primaryRole' => $UserCurrentRole,
                                    'rolesOpenTo' => $UserRoleOpenTO,
                                    'bio' => $UserBio
                                ),
                                'SkillInformation' => array(
                                    'skillOne' =>  $skillOne,
                                    'skillExperienceOne'=> $skillExperienceOne,
                                    'skillTwo' => $skillTwo,
                                    'skillExperienceTwo' => $skillExperienceTwo,
                                    'skillThree' => $skillThree,
                                    'skillExperienceThree' => $skillExperienceThree
                                ),
                                'JobPreferenceInformation' => array(
                                    'workStyle' =>  $WorkStyle,
                                    'isEmployed'=> $isEmployed,
                                    'jobSearchStatus' => $JobSearchStatus,
                                    'noticePeriod' => $NoticePeriod,
                                    'expectedSalary' => $ExpectedSalary,
                                    'paymentFrequency' => $PaymentFrequency
                                )
                            );

                        // Encode and send JSON response
                        echo json_encode($data);
                        exit();


                    }else{
                        echo json_encode(array("success" => false, "message" => "Phone Number fetching failed"));
                    }   



                }else{
                    echo json_encode(array("success" => false, "message" => "Job Preference Information fetching failed"));
                }

            }else{
                echo json_encode(array("success" => false, "message" => "Skill Information fetching failed"));
            }

        }else{
            echo json_encode(array("success" => false, "message" => "General Information fetching failed"));
        }    

    }else{
        echo json_encode(array("success" => false, "message" => "Server not requested"));
    }
}else{
    echo json_encode(array("success" => false, "message" => "User not logged in"));
}


?>
