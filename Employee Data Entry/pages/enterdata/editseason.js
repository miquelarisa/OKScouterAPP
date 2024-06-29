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
import ReadOnlyText from '../../components/textField/ReadOnlyText';


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

  const { data: seasons } = await axios.get(`${process.env.URL_PAGE}/api/season`)
  var totalSeasonsArray = [];
  for (let j = 0; j < seasons.length; j++) {
    let season = {value: seasons[j].season_name, label: seasons[j].season_name}
    totalSeasonsArray.push(season);
  }

  return {
    props: {
      totalcompetitionsArray,
      totalSeasonsArray,
      session: await getSession(context),
    },
  };
}

export default function EditSeason({totalcompetitionsArray, totalSeasonsArray}) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  
  const [seasoncompetition, setseasoncompetition] = React.useState([]); //Competiciones que tiene esta temporada
  const [seasoncompetitionbase, setseasoncompetitionbase] = React.useState([]); ////Competiciones que tiene esta temporada al entrar a la pagina

  const [currentcompetition, setcurrentcompetition] = React.useState(totalcompetitionsArray[0].value); //Competicion seleccionada por el selector de competiciones
  const [currentseason, setcurrentseason] = React.useState(totalSeasonsArray[0].value); //Temporada seleccionada en el selector de temporadas
  
  const [season, setseason] = React.useState("");

  const [errortext, seterrortext] = React.useState("");
  const [resulttext, setresulttext] = React.useState("");

  React.useEffect( async () => {
    const { data: id } = await axios.get(`/api/season/seasonwithname?name=` + currentseason);
    setseason(id[0].season_id);

    const { data: competitionsinseason } = await axios.get(`/api/competition/seasons?season=` + id[0].season_id);
    let auxcompetitions = [];
    for (let i=0; i<competitionsinseason.length; i++) {
      auxcompetitions.push(competitionsinseason[i].competition_abbreviation);
    }
    setseasoncompetition(auxcompetitions);
    setseasoncompetitionbase(auxcompetitions);


  }, [currentseason]);

  function addItem() {
    if (! seasoncompetition.includes(currentcompetition)) {
      let aux = [currentcompetition];
      const array = seasoncompetition.concat(aux);
      setseasoncompetition(array);
    }
  }
  function deleteItem(e, c){
    const i = seasoncompetition.indexOf(c);
    if (i > -1) {
      const result = seasoncompetition.filter(word => word !== c);
      setseasoncompetition(result);
    }
  }

  const getSelectedcompetition = (childData) => {
    setcurrentcompetition(childData)
  }
  const getSelectedSeason = (childData) => {
    setcurrentseason(childData);
  }
  const getSeason = (childData) => {
    setseason(childData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i=0; i<seasoncompetition.length; i++) {
      //Si seasoncompetition[i] no esta a seasoncompetitionbase inserir
      if(!seasoncompetitionbase.includes(seasoncompetition[i])) {
        //Inserir competicion a la temporada
        let partid = season.toString().substr(2, 2) + season.toString().substr(-2);
        let id = seasoncompetition[i] + partid;
        const { data: competitionname } = await axios.get(`/api/competition/name?abr=` + seasoncompetition[i]);
        let name = competitionname[0].competition_name;
        let abbreviation = seasoncompetition[i];
        const { data: competitionpicture } = await axios.get(`/api/competition/picture?abr=` + seasoncompetition[i]);
        let picture = competitionpicture[0].competition_picture;

        let gender = "";
        if (abbreviation.slice(-1) == "F") {
          gender = "Femenino";
        }
        else if (abbreviation.slice(-1) == "M") {
          gender = "Masculino";
        }

        const res = await axios.post('/api/competition', {
          id: id, 
          name: name,
          season: season,
          abbreviation: abbreviation,
          gender: gender,
          picture: picture
        });
      }
    }

    for (let j=0; j<seasoncompetitionbase.length; j++) {
      //Si seasoncompetitionbase[j] no esta a seasoncompetition borrar
      if(!seasoncompetition.includes(seasoncompetitionbase[j])) {
        //Borrar competicion de la temporada
        const res = await axios.delete('/api/competition?abr=' + seasoncompetitionbase[j] + '&season=' + season);
      }
    }

    setresulttext("Temporada " + currentseason + " editada");

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
            <section className={styles.layout2cols}>
                <div className={styles.left2cols}>
                    <div className={styles.centerChildren}>
                        <SelectText options={totalSeasonsArray} defval={totalSeasonsArray[0].value} atribute="Temporada" w="40ch" parentCallback={getSelectedSeason}/>
                        <ReadOnlyText atribute="Temporada" w="40ch" defval={season} placeh="Ej: 2015-2016 o 2015/2016 o 20152016" parentCallback={getSeason}/>
                        <h1 style={{color: "red"}}>{errortext}</h1>
                    </div>
                </div>
                <div className={styles.right2cols}>
                  <div className={styles.centerChildren}>
                    <div className={styles.pairIcon}>
                        <SelectText id="addcompetition" options={totalcompetitionsArray} defval={totalcompetitionsArray[0].value} atribute="Competición" w="35ch" parentCallback = {getSelectedcompetition}/>
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
                            {seasoncompetition.map( function (current, index) {

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

EditSeason.auth = {
  roles: ["manager"]
};