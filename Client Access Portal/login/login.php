<?php 

    session_start();
    if (!isset($_SESSION['username'])) {
        
?>
<html>
<head>
  <meta charset="utf-8">
  <title>OKSCOUTER</title>
  <link rel="shortcut icon" href="../images/logo2.png" type="image/x-icon" />
  <link rel="stylesheet" type="text/css" href="../css/login.css">
  <script src="js/language.js"></script>
</head>

<body>
    <div class="login-box">
        <div class="box-root flex-flex flex-direction--column">
            <div class="loginbackground box-background--black padding-top--64">
                <div class="loginbackground-gridContainer">
                    <div class="box-root flex-flex" style="grid-area: top / start / 8 / end;">
                        <div class="box-root">
                        </div>
                    </div>
                    <div class="box-root flex-flex" style="grid-area: 4 / 2 / auto / 5;">
                        <div class="box-root box-background--gold200 animationLeftRight tans3s" style="flex-grow: 1;"></div>
                    </div>
                    <div class="box-root flex-flex" style="grid-area: 6 / start / auto / 2;">
                        <div class="box-root box-background--red100 animationRightLeft"  style="flex-grow: 1;"></div>
                    </div>
                    <div class="box-root flex-flex" style="grid-area: 7 / start / auto / 4;">
                        <div class="box-root box-background--blue animationLeftRight" style="flex-grow: 1;"></div>
                    </div>
                    <div class="box-root flex-flex" style="grid-area: 8 / 4 / auto / 6;">
                        <div class="box-root box-background--red100 animationLeftRight tans3s" style="flex-grow: 1;"></div>
                    </div>
                    <div class="box-root flex-flex" style="grid-area: 2 / 15 / auto / end;">
                        <div class="box-root box-background--gold200 animationRightLeft tans4s" style="flex-grow: 1;"></div>
                    </div>
                    <div class="box-root flex-flex" style="grid-area: 3 / 14 / auto / end;">
                        <div class="box-root box-background--blue animationRightLeft" style="flex-grow: 1;"></div>
                    </div>
                    <div class="box-root flex-flex" style="grid-area: 4 / 17 / auto / 20;">
                        <div class="box-root box-background--red100 animationRightLeft tans4s" style="flex-grow: 1;"></div>
                    </div>
                    <div class="box-root flex-flex" style="grid-area: 5 / 14 / auto / 17;">
                        <div class="box-root box-background--gold200 animationRightLeft tans3s" style="flex-grow: 1;"></div>
                    </div>
                </div>
            </div>

            <br><br><br><br>
            <img src="../images/logo.png" class="logo" alt="">
            <form action="../php/check-login.php" style="z-index: 10" method="post">
                <br><br>
                <input type="text" name="username" class="form-style" style="z-index: 10"placeholder="Usuario" id="username" autocomplete="off">
                <br><br>
                <input type="password" name="password" class="form-style" style="z-index: 10" placeholder="Contraseña" id="password" autocomplete="off">
                <br><br>
                <button type="submit" class="btn mt-4" style="text-align: center z-index: 10">ENTRAR</button>
                <button onclick="location.href='../index.php'" type="button" style="z-index: 10; float: right;" class="btn mt-4">ATRAS</button>
                <br>
                <br>
                <div style="z-index: 10; display: flex; justify-content: center; padding-bottom: 20px;"> okscouter.hp@gmail.com </div>
                <div style="z-index: 10; display: flex; margin-left: 150px; margin-right: 150px;">
                    <img src="../images/Icons/instagram.png" style="width:35px;height:34.99px;" onclick="location.href='https://www.instagram.com/ok_scouter/'">
                    <img src="../images/Icons/twitter.png" style="width:35px;height:35px;" onclick="location.href='https://twitter.com/OK_SCOUTER'">
                </div>
                <img src="../images/sponsors/replic.png" style="position: absolute; bottom: 50px; left: 50px; width: 200px" onclick="location.href='https://www.replichockey.com/'"/>
                <img src="../images/sponsors/replic.png" style="position: absolute; bottom: 50px; right: 50px; width: 200px" onclick="location.href='https://www.replichockey.com/'"/>
            </form>
        </div>
    </div>
</body>

</html>
<?php 
}
else {

    header("Location: ./login/home.php");
} ?>