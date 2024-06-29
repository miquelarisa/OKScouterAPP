import * as React from 'react';
import SelectText from '../../components/textField/SelectText';
import FreeText from '../../components/textField/FreeText';
import NumberText from '../../components/textField/NumberText';
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

import Link from 'next/link'


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
  fontSize: "20px"
}
const btnStyle2 = {
  border: "1px solid white",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.500)",
  width: "500px",
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
  top: "50px",
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
  width: "1225px",
  height: "600px"
}

export const getServerSideProps = async (context) => {
  const { data: totalgamesarray } = await axios.get(`${process.env.URL_PAGE}/api/game/games`);
  return {
    props: {
      totalgamesarray,
      session: await getSession(context),
    },
  };
}

export default function ManageData({totalgamesarray}/*{totalcompetitionsArray, totalgamesarray, totalteamsArray}*/) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [totalcompetitionsArray, settotalcompetitionsArray] = React.useState([]);
  const [totalteamsArray, settotalteamsArray] = React.useState([]);

  const [seasons, setseasons] = React.useState([{value: "", label: ""}]);
  const [fixtures, setfixtures] = React.useState([{value: "", label: ""}]);
  const [teams, setteams] = React.useState([]);
  const [games, setgames] = React.useState(totalgamesarray);

  const [competition, setcompetition] = React.useState(""); //Competicion seleccionada en el select text
  const [season, setseason] = React.useState("");
  const [fixture, setfixture] = React.useState([]);
  const [team, setteam] = React.useState("");

  const [update, setupdate] = React.useState(0);

  const [errortext, seterrortext] = React.useState("");
  const [resulttext, setresulttext] = React.useState("");

  React.useEffect( async () => {
    axios.get(`/api/competition/names`).then(res2 => {
      const { data: competitions } = res2;
      var totalcompetitionsArrayaux = [];
      totalcompetitionsArrayaux.push({value: "", label: ""})
      for (let i = 0; i < competitions.length; i++) {
          let c = {value: competitions[i].competition_abbreviation, label: competitions[i].competition_abbreviation}
          totalcompetitionsArrayaux.push(c);
      }
      settotalcompetitionsArray(totalcompetitionsArrayaux);
    })

    axios.get(`/api/team`).then(res3 => {
      const { data: teamsarray } = res3;
      var totalteamsArrayaux = [];
      totalteamsArrayaux.push({value: "", label: ""});
      for (let j = 0; j < teamsarray.length; j++) {
          let t = {value: teamsarray[j].team_id, label: teamsarray[j].team_id}
          totalteamsArrayaux.push(t);
      }
      settotalteamsArray(totalteamsArrayaux);
    })

  }, []);

  React.useEffect( async () => {
    if (competition != "")
    {
        axios.get(`/api/competition/seasonsbyname?competition=` + competition).then(res => {
          const { data: competitionseasons } = res;
          let auxseasons = [];
          auxseasons.push({value: "", label: ""})
          for (let i=0; i<competitionseasons.length; i++) {
              let s = {value: competitionseasons[i].competition_season, label: competitionseasons[i].competition_season}
              auxseasons.push(s);
          }
          setseasons(auxseasons);
          setseason(auxseasons[0].value);
          setfixture("");
        })

        axios.get(`/api/team_competition/competitionname?competition=` + competition).then(res3 => {
          const { data: teamscompetition } = res3
          let auxcompetitions = [];
          auxcompetitions.push({value: "", label: ""})
          for (let i=0; i<teamscompetition.length; i++) {
              let c = {value: teamscompetition[i].team, label: teamscompetition[i].team}
              auxcompetitions.push(c);
          }
          setteams(auxcompetitions);
        })

        var gamescompetition=[];
        for(let i=0; i<totalgamesarray.length; i++){
          if (totalgamesarray[i].competition_abbreviation === competition) {
            gamescompetition.push(totalgamesarray[i]);
          }
        }
        setgames(gamescompetition);
        /*axios.get(`/api/game/gamescompetition?competition=` + competition).then(res2 => {
          const { data: gamescompetition } = res2;  
          setgames(gamescompetition);
        })*/

    }
    else{
        setgames(totalgamesarray);
        setseasons([{value: "",label: ""}])
        setseason("");
        setteams(totalteamsArray);
    }
  }, [competition]);

  React.useEffect( async () => {
    if (competition != "") {
        let c = competition + season.substr(2, 2) + season.substr(6, 2);
        axios.get(`/api/fixture/fixturesbycompetition?competition=` + c).then(res => {
          const { data: fixturesseason } = res
          let aux = [];
          aux.push({value: "", label: ""});
          for(let i=0; i<fixturesseason.length; i++) {
              let f = {value: fixturesseason[i].fixture_number, label: fixturesseason[i].fixture_number}
              aux.push(f);
          }
          setfixtures(aux);
          setfixture(aux[0].value)
        })

        axios.get(`/api/team_competition/teamsbyid?competition=` + c).then(res3 => {
          const { data: teamscompetition } = res3
          let auxcompetitions = [];
          auxcompetitions.push({value: "", label: ""})
          for (let i=0; i<teamscompetition.length; i++) {
              let c = {value: teamscompetition[i].team, label: teamscompetition[i].team}
              auxcompetitions.push(c);
          }
          setteams(auxcompetitions);
        })

        axios.get(`/api/game/gamescompetitionseason?competition=` + competition + '&season=' + season).then(res2 => {
          const { data: gamescompetition } = res2
          setgames(gamescompetition);
        })
    }
  }, [season]);

  React.useEffect( async () => {
      if(fixture!="") {
        axios.get(`/api/game/gamescompetitionseasonfixture?competition=` + competition + '&season=' + season + '&number=' + fixture).then(res => {
          const { data: gamescompetition } = res
          setgames(gamescompetition);
        })
      }
  }, [fixture]);

  React.useEffect(() => {
      if(team!=""){
        let aux = [];

        for(let i=0; i<games.length; i++) {
            if(games[i].game_localteam === team || games[i].game_visitantteam === team) {
                aux.push(games[i]);
            }
            setgames(aux);
        }
      }

  }, [team]);

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
  const getTeam = (childData) => {
    setteam(childData);
  };

  return (
    <div>
      <section className={styles.layout2}>

        <div className={styles.main}>
            <Button variant="outlined" style={btnAtras} href="./mainenterdata">
                <img src="/images/icons/atras.png" width="40px"/>
                <div className={styles.text}>ATRÁS</div>
            </Button>
            <div className={styles.centerChildren}>
                <img src="/images/logos/logo.png" width="300px"/>
            </div>
            <div className={styles.centerChildren}>
                <div className={styles.pairIcon}>
                    <SelectText options={totalcompetitionsArray} defval={competition} atribute="Competición" w="20ch" parentCallback={getcompetition}/>
                    <SelectText options={seasons} defval={season} atribute="Temporada" w="20ch" parentCallback={getSeason}/>
                    <SelectText options={fixtures} defval={fixture} atribute="Num" w="10ch" parentCallback={getFixture}/>
                    <SelectText options={teams} defval={team} atribute="Equipo" w="20ch" parentCallback={getTeam}/>
                </div>
            </div>
            <div className={styles.centerChildrenatTop}>
                <Grid width="100%" height="100%" style={boxStyle}>
                    <Grid item xs={12} md={6}>
                        <Demo style={{backgroundColor: "rgba(0,0,0,0)", color: "white"}}>
                            <List dense={dense} sx={{
                            width: '1225px',
                            position: 'relative',
                            overflow: 'auto',
                            maxWidth: '1223px',
                            maxHeight: '598px',
                            '& ul': { padding: 0 },
                            }}>
                            {games.map( function (current, index) {
                                let colorL = "";
                                let colorV = "";
                                if(current.game_localgoals === current.game_glentered){colorL= "rgba(0,255,0,0.500)"}
                                else if(current.game_localgoals > current.game_glentered){colorL= "rgba(255,255,0,0.500)"}
                                else if(current.game_localgoals < current.game_glentered){colorL= "rgba(255,0,0,0.500)"}

                                if(current.game_visitantgoals === current.game_gventered){colorV= "rgba(0,255,0,0.500)"}
                                else if(current.game_visitantgoals > current.game_gventered){colorV= "rgba(255,255,0,0.500)"}
                                else if(current.game_visitantgoals < current.game_gventered){colorV= "rgba(255,0,0,0.500)"}
                                return (
                                  <ListItem key = { index }>
                                    <div className={styles.pairIcon2}>
                                        <ReadOnlyText defval={current.competition_abbreviation} atribute="Competicion" w="20ch"/>
                                        <ReadOnlyText defval={current.competition_season} atribute="Temporada" w="20ch"/>
                                        <ReadOnlyText defval={current.fixture_number} atribute="Jornada" w="6ch"/>
                                        <ReadOnlyText defval={current.game_localteam} atribute="Local" w="20ch"/>
                                        <ReadOnlyText defval={current.game_localgoals} color={colorL} w="6ch"/>
                                        <ReadOnlyText defval={current.game_visitantgoals} color={colorV} w="6ch"/>
                                        <ReadOnlyText defval={current.game_visitantteam} atribute="Visitante" w="20ch"/>
                                        <Button variant="outlined" style={btnStyle} href={'./entergoal?game='+current.game_id}>G</Button>
                                        <Button variant="outlined" style={btnStyle} href={'./enterpenalty?game='+current.game_id}>P</Button>
                                        <Button variant="outlined" style={btnStyle} href={'./enterdirectfoul?game='+current.game_id}>FD</Button>
                                    </div>
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

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

ManageData.auth = {
  roles: ["manager", "scouter"]
};