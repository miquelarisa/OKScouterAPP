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
  const { data: users } = await axios.get(`${process.env.URL_PAGE}/api/users`)

  var totalcompetitionsArray = [];
  for (let i = 0; i < competitions.length; i++) {
    let c = {value: competitions[i].competition_abbreviation, label: competitions[i].competition_abbreviation}
    totalcompetitionsArray.push(c);
  }

  var totalUsernamesArray = [];
  totalUsernamesArray.push({value: "", label: ""});
  for (let j = 0; j < users.length; j++) {
    let username = {value: users[j].username, label: users[j].username}
    totalUsernamesArray.push(username);
  }

  return {
    props: {
      totalcompetitionsArray,
      totalUsernamesArray,
      session: await getSession(context),
    },
  };
}

export default function EditdUser({totalcompetitionsArray, totalUsernamesArray}) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [usercompetition, setusercompetition] = React.useState([]); //competiciones donde tiene acceso el usuario
  const [currentcompetition, setcurrentcompetition] = React.useState(totalcompetitionsArray[0].value); //Competicion seleccionada en el selecto de usercompetition
  const [currentusername, setcurrentusername] = React.useState(totalUsernamesArray[0].value); //Usuario seleccionado en el selector de usuarios

  const [username, setusername] = React.useState(""); //Valor de el username
  const [name, setname] = React.useState(""); //Valor de el name
  const [email, setemail] = React.useState(""); //Valor de el email
  const [password, setpassword] = React.useState(""); //Valor de el password
  const [password2, setpassword2] = React.useState(""); //Valor de el password 2
  

  React.useEffect( async () => {
    // Demanar a base de dades.
    const { data: l } = await axios.get(`/api/user_competition/competitions?username=` + currentusername)
    var competitionArray = [];
    for (let i = 0; i < l.length; i++) {
      let c = l[i].competition;
      competitionArray.push(c);
    } 
    setusercompetition(competitionArray);
    
    //Definim els valors de l'usuari
    const { data: u } = await axios.get(`/api/users/user?username=` + currentusername)
    if (u.length > 0) {
      setusername(u[0].username);
      setname(u[0].name);
      setemail(u[0].email);
    }

  }, [currentusername]);

  function addItem() {
    if (! usercompetition.includes(currentcompetition)) {
      let aux = [currentcompetition];
      const array = usercompetition.concat(aux);
      setusercompetition(array);
    }
  }

  function deleteItem(e, c){
    const i = usercompetition.indexOf(c);
    if (i > -1) {
      const result = usercompetition.filter(word => word !== c);
      setusercompetition(result);
    }
  }

  const getSelectedcompetition = (childData) => {
    setcurrentcompetition(childData);
  }
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
        const res = await axios.put('/api/user', {
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
      const res = await axios.put('/api/user', {
        id: currentusername,
        username: username,
        name: name,
        email: email
      });
      if (res.status === 200) {
        setalerttext(res.data)
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
          <Button variant="outlined" style={btnAtras} href="./edittypeusers">
            <img src="/images/icons/atras.png" width="40px"/>
            <div className={styles.text}>ATRÁS</div>
          </Button>
          <img src="/images/logos/logo.png" width="300px"/>
          <div style={{position: "absolute", right: "50px"}}>
            <SelectText options={totalUsernamesArray} defval={totalUsernamesArray[0].value} atribute="Usuario" w="35ch" parentCallback={getSelectedUser}/>
          </div>
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
                            {usercompetition.map( function (current, index) {

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
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>ACTUALIZAR</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

EditdUser.auth = {
  roles: ["manager"]
};