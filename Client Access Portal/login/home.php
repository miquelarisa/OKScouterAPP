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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script></head>
    <script>
    function showmodal() {
        console.log("show modal");
        $("#exampleModal").modal("show");
    }
    </script>

<body>
    <?php 
        $username = $_SESSION['username'];
        $emloc = "SELECT local_videos FROM dbo.users WHERE username='$username'";
        $resloc = sqlsrv_query($conn, $emloc);
        $local_videos = sqlsrv_fetch_array($resloc);

        $emvis = "SELECT visitant_videos FROM dbo.users WHERE username='$username'";
        $resvis = sqlsrv_query($conn, $emvis);
        $visitant_videos = sqlsrv_fetch_array($resvis);

        $emimg = "SELECT img FROM dbo.users WHERE username='$username'";
        $resimg = sqlsrv_query($conn, $emimg);
        $img = sqlsrv_fetch_array($resimg);
    ?>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vH">
        <div class="card" style="width: 18rem;">
                <img src="<?php echo $img[0]?>" class="card-img-top" alt="User image" style="background-color: #f0f0f0;">

            <div class="card-body text-center">
                <h5 class="card-title"><?=$_SESSION['username']?></h5>
                <br>
                <!-- Button trigger modal -->
                <button onclick="showmodal()" type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    LOG OUT
                </button>
            </div>
        </div>

        <div class="p-3">
            <h1 class="display-4 fs-1"><?=$_SESSION['name']?></h1>
            <br>
            <table class="table" style="width: 32rem;">
                <tbody>
                    <tr>
                        <th scope="col" colspan="2">USERNAME</th>
                        <td><?=$_SESSION['username']?></td>
                    </tr>
                </tbody>
            </table>

            <?php if ($_SESSION['username'] == "miquel" || $_SESSION['username'] == "okscouter") { ?>
                <button onclick="location.href='./signup.php'" type="button" class="btn btn-outline-dark justify-content-center text-center">REGISTRAR USUARIO</button>
                <button onclick="location.href='./updatephoto.php'" type="button" class="btn btn-outline-dark justify-content-center text-center">ACTUALIZAR FOTOS</button>
                <br><br>
                <button onclick="location.href='./updatelinks.php'" type="button" class="btn btn-outline-dark justify-content-center text-center">ACTUALIZAR LINKS</button>
                <button onclick="location.href='./updatevideos.php'" type="button" class="btn btn-outline-dark justify-content-center text-center">ACTUALIZAR VIDEOS</button>
                <br><br>
                <button onclick="location.href='./changeotherpassword.php'" type="button" class="btn btn-outline-dark justify-content-center text-center">CAMBIAR OTRA CONTRASEÑA</button>
            <?php } 
            else { ?>
                <button onclick="location.href='./local.php'" type="button" class="btn btn-outline-dark justify-content-center text-center" style="width: 200px;">ANALIZA MI EQUIPO</button>
                <button onclick="location.href='<?php echo $local_videos[0]?>'" type="button" class="btn btn-outline-dark justify-content-center text-center" style="width: 250px; margin-left: 60px;">VIDEOS DE MI EQUIPO</button>
                <br><br>
                <button onclick="location.href='./visitant.php'" type="button" class="btn btn-outline-dark justify-content-center text-center" style="width: 200px;">ANALIZA EQUIPO RIVAL</button>
                <button onclick="location.href='<?php echo $visitant_videos[0]?>'" type="button" class="btn btn-outline-dark justify-content-center text-center" style="width: 250px; margin-left: 60px;">VIDEOS DE EL EQUIPO RIVAL</button>
            <?php } ?>

            <br><br>
            <button onclick="location.href='./changepassword.php'" type="button" class="btn btn-outline-dark justify-content-center text-center">CAMBIAR MI CONTRASEÑA</button>

        </div>
 
        <!-- Modal -->
        <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">¿Estas seguro?</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">NO</button>
                        <button onclick="location.href='./logout.php'" type="button" class="btn btn-primary">SI</button>
                    </div>
                </div>
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