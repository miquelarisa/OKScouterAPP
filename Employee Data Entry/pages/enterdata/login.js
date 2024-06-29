import * as React from 'react';
import FreeText from '../../components/textField/FreeText';
import Switch from '@mui/material/Switch';

import Button from '@mui/material/Button';

import axios from 'axios';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

import styles from '../../styles/gestionWeb.module.css';
import PasswordText from '../../components/textField/PasswordText';
const btnStyle1 = {
  border: "1px solid white",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.500)",
  width: "259px",
  height: "50px",
  fontSize: "20px",
  marginTop: "20px"
}
const btnStyle2 = {
    border: "1px solid white",
    color: "white",
    backgroundColor: "rgba(0,179,179,0.500)",
    width: "259px",
    height: "50px",
    fontSize: "20px",
    marginTop: "20px"
}
const textStyle = {
    color: "white",
    fontSize: "40px",
    fontWeight: "bold",
}
const textStyle2 = {
    color: "white",
    fontSize: "14px",
    marginTop: "20px",
    textAlign: "center"
}
const textStyle3 = {
    color: "RED",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "-10px"
}
const textStyle4 = {
    color: "red",
    fontSize: "16px",
    textAlign: "center"
}
const textStyle6 = {
    color: "aqua",
    fontSize: "16px",
    textAlign: "center"
}

export default function Login() {

    const router = useRouter();

    const [hover, setHover] = React.useState();
    const handleMouseIn = () => {
        setHover(true);
    };
    const handleMouseOut = () => {
        setHover(false);
    };

    const [username, setusername] = React.useState(""); //Valor de el nombre de usuario
    const [password, setpassword] = React.useState(""); //Valor de la contrasena
    const [alerttext, setalerttext] = React.useState("");
    const [loading, setloading] = React.useState("");

    const getUserName = (childData) => {
        setusername(childData);
    };
    const getPassword = (childData) => {
        setpassword(childData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading("Verificando")
        setalerttext("");

        const res = await signIn('credentials', {
            'username': username,
            'password': password,

            'redirect': false,
        })
        if(res.error === null) {
            router.push('./mainenterdata');
        }
        else {
            setloading("")
            setalerttext("Usuario o contraseña incorrecto");
        }
    }

  return (
    <div>
        <section className={styles.layout}>
            <div className={styles.header}>
            </div>
            <div className={styles.main}>
                <div className={styles.centerChildren}>
                    <div className={styles.logincontainer}>
                        <div className={styles.centerChildren}>
                            <img src="/images/logos/logoSimple.png" width="100px" style={{marginTop: "-65px"}}/>
                            <h1 style={textStyle}>LOG IN</h1>
                            <h1 style={textStyle3}>SCOUTER</h1>
                            <FreeText defval={username} placeh="Nombre de usuario" atribute="Nombre de usuario" w="30ch" parentCallback = {getUserName}/>
                            <PasswordText defval={password} placeh="Contraseña" atribute="Contraseña" w="30ch" parentCallback = {getPassword}/>
                            <Button variant="outlined" style={hover ? btnStyle2 : btnStyle1} onClick={handleSubmit} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}>ENTRAR</Button>
                            <p style={textStyle6}>{loading}</p>
                            <p style={textStyle4}>{alerttext}</p>

                            <p style={textStyle2}>Si quieres participar como scouter ponte en contacto con: okscouter.hp@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    </div>
  );
};