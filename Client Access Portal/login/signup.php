<?php 
    session_start();
    if ($_SESSION['username'] == "miquel" || $_SESSION['username'] == "okscouter") {
       
?>
<!DOCTYPE hmtl>
<html>
<head>
    <title>OKSCOUTER</title>
    <link rel="shortcut icon" href="../images/logo2.png" type="image/x-icon" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <link rel="stylesheet" href="signin.css">

    <script>
    console.log($("#submitButton"))
    $('#submitButton').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        //do your stuff.
        //$('#formId').submit();
    });
    </script>
</head>
<body>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vH">
        <form class="border shadow p-3 rounded" action="../php/check-signup.php" method="post" style="width: 800px;" id="signup">
            <h1 name="myForm" class="text-center p-3">REGISTRAR USUARIO</h1>
            <?php if (isset($_GET['error'])) { ?>
                <div class="alert alert-danger" role="alert">
                    <?=$_GET['error']?>
                </div>    
            <?php } ?>

            <div class="mb-3">
                <input type="text" class="form-control" name="name" id="name" placeholder="Team name" aria-label="Name" required>
            </div>
            <div class="mb-3">
                <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">@</span>
                <input type="text" class="form-control" name="username" id="username" placeholder="Username" aria-describedby="Username" required>
                </div>
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" name="password" id="password" placeholder="Password" aria-label="Password" required>
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" name="password2" id="password2" placeholder="Repeat password" aria-label="Password validation" required>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" name="image" id="image" placeholder="URL imagen" aria-label="image">
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" name="local_link" id="local_link" placeholder="Local link" aria-label="Local link">
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" name="visitant_link" id="visitant_link" placeholder="Visitant link" aria-label="Visitant link">
            </div>
            <!-- <div class="mb-3">
                <div class="g-recaptcha" data-sitekey="6Lew9BQdAAAAAIiw5SFotpk9PPG_Rshpk98OK2jf"></div>
            </div> -->
            <div class="d-grid gap-2">
                <button class="btn btn-dark" type="submit" id="submitButton" name="submitButton">Registrar</button>
                <button onclick="location.href='./home.php'" type="button" class="btn btn-outline-primary">Atras</button>
            </div>
        </form>
    </div>
</body>


</html>
<?php 
}
else {

    header("Location: ./home.php");
} ?>