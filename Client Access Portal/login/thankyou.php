<?php 
    session_start();
    if (!isset($_SESSION['username'])) {

?>
<!DOCTYPE hmtl>
<html>
<head>
    <title>OKSCOUTER</title>
    <link rel="shortcut icon" href="../images/logo2.png" type="image/x-icon" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script></head>
    <script src="https://kit.fontawesome.com/f9b829e40d.js" crossorigin="anonymous"></script>
<body>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vH">
        <div class="card border shadow " style="width: 48rem; text-align: center">
            <h1 class="display-4">Thank you for registering!</h1>
            <br>
            <!-- <p class="lead">We have send a verification email to the address provided</p>
            <p><i class="fas fa-envelope fa-5x" style="text-align: center"></i></p> -->
            <button onclick="location.href='./login.php'" type="button" class="btn btn-outline-primary">Back</button>
        </div>
        
    </div>
</body>
</html>
<?php 
}
else {

    header("Location: ./login.php");
} ?>