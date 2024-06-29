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
        <form class="border shadow p-3 rounded" action="../php/check-updatephoto.php" method="post" style="width: 800px;" id="signup">
            <h1 name="myForm" class="text-center p-3">ACTUALIZAR LINKS</h1>
            <?php if (isset($_GET['error'])) { ?>
                <div class="alert alert-danger" role="alert">
                    <?=$_GET['error']?>
                </div>    
            <?php } ?>
            <div class="mb-3">
                <input type="text" class="form-control" name="username" id="username" placeholder="username" aria-label="username" required>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" name="local_link" id="local_link" placeholder="URL Photo" aria-label="Local link">
            </div>

            <div class="d-grid gap-2">
                <button class="btn btn-dark" type="submit" id="submitButton" name="submitButton">Actualizar</button>
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