<?php

session_start();
include "../db_conn.php";
//header("Content-Type: application/json");

//Get form data

$username = $_POST['username'];
$local = $_POST['local_link'];

//Look if the email already exists in the db
$em = "SELECT * FROM dbo.users WHERE username='$username'";
$res = sqlsrv_query($conn, $em);
$row = sqlsrv_fetch_array($res);

// Errors
if(empty($row)){
    header("Location: ../login/updatephoto.php?error=Username don't exist");
}
else{
    if (!empty($local)){
        $update = "UPDATE dbo.users SET img='$local' WHERE username='$username'";
        $result = sqlsrv_query($conn, $update);
        if ($result) {
            header("Location: ../login/home.php");
        }
        else {
            header("Location: ../login/updatephoto.php?error=There are some problem with update");
        }
    }
}
?>