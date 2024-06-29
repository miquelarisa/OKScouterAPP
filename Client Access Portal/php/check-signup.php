<?php

session_start();
include "../db_conn.php";
//header("Content-Type: application/json");

//Get form data
$name = $_POST['name'];
$username = $_POST['username'];
$password = $_POST['password'];
$password2 = $_POST['password2'];
$img = $POST['image'];
$local = $_POST['local_link'];
$visitant = $_POST['visitant_link'];

//Look if the username already exists in the db
$em = "SELECT * FROM dbo.users WHERE username='$username'";
$res = sqlsrv_query($conn, $em);
$row = sqlsrv_fetch_array($res);

// Errors
if(empty($name)){
    header("Location: ../login/signup.php?error=Your first name must be at least 1 characters");
}
elseif(strlen($password) < 8){
    header("Location: ../login/signup.php?error=Your password must be at least 8 characters");
}
elseif($password2 != $password){
    header("Location: ../login/signup.php?error=Your passwords do not match");
}
elseif(!empty($row)){
    header("Location: ../login/signup.php?error=Username already exist");
}
else{

    $vkey = md5(time().$username);
    
    //Hash pbkdf2
    $it = 1000;
    $salt = openssl_random_pseudo_bytes(16);
    $sal = hexdec($salt);
    $hash = hash_pbkdf2("sha256", $password, $sal, $it, 20);

    //Insert user into database
    $sql = "INSERT INTO dbo.users (username, name, password, salt, vkey, local_link, visitant_link, img) VALUES ('$username', '$name', '$hash', '$sal', '$vkey', '$local', '$visitant', '$img')";
    $params = array($username, $name, $hash, $sal, $vkey, $local, $visitant);
    $stmt = sqlsrv_query($conn, $sql);
    if($stmt) {
        header("Location: ../login/home.php");
    }
    else {
        header("Location: ../login/signup.php?error=There are some problem with insert");
    }
    
}
?>