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
  const { data: teams } = await axios.get(`${process.env.URL_PAGE}/api/team`)
  var totalteamsArray = [];
  for (let i = 0; i < teams.length; i++) {
    let team = {value: teams[i].team_id, label: teams[i].team_id}
    totalteamsArray.push(team);
  }

  const { data: seasons } = await axios.get(`${process.env.URL_PAGE}/api/season`)
  var totalseasonsArray = [];
  for (let j = 0; j < seasons.length; j++) {
    let season = {value: seasons[j].season_id, label: seasons[j].season_id}
    totalseasonsArray.push(season);
  }

  const { data: competitions } = await axios.get(`${process.env.URL_PAGE}/api/competition/names`)
  var totalcompetitionsArray = [];
  for (let i = 0; i < competitions.length; i++) {
    let c = {value: competitions[i].competition_abbreviation, label: competitions[i].competition_abbreviation}
    totalcompetitionsArray.push(c);
  }

  return {
    props: {
      totalteamsArray,
      totalcompetitionsArray,
      session: await getSession(context),
    },
  };
}

export default function EditCompetition({totalteamsArray, totalcompetitionsArray}) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  
  const [totalteams, settotalteams] = React.useState(totalteamsArray);
  const [currentteam, setcurrentteam] = React.useState(totalteamsArray[0].value); //Equipo seleccionado en el select text
  const [teams, setteams] = React.useState([]); //Equipos que tiene esta competicion
  const [teamsbase, setteamsbase] = React.useState([]);

  const [currentcompetition, setcurrentcompetition] = React.useState(totalcompetitionsArray[0].value); //Competicion seleccionada en el select text
  const [seasons, setseasons] = React.useState([]);
  const [currentseason, setcurrentseason] = React.useState([]);

  const [competitionname, setcompetitionname] = React.useState("");
  const [competitionabr, setcompetitionabr] = React.useState("");
  const [gender, setgender] = React.useState(dades.genero[0].value)
  const [picture, setpicture] = React.useState("");

  const [errortext, seterrortext] = React.useState("");
  const [resulttext, setresulttext] = React.useState("");

  React.useEffect( async () => {

    const { data: competitionseasons } = await axios.get(`/api/competition/seasonsbyname?competition=` + currentcompetition);
    let auxseasons = [];
    for (let i=0; i<competitionseasons.length; i++) {
      let s = {value: competitionseasons[i].competition_season, label: competitionseasons[i].competition_season}
      auxseasons.push(s);
    }
    setseasons(auxseasons);
    setcurrentseason(auxseasons[0].value);

    const { data: competition } = await axios.get(`/api/competition/allbynameseason?competition=` + currentcompetition + '&season=' + auxseasons[0].value);

    setcompetitionname(competition[0].competition_name);
    setcompetitionabr(competition[0].competition_abbreviation);
    setgender(competition[0].competition_gender);
    setpicture(competition[0].competition_picture);

    let c = currentcompetition + auxseasons[0].value.substr(2, 2) + auxseasons[0].value.substr(6, 2);

    const { data: competitionteams } = await axios.get(`/api/team_competition/teamsbyid?competition=` + c);
    let auxcompetitionsteams = [];
    for (let i=0; i<competitionteams.length; i++) {
      auxcompetitionsteams.push(competitionteams[i].team);
    }

    setteams(auxcompetitionsteams);
    setteamsbase(auxcompetitionsteams);

  }, [currentcompetition]);

  React.useEffect( async () => {

    const { data: competition } = await axios.get(`/api/competition/allbynameseason?competition=` + currentcompetition + '&season=' + currentseason);

    if(competition.length > 0) {
      setcompetitionname(competition[0].competition_name);
      setcompetitionabr(competition[0].competition_abbreviation);
      setpicture(competition[0].competition_picture);

      let c = currentcompetition + currentseason.substr(2, 2) + currentseason.substr(6, 2);

      const { data: competitionteams } = await axios.get(`/api/team_competition/teamsbyid?competition=` + c);
      let auxcompetitionsteams = [];
      for (let i=0; i<competitionteams.length; i++) {
        auxcompetitionsteams.push(competitionteams[i].team);
      }

      setteams(auxcompetitionsteams);
      setteamsbase(auxcompetitionsteams);
    }
    setresulttext("");

  }, [currentseason]);

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
  const getcompetition = (childData) => {
    setcurrentcompetition(childData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let c = currentcompetition + currentseason.substr(2, 2) + currentseason.substr(6, 2);

    //Actualitzar nom i imatge de la competicio
    const res = await axios.put('/api/competition', {
      id: c,
      name: competitionname,
      gender: gender,
      picture: picture
    });

    modificarEquipos();
    setresulttext("Competición " + competitionname + " modificada");
  };

  const modificarEquipos = async () => {
    //Actualitzar equips que hi ha a la competicio
    for (let i=0; i<teams.length; i++) {
      //Si teams[i] no esta a teamsbase inserir
      if(!teamsbase.includes(teams[i])) {
        let comp = currentcompetition + currentseason.substr(2, 2) + currentseason.substr(6, 2);
        let id = teams[i] + comp;
        const res = await axios.post('/api/team_competition', {
          id: id, 
          team: teams[i],
          competition: comp
        });
      }
    }

    for (let i=0; i<teamsbase.length; i++) {
      //Si teamsbase[i] no esta a teams inserir
      if(!teams.includes(teamsbase[i])) {
        let comp = currentcompetition + currentseason.substr(2, 2) + currentseason.substr(6, 2);
        let id = teamsbase[i] + comp;
        const res = await axios.delete('/api/team_competition?id=' + id);
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
                      <SelectText options={totalcompetitionsArray} defval={totalcompetitionsArray[0].value} atribute="Competición" w="40ch" parentCallback={getcompetition}/>
                      <SelectText options={seasons} defval={currentseason} atribute="Temporada" w="40ch" parentCallback={getSeason}/>
                      <FreeText atribute="Nombre de la competición" w="40ch" defval={competitionname} placeh="Nombre de la competición" parentCallback = {getCompetitionName}/>
                      <ReadOnlyText atribute="Abreviación" w="40ch" defval={competitionabr} placeh="Abreviación" parentCallback = {getCompetitionAbr}/>
                      <SelectText options={dades.genero} defval={gender} atribute="Genero" w="40ch" parentCallback={getGender}/>
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
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>ACTUALIZAR</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

EditCompetition.auth = {
  roles: ["manager"]
};