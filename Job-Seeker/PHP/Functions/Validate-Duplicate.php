<?php

    function checkDuplicate($con, $table, $column, $value){
        $sql = "SELECT * FROM $table WHERE $column = ?";
        $statement = mysqli_stmt_init($con);
        $prepareStatement = mysqli_stmt_prepare($statement, $sql);
        if($prepareStatement){
            mysqli_stmt_bind_param($statement, "s", $value);
            mysqli_stmt_execute($statement);
            $result = mysqli_stmt_get_result($statement);
            $rowCount = mysqli_num_rows($result);
    
            return $rowCount > 0;
        }else{
            echo "Error Duplicate Validation";
        }
    }
    
?>