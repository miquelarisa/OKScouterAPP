<?php

session_start();
include "../db_conn.php";
//header("Content-Type: application/json");

//Get form data

$psw = $_POST['password'];
$psw2 = $_POST['password2'];
$username = $_SESSION['username'];

//Look if the email already exists in the db
$em = "SELECT * FROM dbo.users WHERE username= '$username'";
$res = sqlsrv_query($conn, $em);
$row = sqlsrv_fetch_array($res);

// Errors
if(empty($row)) {
    header("Location: ../login/updatelinks.php?error=Username don't exist");
}
else {

    if (empty($psw)) {
        header("Location: ../login/changepassword.php?error=Password required");
    }
    elseif ($psw != $psw2) {
        header("Location: ../login/changepassword.php?error=Passwords not equals");
    }
    else {
        //Hash pbkdf2
        $it = 1000;
        $salt = openssl_random_pseudo_bytes(16);
        $sal = hexdec($salt);
        $hash = hash_pbkdf2("sha256", $psw, $sal, $it, 20);
        $update = "UPDATE dbo.users SET password='$hash',salt='$sal' WHERE username='$username'";
        $result = sqlsrv_query($conn, $update);

        if ($result) {
            header("Location: ../login/home.php");
        }
        else {
            header("Location: ../login/changepassword.php?error=Something went wrong");
        }
    }
}
?>