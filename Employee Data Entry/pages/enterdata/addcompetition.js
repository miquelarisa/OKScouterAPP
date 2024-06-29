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
  const { data: teams } = await axios.get(`${process.env.URL_PAGE}/api/team`)
  const { data: seasons } = await axios.get(`${process.env.URL_PAGE}/api/season`)

  var totalteamsArray = [];
  for (let i = 0; i < teams.length; i++) {
    let team = {value: teams[i].team_id, label: teams[i].team_id}
    totalteamsArray.push(team);
  }

  var totalseasonsArray = [];
  for (let j = 0; j < seasons.length; j++) {
    let season = {value: seasons[j].season_id, label: seasons[j].season_id}
    totalseasonsArray.push(season);
  }

  return {
    props: {
      totalteamsArray,
      totalseasonsArray,
      session: await getSession(context),
    },
  };
}

export default function AddCompetition({totalteamsArray, totalseasonsArray}) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [totalteams, settotalteams] = React.useState(totalteamsArray);
  
  const [teams, setteams] = React.useState([]); //Equipos que tiene esta competicion
  const [currentteam, setcurrentteam] = React.useState(totalteamsArray[0].value); //Equipo seleccionado de el selector de equipos

  const [competitionname, setcompetitionname] = React.useState(""); //Nombre de la competicion
  const [competitionabr, setcompetitionabr] = React.useState(""); //Abreviacion de la competicion
  const [currentseason, setcurrentseason] = React.useState(totalseasonsArray[0].value); //Temporada de la competicion
  const [gender, setgender] = React.useState(dades.genero[0].value)
  const [picture, setpicture] = React.useState(""); //Imagen de la competicion

  const [errortext, seterrortext] = React.useState("");

  const [resulttext, setresulttext] = React.useState("");

  React.useEffect( async () => {
    var aux=[];
    for(let i=0; i<totalteamsArray.length; i++) {
      if(!teams.includes(totalteamsArray[i].value)) {

        const { data: teamG } = await axios.get(`/api/team/teambyname?team=` + totalteamsArray[i].value);
        if(teamG[0].team_gender == gender){
          let team = {value: totalteamsArray[i].value, label: totalteamsArray[i].value}
          aux.push(team);
        }
      }
    }

    if(aux.length == 0) {
      aux.push({value: "", label: ""})
    }

    settotalteams(aux);
    setcurrentteam(aux[0].value);


  }, [teams]);

  React.useEffect( async () => {
    var aux=[];
    for(let i=0; i<totalteamsArray.length; i++) {
      if(!teams.includes(totalteamsArray[i].value)) {

        const { data: teamG } = await axios.get(`/api/team/teambyname?team=` + totalteamsArray[i].value);
        if(teamG[0].team_gender == gender){
          let team = {value: totalteamsArray[i].value, label: totalteamsArray[i].value}
          aux.push(team);
        }
      }
    }

    settotalteams(aux);
    setcurrentteam(aux[0].value);


  }, [gender]);

  function addItem() {
    if(currentteam !== "")
    {
      if (! teams.includes(currentteam)) {
        let aux = [currentteam];
        const array = teams.concat(aux);
        setteams(array);
      }
    }
  }
  function deleteItem(e, c){
    const i = teams.indexOf(c);
    if (i > -1) {
      const result = teams.filter(word => word !== c);
      setteams(result);
    }
  }

  const getSelectedTeam = (childData) => {
    setcurrentteam(childData)
  }
  const getCompetitionName = (childData) => {
    setcompetitionname(childData);
  };
  const getCompetitionAbr = (childData) => {
    setcompetitionabr(childData);
  };
  const getSeason = (childData) => {
    setcurrentseason(childData);
  };
  const getGender = (childData) => {
    setgender(childData);
  };
  const getPicture = (childData) => {
    setpicture(childData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let partid = currentseason.toString().substr(2, 2) + currentseason.toString().substr(-2);
    let id = competitionabr + partid;
    let name = competitionname;
    let abbreviation = competitionabr;

    const res = await axios.post('/api/competition', {
      id: id,
      name: name,
      season: currentseason,
      abbreviation: abbreviation,
      gender: gender,
      picture: picture
    });

    inserirEquipos(id);
    setresulttext("Competición " + competitionname + " creada");
  };

  const inserirEquipos = async (id) => {
    for (let i=0; i<teams.length; i++) {
      let id2 = teams[i] + id;
      const res = await axios.post('/api/team_competition', {
        id: id2,
        competition: id,
        team: teams[i]
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
                        <FreeText atribute="Nombre de la competición" w="40ch" defval={competitionname} placeh="Nombre de la competición" parentCallback = {getCompetitionName}/>
                        <FreeText atribute="Abreviación" w="40ch" defval={competitionabr} placeh="Abreviación" parentCallback = {getCompetitionAbr}/>
                        <SelectText options={dades.genero} defval={gender} atribute="Genero" w="40ch" parentCallback={getGender}/>
                        <SelectText options={totalseasonsArray} defval={totalseasonsArray[0].value} atribute="Temporada" w="40ch" parentCallback={getSeason}/>
                        <FreeText atribute="Imagen" w="40ch" defval={picture} placeh="Imagen" parentCallback = {getPicture}/>
                        <h1 style={{color: "red"}}>{errortext}</h1>
                    </div>
                </div>
                <div className={styles.right2cols}>
                  <div className={styles.centerChildren}>
                    <div className={styles.pairIcon}>
                        <SelectText id="addcompetition" options={totalteams} defval={totalteams[0].value} atribute="Equipos" w="35ch" parentCallback = {getSelectedTeam}/>
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
                            {teams.map( function (current, index) {

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

AddCompetition.auth = {
  roles: ["manager"]
};