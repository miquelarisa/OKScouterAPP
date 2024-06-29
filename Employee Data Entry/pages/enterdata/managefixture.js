import * as React from 'react';
import * as moment from 'moment';
import SelectText from '../../components/textField/SelectText';
import FreeText from '../../components/textField/FreeText';
import NumberText from '../../components/textField/NumberText';


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
  marginLeft: "8px",
  fontSize: "30px"
}
const btnStyle2 = {
  border: "1px solid white",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.500)",
  width: "650px",
  height: "55px",
  marginLeft: "8px",
  fontSize: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center"
}
const btnConfirm = {
  border: "1px solid white",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.500)",
  width: "250px",
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
  width: "700px",
  height: "400px"
}

export const getServerSideProps = async (context) => {
  const { data: competitions } = await axios.get(`${process.env.URL_PAGE}/api/competition/names`)
  var totalcompetitionsArray = [];
  totalcompetitionsArray.push({value: "", label: ""})
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

export default function ManageFixture({totalcompetitionsArray}) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [seasons, setseasons] = React.useState([{value: "", label: ""}]);
  const [fixtures, setfixtures] = React.useState([{value: "", label: ""}]);
  const [games, setgames] = React.useState([]);
  const [gamesBase, setgamesBase] = React.useState([]);

  const [competition, setcompetition] = React.useState(totalcompetitionsArray[0].value); //Competicion seleccionada en el select text
  const [season, setseason] = React.useState("");
  const [fixture, setfixture] = React.useState([]);

  const [id, setid] = React.useState(0);

  const [update, setupdate] = React.useState(0);

  const [teams, setteams] = React.useState([{value: "", label: ""}]);

  const [errortext, seterrortext] = React.useState("");
  const [resulttext, setresulttext] = React.useState("");

  React.useEffect( async () => {
    if (competition != "")
    {
      const { data: competitionseasons } = await axios.get(`/api/competition/seasonsbyname?competition=` + competition);
      let auxseasons = [];
      auxseasons.push({value: "", label: ""});
      for (let i=0; i<competitionseasons.length; i++) {
        let s = {value: competitionseasons[i].competition_season, label: competitionseasons[i].competition_season}
        auxseasons.push(s);
      }
      setseasons(auxseasons);
      setseason(auxseasons[0].value);
      setfixture("");

      let c = competition + auxseasons[0].value.substr(2, 2) + auxseasons[0].value.substr(6, 2);
      const { data: teamsarray } = await axios.get(`/api/team_competition/teamsbyid?competition=` + c);
      let auxteams = [];
      auxteams.push({value: "", label: ""})
      for (let j=0; j<teamsarray.length; j++) {
        let t = {value: teamsarray[j].team, label: teamsarray[j].team}
        auxteams.push(t);
      }
      setteams(auxteams);
    }

  }, [competition]);

  React.useEffect( async () => {
    if(season!="")
    {
      let c = competition + season.substr(2, 2) + season.substr(6, 2);
      const { data: fixturesseason } = await axios.get(`/api/fixture/fixturesbycompetition?competition=` + c);
      let aux = [];
      aux.push({value: "", label: ""});
      for(let i=0; i<fixturesseason.length; i++) {
        let f = {value: fixturesseason[i].fixture_number, label: fixturesseason[i].fixture_number}
        aux.push(f);
      }
      setfixtures(aux);
      setfixture(aux[0].value);



      const { data: teamsarray } = await axios.get(`/api/team_competition/teamsbyid?competition=` + c);
      let auxteams = [];
      auxteams.push({value: "", label: ""})
      for (let j=0; j<teamsarray.length; j++) {
        let t = {value: teamsarray[j].team, label: teamsarray[j].team}
        auxteams.push(t);
      }
      setteams(auxteams);
    }
  }, [season]);

  React.useEffect( async () => {
    setgames([]);
    if (fixture!="" && competition!="" && season!="")
    {
      let c = competition + season.substr(2, 2) + season.substr(6, 2);
      const { data: gamesfixture } = await axios.get(`/api/game/gamefixture?competition=` + c + '&fixture=' + fixture);

      let aux=[];
      let aux2=[];
      let cont = 0;
      for(let i=0; i<gamesfixture.length; i++) {
        let datapartit;
        if(gamesfixture[i].game_date != null && gamesfixture[i].game_date != ""){
          datapartit = gamesfixture[i].game_date.substr(8, 2) + "-" + gamesfixture[i].game_date.substr(5, 2) + "-" + gamesfixture[i].game_date.substr(0, 4);
        }
        else{datapartit = ""}

        aux.push({id: i, idorig:gamesfixture[i].game_id, date: datapartit, localteam: gamesfixture[i].game_localteam, localgoals: gamesfixture[i].game_localgoals, visitantteam: gamesfixture[i].game_visitantteam, visitantgoals: gamesfixture[i].game_visitantgoals});
        aux2.push({id: i, idorig:gamesfixture[i].game_id, date: datapartit, localteam: gamesfixture[i].game_localteam, localgoals: gamesfixture[i].game_localgoals, visitantteam: gamesfixture[i].game_visitantteam, visitantgoals: gamesfixture[i].game_visitantgoals});
        cont=cont+1;
      }

      setgamesBase(aux2);
      setgames(aux);
      setid(cont);
      setresulttext("");
    }
  }, [fixture]);

  React.useEffect(() => {

  }, [games]);

  React.useEffect(() => {

  }, [update]);

  const getSeason = (childData) => {
    setseason(childData);
  };
  const getcompetition = (childData) => {
    setcompetition(childData);
  };
  const getFixture = (childData) => {
    setfixture(childData);
  };
  const getLocalTeam = (childData, current) => {
    let aux = games;
    aux[current.id].localteam = childData;
    setgames(aux);
    setupdate(update+1);
  };
  const getVisitantTeam = (childData, current) => {
    let aux = games;
    aux[current.id].visitantteam = childData;
    setgames(aux);
    setupdate(update+1);
  };
  const getLocalGoals = (childData, current) => {
    let aux = games;
    aux[current.id].localgoals = childData;
    setgames(aux);
    setupdate(update+1);
  };
  const getVisitantGoals = (childData, current) => {
    let aux = games;
    aux[current.id].visitantgoals = childData;
    setgames(aux);
    setupdate(update+1);
  };
  const getDate = (childData, current) => {
    let aux = games;
    aux[current.id].date = childData;
    setgames(aux);
    setupdate(update+1);
  };
  const addGame = (childData) => {
    if(competition!="" && season!="" && fixture>0){
      let aux = games;
      aux.push({id: id, idorig:"", localteam: "", localgoals: "", visitantteam: "", visitantgoals: ""})
      setgames(aux);
      let i = id + 1;
      setid(i);
    }
  };
  function deleteGame(e, c, index){
    setgames([]);

    let aux = [];
    let ind = 0;
    for(let i=0; i<games.length; i++) {
      if(games[i].id !== index) {
        aux.push({...games[i], id: ind})
        ind = ind + 1;
      }
    }
    setgames(aux);
    setid(ind);
  };
  const addFixture = async (e) => {
    if(competition!="" && season!=""){
      e.preventDefault();
      let c = competition + season.substr(2, 2) + season.substr(6, 2);
      let num = fixtures.length;
      let idf = c + num;
      const res = await axios.post('/api/fixture', {
        id: idf,
        competition: c,
        number: num
      });
      
      const { data: fixturesseason } = await axios.get(`/api/fixture/fixturesbycompetition?competition=` + c);
      let aux = [];
      aux.push({value: "", label: ""});
      for(let i=0; i<fixturesseason.length; i++) {
        let f = {value: fixturesseason[i].fixture_number, label: fixturesseason[i].fixture_number}
        aux.push(f);
      }
      setfixtures(aux);
      setfixture(num);
    }
  };
  const deleteFixture = async (e) => {
    if(competition!="" && season!="" && fixture!=""){
      e.preventDefault();
      let c = competition + season.substr(2, 2) + season.substr(6, 2);
      let num = fixture;
      let idf = c + num;
      const res = await axios.delete('/api/fixture?id=' + idf);

      //delete all games of this fixture
      const { data: gamesfix } = await axios.get(`/api/game/fixture?id=` + idf);
      for(let j=0; j<gamesfix.length; j++) {
        //delete all goals, penals and direct fouls for each game
        const resg = await axios.delete('/api/goal/game?idgame=' + gamesfix[j].game_id);
        const resp = await axios.delete('/api/penalty/game?idgame=' + gamesfix[j].game_id);
        const resfd = await axios.delete('/api/directfoul/game?idgame=' + gamesfix[j].game_id);
        const respa = await axios.delete('/api/game?id=' + gamesfix[j].game_id);
      }
      //const resp = await axios.delete('/api/game/fixture?fixture=' + idf);

      //Set fixtures after delete
      const { data: fixturesseason } = await axios.get(`/api/fixture/fixturesbycompetition?competition=` + c);
      let aux = [];
      aux.push({value: "", label: ""});
      for(let i=0; i<fixturesseason.length; i++) {
        let f = {value: fixturesseason[i].fixture_number, label: fixturesseason[i].fixture_number}
        aux.push(f);
      }
      setfixtures(aux);
      setfixture(aux[0].value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for(let i=0; i<games.length; i++) {
      if(games[i].idorig === ""){
        //Afgegir game
        let datef;
        try {
          let year = games[i].date.toString().substr(-4);
          let month = games[i].date.toString().substr(3, 2);
          let day = games[i].date.toString().substr(0, 2);
          var datecorrect = year + "-" + month + "-" + day;
          let resultdate = moment(datecorrect, 'YYYY-MM-DD',true).isValid();
          if (resultdate == true) {datef=datecorrect;}
          else {datef=""}
        } catch (error) {
          datef=""
        }

        let fixturegame = competition + season.substr(2,2) + season.substr(6,2) + fixture;

        const res = await axios.post('/api/game', {
          fixture: fixturegame,
          localteam: games[i].localteam,
          visitantteam: games[i].visitantteam,
          localgoals: games[i].localgoals,
          visitantgoals: games[i].visitantgoals,
          date: datef
        });
      }
      else{
        for(let j=0; j<gamesBase.length; j++){
          if(games[i].idorig === gamesBase[j].idorig){
            if(games[i].date === gamesBase[j].date && games[i].localteam === gamesBase[j].localteam && games[i].visitantteam === gamesBase[j].visitantteam && games[i].localgoals === gamesBase[j].localgoals && games[i].visitantgoals === gamesBase[j].visitantgoals) {
            }
            else{
              //Fer update del game
              let datef;
              try {
                let year = games[i].date.toString().substr(-4);
                let month = games[i].date.toString().substr(3, 2);
                let day = games[i].date.toString().substr(0, 2);
                var datecorrect = year + "-" + month + "-" + day;
                let resultdate = moment(datecorrect, 'YYYY-MM-DD',true).isValid();
                if (resultdate == true) {datef=datecorrect;}
                else {datef=""}
              } catch (error) {
                datef=""
              }

              let fixturegame = competition + season.substr(2,2) + season.substr(6,2) + fixture;

              const res = await axios.put('/api/game', {
                id: games[i].idorig,
                fixture: fixturegame,
                localteam: games[i].localteam,
                visitantteam: games[i].visitantteam,
                localgoals: games[i].localgoals,
                visitantgoals: games[i].visitantgoals,
                date: datef
              });
            }
            break;
          }
        }
      }
    }

    for(let x=0; x<gamesBase.length; x++) {
      let trobat = false;
      for(let y=0; y<games.length; y++){
        if(games[y].idorig === gamesBase[x].idorig) {
          trobat = true;
          break
        }
      }
      if(!trobat) {
        //Eliminar game
        const res = await axios.delete('/api/game?id=' + gamesBase[x].idorig);
        //Eliminar gols del partit
        const res2 = await axios.delete('/api/goal/game?idgame=' + gamesBase[x].idorig);
      }
    }
    setresulttext("Jornada definida");
    setupdate(update+1);
  };

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
            <div className={styles.centerChildren}>
                <div className={styles.pairIcon}>
                    <SelectText options={totalcompetitionsArray} defval={totalcompetitionsArray[0].value} atribute="Competición" w="20ch" parentCallback={getcompetition}/>
                    <SelectText options={seasons} defval={season} atribute="Temporada" w="20ch" parentCallback={getSeason}/>
                    <SelectText options={fixtures} defval={fixture} atribute="Num" w="10ch" parentCallback={getFixture}/>
                    <Button variant="outlined" style={btnStyle} onClick={addFixture}>+</Button>
                    <Button variant="outlined" style={btnStyle} onClick={deleteFixture}>-</Button>
                </div>
            </div>
            <div className={styles.centerChildrenatTop}>
                <Grid width="100%" height="100%" style={boxStyle}>
                    <Grid item xs={12} md={6}>
                        <Demo style={{backgroundColor: "rgba(0,0,0,0)", color: "white"}}>
                            <List dense={dense} sx={{
                            width: '700px',
                            position: 'relative',
                            overflow: 'auto',
                            maxWidth: '698px',
                            maxHeight: '398px',
                            '& ul': { padding: 0 },
                            }}>
                            {games.map( function (current, index) {
                                return ( 
                                  <ListItem key = { index }>
                                    <div className={styles.pairIcon2}>
                                        <SelectText options={teams} defval={games[index].localteam} atribute="Local" w="15ch" parentCallback={e => getLocalTeam(e, current)}/>
                                        <NumberText defval={games[index].localgoals} w="7ch" parentCallback={e => getLocalGoals(e, current)}/>
                                        <NumberText defval={games[index].visitantgoals} w="7ch" parentCallback={e => getVisitantGoals(e, current)}/>
                                        <SelectText options={teams} defval={games[index].visitantteam} atribute="Visitante" w="15ch" parentCallback={e => getVisitantTeam(e, current)}/>
                                        <FreeText defval={games[index].date} placeh="DD-MM-YYYY" atribute="Fecha" w="15ch" parentCallback={e => getDate(e, current)}/>
                                    </div>
                                    <IconButton edge="end" aria-label="delete" onClick={ (event) => { deleteGame(event, current, index) } }>
                                      <DeleteIcon style={{color: "red"}}/>
                                    </IconButton>
                                  </ListItem>
                                )
                              })
                            }
                              <div className={styles.centerChildren}>
                                <Button variant="outlined" style={btnStyle2} onClick={addGame}>+</Button>
                              </div>
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
            </div>

            <div className={styles.centerChildren}>
              <h1 style={{color: "rgb(9,235,235)"}}>{resulttext}</h1>
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>DEFINIR JORNADA</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

ManageFixture.auth = {
  roles: ["manager", "scouter"]
};