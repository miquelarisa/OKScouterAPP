import * as React from 'react';
import SelectText from '../../components/textField/SelectText';
import FreeText from '../../components/textField/FreeText';
import ReadOnlyText from '../../components/textField/ReadOnlyText';
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

const btnAtras = {
  position: "absolute",
  left: "50px",
  border: "2px solid rgba(0,0,0,0)",
  color: "white",
  backgroundColor: "rgba(255,255,255,0.000)",
  width: "200px",
}
const textStyle = {
    color: "white",
    fontSize: "30px",
    fontWeight: "bold",
}

export const getServerSideProps = async (context) => {
  const { data: users } = await axios.get(`${process.env.URL_PAGE}/api/scouter/manager`)

  var totalUsernamesArray = [];
  totalUsernamesArray.push({value: "", label: ""});
  for (let j = 0; j < users.length; j++) {
    let username = {value: users[j].username, label: users[j].username}
    totalUsernamesArray.push(username);
  }

  return {
    props: {
      totalUsernamesArray,
      session: await getSession(context),
    },
  };
}

export default function EditManager({totalUsernamesArray}) {
  
  const [currentusername, setcurrentusername] = React.useState(totalUsernamesArray[0].value); //Usuario seleccionado en el selector de usuarios

  const [username, setusername] = React.useState(""); //Valor de el username
  const [name, setname] = React.useState(""); //Valor de el name
  const [email, setemail] = React.useState(""); //Valor de el email
  const [password, setpassword] = React.useState(""); //Valor de el password
  const [password2, setpassword2] = React.useState(""); //Valor de el password 2

  const [alerttext, setalerttext] = React.useState("");
  const [resulttext, setresulttext] = React.useState("");


  React.useEffect( async () => {    
    //Definim els valors de l'usuari
    const { data: u } = await axios.get(`/api/scouter/user?username=` + currentusername)

    if(u.length > 0) {
        setusername(u[0].username);
        setname(u[0].name);
        setemail(u[0].email);
    }
    else {
        setusername("");
        setname("");
        setemail("");
    }

  }, [currentusername]);

  const getSelectedUser = (childData) => {
    setcurrentusername(childData)
  }
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
    if(password != ""){
      if(password === password2) {
        const res = await axios.put('/api/scouter', {
          id: currentusername,
          username: username,
          name: name,
          password: password,
          email: email
        });
        if (res.status === 200) {
          setalerttext(res.data)
        }
        else {
          window.location.href = window.location.href;
        }      }
      else{ setalerttext("Las contraseñas deben ser iguales")
    }
    }
    else{
      const res = await axios.put('/api/scouter', {
        id: currentusername,
        username: username,
        name: name,
        email: email
      });
      if (res.status === 204) {
        window.location.href = window.location.href;
      }
      else {
        setresulttext("");
        setalerttext(res.data);
      }
    }
  };

  return (
    <div>
      <section className={styles.layout}>
        <div className={styles.header}>
          <Button variant="outlined" style={btnAtras} href="./edittypeusers">
            <img src="/images/icons/atras.png" width="40px"/>
            <div className={styles.text}>ATRÁS</div>
          </Button>
          <img src="/images/logos/logo.png" width="300px"/>
        </div>

        <div className={styles.main}>
            <div className={styles.centerChildren}>
                <h1 style={textStyle}>EDITAR UN MANAGER</h1>
                <SelectText options={totalUsernamesArray} defval={currentusername} atribute="Usuario" w="40ch" parentCallback={getSelectedUser}/>
                <ReadOnlyText atribute="Username" defval={username} w="40ch" placeh="Username" parentCallback={getUsername}/>
                <FreeText atribute="Full name" defval={name} w="40ch" placeh="Full name" parentCallback={getName}/>
                <FreeText atribute="Email" defval={email} w="40ch" placeh="Email" parentCallback={getEmail}/>
                <PasswordText atribute="Password" w="40ch" placeh="Password" parentCallback={getPassword}/>
                <PasswordText atribute="Confirm password" w="40ch" placeh="Confirm password" parentCallback={getPassword2}/>
                <p style={{ color: "red" }}>{alerttext}</p>
                <p style={{ color: "aqua" }}>{resulttext}</p>
            </div>
            <div className={styles.centerChildren} style={{ marginTop: "20px" }}>
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>ACTUALIZAR</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

EditManager.auth = {
  roles: ["manager"]
};