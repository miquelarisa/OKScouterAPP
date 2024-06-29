import * as React from 'react';
import FreeText from '../../components/textField/FreeText';
import PasswordText from '../../components/textField/PasswordText';

import Button from '@mui/material/Button';

import axios from 'axios';
import { getSession } from 'next-auth/react';

import styles from '../../styles/gestionWeb.module.css';

const btnConfirm = {
  border: "1px solid white",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.500)",
  width: "200px",
  height: "55px",
  fontSize: "20px"
}
const textStyle = {
    color: "white",
    fontSize: "30px",
    fontWeight: "bold",
}
const btnAtras = {
  position: "absolute",
  left: "50px",
  border: "2px solid rgba(0,0,0,0)",
  color: "white",
  backgroundColor: "rgba(255,255,255,0.000)",
  width: "200px",
}

export default function AddManager({totalcompetitionsArray}) {

  const [username, setusername] = React.useState(""); //Valor de el username
  const [name, setname] = React.useState(""); //Valor de el name
  const [email, setemail] = React.useState(""); //Valor de el email
  const [password, setpassword] = React.useState(""); //Valor de el password
  const [password2, setpassword2] = React.useState(""); //Valor de el password 2

  const [alerttext, setalerttext] = React.useState("");
  const [resulttext, setresulttext] = React.useState("");

  React.useEffect(() => {

  }, []);

  const getUsername = (childData) => {
    setusername(childData);
  };
  const getName = (childData) => {
    setname(childData);
  };
  const getEmail = (childData) => {
    setemail(childData);
  };
  const getPassword = (childData) => {
    setpassword(childData);
  };
  const getPassword2 = (childData) => {
    setpassword2(childData);
  };

  const handleSubmit = async (e) => { //Update DB
    e.preventDefault();
    setresulttext("Procesando");
    //Registrar a manager
    if (username==="") {setalerttext("El nombre de usuario no puede estar vacio"); setresulttext("");}
    else if(password==="") {setalerttext("Las contraseña no puede estar vacia"); setresulttext("");}
    else if(password!==password2) {setalerttext("Las contraseñas deben ser iguales"); setresulttext("");}
    else {
        const res = await axios.post('/api/scouter', {
            username: username,
            name: name,
            email: email,
            password: password,
            role: "manager"
        });
        if (res.status === 200) {
          setresulttext("");
          setalerttext(res.data);
        }
        else {
          window.location.href = window.location.href;
        }
    }
  };

  return (
    <div>
      <section className={styles.layout}>
        <div className={styles.header}>
          <Button variant="outlined" style={btnAtras} href="./addtypeusers">
            <img src="/images/icons/atras.png" width="40px"/>
            <div className={styles.text}>ATRÁS</div>
          </Button>
          <img src="/images/logos/logo.png" width="300px"/>
        </div>

        <div className={styles.main}>
            <div className={styles.centerChildren} style={{marginTop: "-50px"}}>
                <h1 style={textStyle}>REGISTRO DE MANAGER</h1>
                <FreeText atribute="Username" defval={username} w="40ch" placeh="Username" parentCallback={getUsername}/>
                <FreeText atribute="Full name" defval={name} w="40ch" placeh="Full name" parentCallback={getName}/>
                <FreeText atribute="Email" defval={email} w="40ch" placeh="Email" parentCallback={getEmail}/>
                <PasswordText atribute="Password" w="40ch" placeh="Password" parentCallback={getPassword}/>
                <PasswordText atribute="Confirm password" w="40ch" placeh="Confirm password" parentCallback={getPassword2}/>
                <p style={{ color: "red" }}>{alerttext}</p>
                <p style={{ color: "aqua" }}>{resulttext}</p>
            </div>
            <div className={styles.centerChildren} style={{ marginTop: "20px" }}>
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>AÑADIR</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

AddManager.auth = {
  roles: ["manager"]
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}