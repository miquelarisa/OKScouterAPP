<?php

session_start();
include "../db_conn.php";
//header("Content-Type: application/json");

//Get form data

$username = $_POST['username'];
$local = $_POST['local_link'];
$visitant = $_POST['visitant_link'];

//Look if the email already exists in the db
$em = "SELECT * FROM dbo.users WHERE username='$username'";
$res = sqlsrv_query($conn, $em);
$row = sqlsrv_fetch_array($res);

// Errors
if(empty($row)){
    header("Location: ../login/updatelinks.php?error=Username don't exist");
}
else{
    if (!empty($local)){
        $update = "UPDATE dbo.users SET local_link='$local' WHERE username='$username'";
        $result = sqlsrv_query($conn, $update);
        if ($result) {
            header("Location: ../login/home.php");
        }
        else {
            header("Location: ../login/updatelinks.php?error=There are some problem with update");
        }
    }

    $update2 = "UPDATE dbo.users SET visitant_link='$visitant' WHERE username='$username'";
    $result2 = sqlsrv_query($conn, $update2);

    if ($result2) {
        header("Location: ../login/home.php");
    }
    else {
        header("Location: ../login/updatelinks.php?error=There are some problem with update");
    }

    /*if (!empty($local)){
        $update = "UPDATE okscouter.users SET local_link='$local' WHERE username='$username'";
        $result = sqlsrv_query($conn, $update);

        if ($result) {
            header("Location: ../login/thankyou.php");
        }
        else {
            header("Location: ../login/updatelinks.php?error=There are some problem with update");
        }
    }
    if (!empty($visitant)){
        $update = "UPDATE okscouter.users SET visitant_link='$visitant' WHERE username='$username'";
        $result = sqlsrv_query($conn, $update);

        if ($result) {
            header("Location: ../login/thankyou.php");
        }
        else {
            header("Location: ../login/updatelinks.php?error=There are some problem with update");
        }
    }    */
}
?>