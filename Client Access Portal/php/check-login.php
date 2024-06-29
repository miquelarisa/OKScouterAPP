<?php
session_start();
include "../db_conn.php";

if (isset($_POST['username']) && isset($_POST['password'])) {

    $username = $_POST['username'];
    $password = $_POST['password'];

    //Errors
    if (empty($username)) {
        header("Location: ../login/login.php?error=Username is Required");
    }
    else if (empty($password)) {
        header("Location: ../login/login.php?error=Password is Required");
    }
    else {      
        //Search the salt of the username
        $sql = "SELECT * FROM dbo.users WHERE username='$username'";
        $result = sqlsrv_query($conn, $sql);

        if ($result) {
            //The username must be unique
            $row = sqlsrv_fetch_array($result);
           
            // Hasting the password
            $it = 1000;
            $psw = hash_pbkdf2("sha256", $password, $row['salt'], $it, 20);

            if (($psw == $row['password'])) {
                $_SESSION['username'] = $row['username'];
                $_SESSION['email'] = $row['email'];
                $_SESSION['name'] = $row['name'];
                $_SESSION['salt'] = $row['salt'];
                $_SESSION['vkey'] = $row['vkey'];

                //New db game
                $username = $row['username'];
                $actual_user = "UPDATE dbo.users SET online=0 WHERE username='$username'";
                $result = sqlsrv_query($conn, $actual_user);

                header("Location: ../login/home.php");
            }
            else {
                header("Location: ../login/login.php?error=Incorrect Username or Password");
            }
        }
        else {
            header("Location: ../login/login.php?error=Incorrect Username or Password");
        }
    }
}
else {
    header("Location: ../login/login.php?error=Enter Username and Password");
}

?>