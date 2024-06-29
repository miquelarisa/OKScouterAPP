import * as React from 'react';
import SelectText from '../../components/textField/SelectText';
import FreeText from '../../components/textField/FreeText';
import ReadOnlyText from '../../components/textField/ReadOnlyText';

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
  const { data: teams } = await axios.get(`${process.env.URL_PAGE}/api/team`)

  var totalplayersArray = [];
  for (let i = 0; i < players.length; i++) {
    let p = {value: players[i].player_name, label: players[i].player_name, gender: players[i].player_gender}
    totalplayersArray.push(p);
  }

  var totalteamsArray = [];
  for (let i = 0; i < teams.length; i++) {
    let team = {value: teams[i].team_id, label: teams[i].team_id}
    totalteamsArray.push(team);
  }*/

  return {
    props: {
        /*totalplayersArray,
        totalteamsArray,*/
        session: await getSession(context),
    },
  };
}

export default function EditTeam(/*{totalplayersArray, totalteamsArray}*/) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [totalplayersArray, settotalplayersArray] = React.useState([]);
  const [totalteamsArray, settotalteamsArray] = React.useState([]);

  const [selectedteam, setselectedteam] = React.useState(""); //Equipo seleccionado del selector
  const [name, setname] = React.useState(""); //Valor de el name
  const [abbreviation, setabbreviation] = React.useState(""); //Valor de la abreviacion
  const [gender, setgender] = React.useState(dades.genero[0].value);
  const [picture, setpicture] = React.useState(""); //Valor de la imatge

  const [currentplayer, setcurrentplayer] = React.useState("");
  const [playersteam, setplayersteam] = React.useState([]); //Players in team
  const [playersteambase, setplayersteambase] = React.useState([]); //Players in team

  const [totalplayers, settotalplayers] = React.useState([]);
  const [totalteams, settotalteams] = React.useState([]);

  const [resulttext, setresulttext] = React.useState("");

  React.useEffect( async () => {
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

    axios.get(`/api/team`).then(res2 => {
      const { data: teams } = res2;
      var totalteamsArray = [];
      for (let i = 0; i < teams.length; i++) {
        let team = {value: teams[i].team_id, label: teams[i].team_id}
        totalteamsArray.push(team);
      }
      settotalteams(totalteamsArray);
      setselectedteam(totalteamsArray[0].value)
    })
  }, []);

  React.useEffect( async () => {
    
    axios.get(`/api/team/teambyname?team=` + selectedteam).then(res2 => {
      const { data: team} = res2

      if(team.length>0)
      {
        setname(team[0].team_name);
        setabbreviation(team[0].team_id);
        setgender(team[0].team_gender);
        setpicture(team[0].team_picture);

        axios.get(`/api/player/team?team=` + team[0].team_id).then(res => {
          const { data: playersList } = res;
          let auxp = [];
          for(let j=0; j<playersList.length; j++) {
              auxp.push(playersList[j].player_name);
          }
          var aux=[];
          for(let i=0; i<totalplayersArray.length; i++) {
            if(!auxp.includes(totalplayersArray[i].value) && totalplayersArray[i].gender === team[0].gender) {
                let p = {value: totalplayersArray[i].value, label: totalplayersArray[i].value}
                aux.push(p);
            }
          }
          setplayersteambase(auxp);
          setplayersteam(auxp);
          settotalplayers(aux);
          if (aux.length > 0){ setcurrentplayer(aux[0].value); }
        })
      }
    })
  }, [selectedteam]);

  React.useEffect( async () => {

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
  const getTeam = (childData) => {
    setselectedteam(childData);
  };
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
    axios.put('/api/team', {
      id: abbreviation,
      name: name,
      gender: gender,
      picture: picture
    });
    ponerequipoajugadores();
    setresulttext("Equipo " + name + " actualizado");

    axios.get(`/api/team`).then(res => {
      const { data: teams } = res
      var totalteamsArrayaux = [];
      for (let i = 0; i < teams.length; i++) {
          let team = {value: teams[i].team_id, label: teams[i].team_id}
          totalteamsArrayaux.push(team);
      }
      settotalteams(totalteamsArrayaux);
      setselectedteam(name);
    })
  };

  const ponerequipoajugadores = async () => {
    for (let i=0; i<playersteam.length; i++) {
        //Si playersteam[i] no esta a playersteambase inserir
        if(!playersteambase.includes(playersteam[i])) {
          axios.put('/api/player/team', {
            player: playersteam[i], 
            team: abbreviation,
          });
        }
      }

      for (let i=0; i<playersteambase.length; i++) {
        //Si playersteambase[i] no esta a playersteam borrar
        let r = "";
        if(!playersteam.includes(playersteambase[i])) {
            axios.put('/api/player/team', {
                player: playersteambase[i], 
                team: r,
            });
        }
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
                        <SelectText options={totalteams} defval={selectedteam} atribute="Equipo" w="40ch" parentCallback={getTeam}/>
                        <FreeText atribute="Nombre" defval={name} w="40ch" placeh="Nombre de el equipo" parentCallback={getName}/>
                        <ReadOnlyText atribute="Abreviación" defval={abbreviation} w="40ch" parentCallback={getAbbreviation}/>
                        <ReadOnlyText atribute="Genero" defval={gender} w="40ch" parentCallback={getGender}/>
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
              <h1 style={{color: "rgb(9,235,235)"}}>{resulttext}</h1>
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>ACTUALIZAR</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

EditTeam.auth = {
  roles: ["manager", "scouter"]
};