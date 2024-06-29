import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';

import SelectText from '../../components/textField/SelectText'
import DisabledText from '../../components/textField/DisabledText'
import NumberText from '../../components/textField/NumberText'
import RequiredText from '../../components/textField/RequiredText'
import FreeText from '../../components/textField/FreeText'
import ReadOnlyText from '../../components/textField/ReadOnlyText'
import Porteria from '../../components/porteria'

import dades from '../../sources/info/opcions.json'
import styles from '../../styles/enterData.module.css'

import axios from 'axios';
import { getSession } from 'next-auth/react';

import { useRouter } from 'next/router';



const EnterPenalty = (props) => {
  const router = useRouter();

  const [game, setgame] = React.useState(props.game);

  const [players, setplayers] = React.useState([{value: "", label: ""}]);
  const [goalkeepers, setgoalkeepers] = React.useState([{value: "", label: ""}]);
  const [teams, setteams] = React.useState([{value: "", label: ""}]);

  const [gameid, setgameid] = React.useState(router.query.game);
  const [season, setseason] = React.useState("");
  const [competition, setcompetition] = React.useState("");
  const [fixture, setfixture] = React.useState("");
  const [date, setdate] = React.useState("");
  const [period, setperiod] = React.useState("");
  const [minute, setminute] = React.useState(0);
  const [localteam, setlocalteam] = React.useState("");
  const [visitantteam, setvisitantteam] = React.useState("");
  const [localgoals, setlocalgoals] = React.useState("");
  const [visitantgoals, setvisitantgoals] = React.useState("");

  const [teamscorer, setteamscorer] = React.useState("");
  const [teamreceiver, setteamreceiver] = React.useState("");
  const [playerscorer, setplayerscorer] = React.useState("");
  const [playerscorerid, setplayerscorerid] = React.useState("");
  const [goalkeeper, setgoalkeeper] = React.useState("");
  const [goalkeeperid, setgoalkeeperid] = React.useState("");
  const [timmi, settimmi] = React.useState("");
  const [finalizacion, setfinalizacion] = React.useState("");
  const [accionportero, setaccionportero] = React.useState("");
  const [resultado, setresultado] = React.useState("");
  const [option, setoption] = React.useState(0);
  const [warning, setwarning] = React.useState(0);

  const [altura, setaltura] = React.useState("");
  const [ladoportero, setladoportero] = React.useState("");

  const [linkvideo, setlinkvideo] = React.useState("");
  const [numeroref, setnumeroref] = React.useState("");

  const [resulttext, setresulttext] = React.useState("");

  React.useEffect( async () => {
    const { data: g } = await axios.get(`/api/game/id?id=` + router.query.game);
    setgame(g);
    setteams([{value: "", label: ""}, {value: g[0].game_localteam, label: g[0].game_localteam}, {value: g[0].game_visitantteam, label: g[0].game_visitantteam}])

    const { data: f } = await axios.get(`/api/fixture/fixturedata?id=` + g[0].game_fixture);

    setgameid(g[0].game_id);
    setseason(f[0].competition_season);
    setcompetition(f[0].competition_abbreviation);
    setfixture(f[0].fixture_number);
    setdate(g[0].game_date);
    setlocalteam(g[0].game_localteam);
    setvisitantteam(g[0].game_visitantteam);
    setlocalgoals(g[0].game_glentered);
    setvisitantgoals(g[0].game_gventered);

    const { data: last } = await axios.get(`/api/penalty/last`);
    let referencia = "";
    if (last.length > 0) { referencia = f[0].competition_season.substr(2,2) + f[0].competition_season.substr(6,2) + "PE" + (last[0].penalty_id + 1).toString(); }
    else { referencia = "" + f[0].competition_season.substr(2,2) + f[0].competition_season.substr(6,2) + "PE" + "1"; }
    setnumeroref(referencia);
  }, []);

  React.useEffect( async () => {
    var auxteamreceiver = "";
    if(teams.length > 1)
    {
      if ( teams[1].value === teamscorer ) { auxteamreceiver=teams[2].value }
      else { auxteamreceiver=teams[1].value }
      setteamreceiver(auxteamreceiver);
    }
    const { data: pl } = await axios.get(`/api/player/team?team=` + teamscorer);
    let auxplayers=[];
    auxplayers.push({value: "", label: "", id: ""});
    for (let i = 0; i < pl.length; i++) {
      let p = {value: pl[i].player_name, label: pl[i].player_name, id: pl[i].player_id}
      if(pl[i].player_position === "Jugador") { auxplayers.push(p); }
    }

    const { data: gk } = await axios.get(`/api/player/team?team=` + auxteamreceiver);
    let auxgoalkeepers=[];
    auxgoalkeepers.push({value: "", label: ""});
    for (let j = 0; j < gk.length; j++) {
      let g = {value: gk[j].player_name, label: gk[j].player_name, id: gk[j].player_id}
      if(gk[j].player_position === "Portero") { auxgoalkeepers.push(g); }
    }
    auxgoalkeepers.push({value: "Sin portero", label: "Sin portero", id: null});

    setplayers(auxplayers);
    setgoalkeepers(auxgoalkeepers);

    setplayerscorer(auxplayers[0].value);
    setplayerscorerid(auxplayers[0].id)
    setgoalkeeper(auxgoalkeepers[0].value);
    setgoalkeeperid(auxgoalkeepers[0].id);

  }, [teamscorer]);

  const getPeriod = (childData) => {
    setperiod(childData);
  };
  const getMinute = (childData) => {
    setminute(childData);
  };
  const getTeam = (childData) => {
    setteamscorer(childData);
  };
  const getPlayerScorer = (childData) => {
    setplayerscorer(childData);
    for(var p in players) {
      if(players[p].value === childData){
        setplayerscorerid(players[p].id);
        break;
      }
    }
  };
  const getGoalkeeper = (childData) => {
    setgoalkeeper(childData);
    for(var g in goalkeepers) {
      if(goalkeepers[g].value === childData){
        setgoalkeeperid(goalkeepers[g].id);
        break;
      }
    }
  };
  const getTimmi = (childData) => {
    settimmi(childData);
  };
  const getFinalizacion = (childData) => {
    setfinalizacion(childData);
  };
  const getAccionPortero = (childData) => {
    setaccionportero(childData);
  };
  const getResultado = (childData) => {
    setresultado(childData);
  };
  const getOption = (childData) => {
    if (option===1) {setoption(0)}
    else {setoption(1)}
  };
  const getWarning = (childData) => {
    if (warning===1) {setwarning(0)}
    else {setwarning(1)}
  };
  const getPorteriaData = (childData) => {
    setaltura(childData.altura);
    setladoportero(childData.lado);
  };
  const getLinkVideo = (childData) => {
    setlinkvideo(childData);
  };
  const getNumeroRef = (childData) => {
    setnumeroref(childData);
  };

  const handleSubmit = async (e) => { //Update DB
    e.preventDefault();
    let scoreboard = "";

    if(localgoals == 0 && visitantgoals == 0) { scoreboard = "E0";}
    else if(localgoals == visitantgoals) { scoreboard = "E";}
    else if(localgoals - visitantgoals > 0) {
      if(localgoals - visitantgoals > 1) { scoreboard = "G+";}
      else{scoreboard = "G1";}
    }
    else if(localgoals - visitantgoals < 0) {
      if(localgoals - visitantgoals < 1) { scoreboard = "P+";}
      else{scoreboard = "P1";}
    }
    
    if (teamscorer!="" && playerscorer != "" && goalkeeper != ""){
      const res = await axios.post('/api/penalty', {
        period: parseInt(period),
        minute: parseInt(minute),
        localgoals: localgoals,
        visitantgoals: visitantgoals,
        scoreboard: scoreboard,
        player: playerscorerid,
        goalkeeper: goalkeeperid,
        timmi: timmi,
        resultado: resultado,
        finalization: finalizacion,
        goalkeeperaction: accionportero,
        height: altura,
        side: parseInt(ladoportero),
        option: option,
        warning: warning,
        reference: numeroref,
        linkvideo: linkvideo,
        game: gameid,
        teamshot: teamscorer,
        teamreceiver: teamreceiver,
      });

      if (resultado === "Gol") {
        let lv = "";
        let num;
        if (localteam===teamscorer) { lv="l"; num=localgoals+1; }
        else if (visitantteam===teamscorer) { lv="v"; num=localgoals+1; }

        const res2 = await axios.put('/api/game/goal', {
          id: gameid,
          lv: lv,
          num: num
        });
      }

      setresulttext("Penal entrado");
      window.location.href = window.location.href;
    }
    else{
      setresulttext("Faltan datos");
    }
  };
  
  return (
    <div>
      <section className={styles.layout}>
{/*---------Header------------------------------------------------------------------------------------------------- */}
        <div className={styles.header}>
          <section className={styles.layoutHeader}>

            <div className={styles.left}>
              <section className={styles.nexto}>
                <div className={styles.left2}>
                  <Button style={{
                    border: "1px solid white",
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.500)",
                    width: "173px",
                    height: "56px",
                    marginTop: "8px",
                    marginRight: "8px"
                  }} variant="contained" href={'./managedata'}>
                    <img src="/images/icons/atras.png" width="30px"/>
                    <div className={styles.text}>PARTIDOS</div>
                  </Button>
                </div>
                <div className={styles.right2}>
                  <ReadOnlyText defval={gameid} atribute="Partido" w="20ch"/>
                </div>
              </section> 

              <section className={styles.nexto}>
                <div className={styles.left2}>
                  <ReadOnlyText defval={season} atribute="Temporada" w="20ch"/>
                </div>
                <div className={styles.right2}>
                  <ReadOnlyText defval={competition} atribute="Competición" w="20ch"/>
                </div>
              </section>              
              
              <section className={styles.nexto}>
                <div className={styles.left2}>
                  <ReadOnlyText defval={fixture} atribute="Jornada" w="20ch"/>
                </div>
                <div className={styles.right2}>
                  <ReadOnlyText defval={date} atribute="Fecha" w="20ch"/>
                </div>
              </section>
            </div>

            <div className={styles.center}>
              <div className={styles.centerChildren}>
                  <img src="/images/logos/logo.png" width="300px"/>
              </div>
              <div className={styles.centerChildren}>
                <Button style={{
                  border: "2px solid white",
                  color: "white",
                  backgroundColor: "rgba(200,200,200,0.500)",
                  width: "50px",
                  marginTop: "10px",
                  marginRight: "10px"
                }} variant="contained" href={'./entergoal?game='+gameid}>G</Button>
                <Button style={{
                  border: "2px solid white",
                  color: "white",
                  backgroundColor: "rgba(0,179,179,0.500)",
                  width: "200px",
                  marginTop: "10px"
                }}
                variant="contained" onClick={handleSubmit}>ENTRAR PENAL</Button>
                <Button style={{
                  border: "2px solid white",
                  color: "white",
                  backgroundColor: "rgba(200,200,200,0.500)",
                  width: "50px",
                  marginTop: "10px",
                  marginLeft: "10px"
                }} variant="contained" href={'./enterdirectfoul?game='+gameid}>FD</Button>
              </div>
              <h1 style={{color: "rgb(255,255,255)"}}>{resulttext}</h1>
            </div>

            <div className={styles.right}>
              <section className={styles.nexto}>
                <div className={styles.left2}>
                  <SelectText options={dades.periodo} defval={period} atribute="Periodo" w="20ch" parentCallback={getPeriod}/>
                </div>
                <div className={styles.right2}>
                  <NumberText defval={minute} atribute="Minuto" w="20ch" parentCallback={getMinute}/>
                </div>
              </section>
              <section className={styles.nexto}>
                <div className={styles.left2}>
                  <ReadOnlyText defval={localteam} atribute="Equipo local" w="20ch"/>
                </div>
                <div className={styles.right2}>
                  <ReadOnlyText defval={visitantteam} atribute="Equipo visitante" w="20ch"/>
                </div>
              </section>
              <section className={styles.nexto}>
                <div className={styles.left2}>
                  <ReadOnlyText defval={localgoals} atribute="Goles locales" w="20ch"/>
                </div>
                <div className={styles.right2}>
                  <ReadOnlyText defval={visitantgoals} atribute="Goles visitante" w="20ch"/>
                </div>
              </section>
            </div>
          </section>
        </div>

{/*---------Main------------------------------------------------------------------------------------------------- */}
        <div className={styles.main}>

          <div className={styles.centerChildren}>

            <div className={styles.elementcentered}>
              <SelectText options={teams} defval={teamscorer} atribute="Equipo" w="25ch" parentCallback={getTeam}/>
              <SelectText options={players} defval={playerscorer} atribute="Jugador" w="25ch" parentCallback={getPlayerScorer}/>
              <SelectText options={goalkeepers} defval={goalkeeper} atribute="Portero" w="25ch" parentCallback={getGoalkeeper}/>
              <div className={styles.centerChildren}>
                <div className={styles.elementcentered}>
                  <Checkbox style={{color: "rgb(255,255,255)"}} onClick={getOption}/>
                  <h1 style={{color: "rgb(255,255,255)"}}>2a opcion</h1>
                </div>
                <div className={styles.elementcentered}>
                  <Checkbox style={{color: "rgb(255,255,255)"}} onClick={getWarning}/>
                  <h1 style={{color: "rgb(255,255,255)"}}>Aviso</h1>
                </div>
              </div>
            </div>

            <div className={styles.elementcentered}>
              <SelectText options={dades.timmi} defval={timmi} atribute="Timmi" w="25ch" parentCallback={getTimmi}/>
              <SelectText options={dades.finalizacion} defval={finalizacion} atribute="Finalizacion" w="25ch" parentCallback={getFinalizacion}/>
              <SelectText options={dades.accionPortero} defval={accionportero} atribute="Accion portero" w="25ch" parentCallback={getAccionPortero}/>
              <SelectText options={dades.resultado} defval={resultado} atribute="Resultado" w="25ch" parentCallback={getResultado}/>
            </div>

            <div className={styles.elementcentered}>
              <Porteria parentCallback={getPorteriaData}/>
            </div>
          </div>
        </div>

{/*---------Footer------------------------------------------------------------------------------------------------- */}
        <div className={styles.footer}>
          
          <FreeText defval={linkvideo} atribute="Link de el video" w="80ch" placeh="Link de el video" parentCallback={getLinkVideo}/>
          <ReadOnlyText defval={numeroref} atribute="Referencia" w="80ch" parentCallback={getNumeroRef}/>
        
        </div>
      </section>
      
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
      game: context.query.game
    },
  }
}

EnterPenalty.auth = {
  roles: ["manager", "scouter"]
};

export default EnterPenalty;