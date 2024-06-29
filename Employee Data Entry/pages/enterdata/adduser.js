import * as React from 'react';
import SelectText from '../../components/textField/SelectText';
import FreeText from '../../components/textField/FreeText';
import PasswordText from '../../components/textField/PasswordText';

import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from 'axios';
import { getSession } from 'next-auth/react';

import styles from '../../styles/gestionWeb.module.css';


const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

const btnStyle = {
  border: "1px solid white",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.500)",
  width: "55px",
  height: "55px",
  fontSize: "30px"
}
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

const boxStyle = {
  border: "1px solid white",
  borderRadius: "5px",    
  backgroundColor:"rgba(0,0,0,0.5)",
  marginLeft: "10px",
  width: "372px",
  height: "260px"
}

export const getServerSideProps = async (context) => {
  const { data: competitions } = await axios.get(`${process.env.URL_PAGE}/api/competition/names`)

  var totalcompetitionsArray = [];
  for (let i = 0; i < competitions.length; i++) {
    let c = {value: competitions[i].competition_abbreviation, label: competitions[i].competition_abbreviation}
    totalcompetitionsArray.push(c);
  }

  return {
    props: {
      totalcompetitionsArray,
      session: await getSession(context),

    },
  };
}

export default function AddUser({totalcompetitionsArray}) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [usercompetitions, setusercompetitions] = React.useState([]); //Competiciones donde el usuario tiene acceso
  const [currentcompetition, setcurrentcompetition] = React.useState(totalcompetitionsArray[0].value); //Competicion seleccionada en el selector de competiciones

  const [username, setusername] = React.useState(""); //Valor de el username
  const [name, setname] = React.useState(""); //Valor de el name
  const [email, setemail] = React.useState(""); //Valor de el email
  const [password, setpassword] = React.useState(""); //Valor de el password
  const [password2, setpassword2] = React.useState(""); //Valor de el password 2

  const [alerttext, setalerttext] = React.useState("");
  const [resulttext, setresulttext] = React.useState("");



  React.useEffect(() => {

  }, []);

  function addItem() {
    if (! usercompetitions.includes(currentcompetition)) {
      let aux = [currentcompetition];
      const array = usercompetitions.concat(aux);
      setusercompetitions(array);
    }
  }

  function deleteItem(e, c){
    const i = usercompetitions.indexOf(c);
    if (i > -1) {
      const result = usercompetitions.filter(word => word !== c);
      setusercompetitions(result);
    }
  }

  const getSelectedcompetition = (childData) => {
    setcurrentcompetition(childData);
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
    setresulttext("Procesando");
    if (username==="") {setalerttext("El nombre de usuario no puede estar vacio"); setresulttext("");}
    else if(password==="") {setalerttext("Las contraseña no puede estar vacia"); setresulttext("");}
    else if(password!==password2) {setalerttext("Las contraseñas deben ser iguales"); setresulttext("");}
    else {
        const res = await axios.post('/api/users', {
            username: username,
            name: name,
            email: email,
            password: password
        });
        if (res.status === 200) {
          setalerttext(res.data);
          setresulttext("");
        }
        else if (res.status === 204) {
          for(let i=0; i<usercompetitions.length; i++) {
            const res2 = await axios.post('/api/user_competition', {
              id: username + usercompetitions[i],
              user: username,
              competition: usercompetitions[i]
            });
          }
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
            <section className={styles.layout2cols}>
                <div className={styles.left2cols}>
                    <div className={styles.centerChildren}>
                      <FreeText atribute="Username" defval={username} w="40ch" placeh="Username" parentCallback={getUsername}/>
                      <FreeText atribute="Full name" defval={name} w="40ch" placeh="Full name" parentCallback={getName}/>
                      <FreeText atribute="Email" defval={email} w="40ch" placeh="Email" parentCallback={getEmail}/>
                      <PasswordText atribute="Password" w="40ch" placeh="Password" parentCallback={getPassword}/>
                      <PasswordText atribute="Confirm password" w="40ch" placeh="Confirm password" parentCallback={getPassword2}/>
                    </div>
                </div>
                <div className={styles.right2cols}>
                  <div className={styles.centerChildren}>
                    <div className={styles.pairIcon}>
                        <SelectText id="addcompetition" options={totalcompetitionsArray} defval={totalcompetitionsArray[0].value} atribute="Competicion" w="35ch" parentCallback = {getSelectedcompetition}/>
                        <Button variant="outlined" style={btnStyle} onClick={addItem}>+</Button>
                    </div>
                    <Grid width="100%" height="100%" style={boxStyle}>
                      <Grid item xs={12} md={6}>
                        <Demo style={{backgroundColor: "rgba(0,0,0,0)", color: "white"}}>
                          <List dense={dense} sx={{
                            width: '372px',
                            position: 'relative',
                            overflow: 'auto',
                            maxWidth: '370px',
                            maxHeight: '258px',
                            '& ul': { padding: 0 },
                          }}>
                            {usercompetitions.map( function (current, index) {

                              return (
                                <ListItem key = { index }
                                  secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={ (event) => { deleteItem(event, current) } }>
                                      <DeleteIcon style={{color: "red"}}/>
                                    </IconButton>
                                  }
                                >
                                  <ListItemAvatar>
                                    <Avatar>
                                      <FolderIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText id='textt'
                                    primary={ current }
                                    secondary={secondary ? "Secondary text" : null}
                                  />
                                </ListItem>
                              )

                              })
                            }
                          </List>
                        </Demo>
                      </Grid>
                    </Grid>
                  </div>
                </div>
            </section>
            <div className={styles.centerChildren}>
              <p style={{ color: "red" }}>{alerttext}</p>
              <p style={{ color: "aqua" }}>{resulttext}</p>
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>AÑADIR</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

AddUser.auth = {
  roles: ["manager"]
};