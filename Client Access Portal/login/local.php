<?php 
    session_start();
    include "../db_conn.php";
    if (isset($_SESSION['username'])) {
      
?>

<!DOCTYPE hmtl>
<html>
<head>
    <title>OKSCOUTER</title>
    <link rel="shortcut icon" href="../images/logo2.png" type="image/x-icon" />
<body>

<?php 
    $username = $_SESSION['username'];
    $em = "SELECT local_link FROM dbo.users WHERE username='$username'";
    $res = sqlsrv_query($conn, $em);
    $link = sqlsrv_fetch_array($res);
?>


<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>
<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>
<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>
<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>
<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>
<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>
<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
<iframe width=100% height=100% src="<?php echo $link[0]?>" id="myframe" frameborder="0" allowFullScreen="true"></iframe>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>
<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>
<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>
<div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
<div>
<div>

</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
<div>
    
</div>
</div>
</div>


</body>
</html>
<?php 
exit();
}
else {
    header("Location: ./login.php");
}

?>