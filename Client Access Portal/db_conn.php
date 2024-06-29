<?php

$serverName = "okscouterserver.database.windows.net"; // update me
$connectionOptions = array(
     "Database" => "okscouterdb", // update me
     "Uid" => "okscouter", // update me
     "PWD" => "0Kscouter" // update me
);
//Establishes the connection
$conn = sqlsrv_connect($serverName, $connectionOptions);
if( $conn->connect_errno ) {  
     echo "Connection error: " . $conn->connect_error;
     exit();
}

?>