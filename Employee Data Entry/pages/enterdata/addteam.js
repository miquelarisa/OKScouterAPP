import * as React from 'react';
import SelectText from '../../components/textField/SelectText';
import FreeText from '../../components/textField/FreeText';

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
import dades from '../../sources/info/opcions.json'


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
  /*const { data: players } = await axios.get(`${process.env.URL_PAGE}/api/player`)

  var totalplayersArray = [];
  for (let i = 0; i < players.length; i++) {
    let p = {value: players[i].player_name, label: players[i].player_name, gender: players[i].player_gender}
    totalplayersArray.push(p);
  }*/

  return {
    props: {
        session: await getSession(context),
        //totalplayersArray,
    },
  };
}

export default function AddTeam(/*{totalplayersArray}*/) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [totalplayersArray, settotalplayersArray] = React.useState([]);

  const [name, setname] = React.useState(""); //Valor de el name
  const [abbreviation, setabbreviation] = React.useState(""); //Valor de la abreviacion
  const [gender, setgender] = React.useState(dades.genero[0].value);
  const [picture, setpicture] = React.useState(""); //Valor de la imatge

  const [playersteam, setplayersteam] = React.useState([]); //Players in team

  const [currentplayer, setcurrentplayer] = React.useState("");

  const [totalplayers, settotalplayers] = React.useState([]);

  const [resulttext, setresulttext] = React.useState("");

  React.useEffect(() => {
    axios.get(`/api/player`).then(res => {
      const { data: players } = res;
      var totalplayersArray2 = [];
      for (let i = 0; i < players.length; i++) {
        let p = {value: players[i].player_name, label: players[i].player_name, gender: players[i].player_gender}
        totalplayersArray2.push(p);
      }
      settotalplayersArray(totalplayersArray2);
      settotalplayers(totalplayersArray2);
      setcurrentplayer(totalplayersArray2[0].value);
    })
  }, []);

  React.useEffect(() => {
    var aux=[];
    for(let i=0; i<totalplayersArray.length; i++) {
      if(!playersteam.includes(totalplayersArray[i].value) && totalplayersArray[i].gender === gender) {
        let p = {value: totalplayersArray[i].value, label: totalplayersArray[i].value}
        aux.push(p);
      }
    }

    settotalplayers(aux);
    if (aux.length > 0){ setcurrentplayer(aux[0].value); }

  }, [playersteam]);
  React.useEffect(() => {
    var aux=[];
    for(let i=0; i<totalplayersArray.length; i++) {
      if(!playersteam.includes(totalplayersArray[i].value) && totalplayersArray[i].gender === gender) {
        let p = {value: totalplayersArray[i].value, label: totalplayersArray[i].value}
        aux.push(p);
      }
    }

    settotalplayers(aux);
    if (aux.length > 0){ setcurrentplayer(aux[0].value); }

  }, [gender]);

  function addItem() {
    if (! playersteam.includes(currentplayer)) {
      let aux = [currentplayer];
      const array = playersteam.concat(aux);
      setplayersteam(array);
    }
  }

  function deleteItem(e, c){
    const i = playersteam.indexOf(c);
    if (i > -1) {
      const result = playersteam.filter(word => word !== c);
      setplayersteam(result);
    }
  }

  const getSelectedplayer = (childData) => {
    setcurrentplayer(childData);
  }
  const getName = (childData) => {
    setname(childData);
  };
  const getAbbreviation = (childData) => {
    setabbreviation(childData);
  };
  const getGender = (childData) => {
    setgender(childData);
  };
  const getPicture = (childData) => {
    setpicture(childData);
  };

  const handleSubmit = async (e) => { //Update DB
    e.preventDefault();
    axios.post('/api/team', {
      id: abbreviation,
      name: name,
      gender: gender,
      picture: picture
    });
    ponerequipoajugadores();
    setresulttext("Equipo " + name + " creado");
  };

  const ponerequipoajugadores = async () => {
    for(let i=0; i<playersteam.length; i++) {
      axios.put('/api/player/team', {
        player: playersteam[i],
        team: abbreviation
      });
    }
  }

  return (
    <div>
      <section className={styles.layout}>
        <div className={styles.header}>
          <Button variant="outlined" style={btnAtras} href="./mainenterdata">
            <img src="/images/icons/atras.png" width="40px"/>
            <div className={styles.text}>ATRÁS</div>
          </Button>
          <img src="/images/logos/logo.png" width="300px"/>
        </div>

        <div className={styles.main}>
            <section className={styles.layout2cols}>
                <div className={styles.left2cols}>
                    <div className={styles.centerChildren}>
                      <FreeText atribute="Nombre" defval={name} w="40ch" placeh="Nombre de el equipo" parentCallback={getName}/>
                      <FreeText atribute="Abreviación" defval={abbreviation} w="40ch" placeh="Abreviación (Tiene que ser única)" parentCallback={getAbbreviation}/>
                      <SelectText options={dades.genero} defval={dades.genero[0].value} atribute="Genero" w="40ch" parentCallback={getGender}/>
                      <FreeText atribute="Imagen" defval={picture} w="40ch" placeh="Imagen" parentCallback={getPicture}/>
                    </div>
                </div>
                <div className={styles.right2cols}>
                  <div className={styles.centerChildren}>
                    <div className={styles.pairIcon}>
                        <SelectText options={totalplayers} defval={currentplayer} atribute="Jugador" w="35ch" parentCallback = {getSelectedplayer}/>
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
                            {playersteam.map( function (current, index) {

                              return (
                                <ListItem key = { index }
                                  secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={ (event) => { deleteItem(event, current) } }>
                                      <DeleteIcon style={{color: "red"}}/>
                                    </IconButton>
                                  }
                                >
                                  <ListItemText id='textt'
                                    primary={ current }
                                    secondary={secondary ? "Secondary text" : null}
                                    tertiary={ secondary ? "Secondary text" : null }
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
              <h1 style={{color: "rgb(9,235,235)"}}>{resulttext}</h1>
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>AÑADIR</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

AddTeam.auth = {
  roles: ["manager", "scouter"]
};
