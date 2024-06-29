<html>
<head>
  <meta charset="utf-8">
  <title>OKSCOUTER</title>
  <link rel="shortcut icon" href="../images/logo2.png" type="image/x-icon" />
  <link rel="stylesheet" type="text/css" href="../css/web.css">
  <link rel="stylesheet" type="text/css" href="../css/login.css">

  <script src="js/language.js"></script>

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-JNGXZDQHPD"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-JNGXZDQHPD');
  </script>
</head>

<body>
    <section class="bar">
        <div style="position: absolute; left: 0px;">
            <img src="../images/logonom.png" style="width: 250px; margin-top: 24px; margin-left: 100px;" alt="">
        </div>
        <div class="optionsbar">
            <div class="options">
                <button type="button" class="buttonbar" onclick="location.href='./inicio.php'">INICIO</button>
            </div>
            <div class="options">
                <button type="button" class="buttonbar" onclick="location.href='./services.php'">SERVICIOS</button>
            </div>
            <div class="options">
                <button type="button" class="buttonbar" onclick="location.href='./clients.php'">CLIENTES</button>
            </div>
            <div class="options">
                <button type="button" class="buttonbar" onclick="location.href='./demo.php'">DEMO</button>
            </div>
            <div class="options">
                <button type="button" class="buttonbar">INICIAR SESIÓN</button>
            </div>
            <div class="options">
                <button type="button" class="buttonbar" onclick="location.href='./contact.php'">CONTACTO</button>
            </div>
        </div>
    </section>

    <div class="titledemo" style="letter-spacing: 1px;">
        ACCESO A OKSCOUTER DIRECTO INICIO SESIÓN
    </div>

    <img src="../images/logo.png" class="logo" style="width: 350px;" alt="">

    <form action="../php/check-login.php" method="post">
        <br>
        <input type="text" name="username" class="form-style2" style="" placeholder="Usuario" id="username" autocomplete="off">
        <br>
        <input type="password" name="password" class="form-style2" style="z-index: 10" placeholder="Contraseña" id="password" autocomplete="off">
        <br>
        <div style="display: block; margin-left: auto; margin-right: auto;">
            <button type="submit" class="btn3">ENTRAR</button>
        </div>
        <br>
        <div style="display: flex; justify-content: center; padding-bottom: 20px;"> okscouter.hp@gmail.com </div>
        <div style="display: flex; justify-content: center;">
            <img src="../images/Icons/instagram.png" style="width:35px; height:34.99px; margin-right: 30px;" onclick="location.href='https://www.instagram.com/ok_scouter/'">
            <img src="../images/Icons/twitter.png" style="width:35px; height:35px; margin-left: 30px;" onclick="location.href='https://twitter.com/OK_SCOUTER'">
        </div>
        <img src="../images/sponsors/replic.png" style="position: absolute; bottom: 50px; left: 50px; width: 200px" onclick="location.href='https://www.replichockey.com/'"/>
        <img src="../images/sponsors/replic.png" style="position: absolute; bottom: 50px; right: 50px; width: 200px" onclick="location.href='https://www.replichockey.com/'"/>
    </form> 


    
</body>

</html>