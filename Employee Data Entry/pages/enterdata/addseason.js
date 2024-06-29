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

  var totalcompetitionArray = [];
  for (let i = 0; i < competitions.length; i++) {
    let c = {value: competitions[i].competition_abbreviation, label: competitions[i].competition_abbreviation}
    totalcompetitionArray.push(c);
  }

  return {
    props: {
      totalcompetitionArray,
      session: await getSession(context),
    },
  };
}

export default function AddSeason({totalcompetitionArray}) {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  
  const [seasoncompetitions, setseasoncompetitions] = React.useState([]); //Competiciones que tiene esta temporada
  const [currentcompetition, setcurrentcompetition] = React.useState(totalcompetitionArray[0].value);

  const [season, setseason] = React.useState("");

  const [errortext, seterrortext] = React.useState("");
  const [resulttext, setresulttext] = React.useState("");

  React.useEffect(() => {

  }, []);

  function addItem() {
    if (! seasoncompetitions.includes(currentcompetition)) {
      let aux = [currentcompetition];
      const array = seasoncompetitions.concat(aux);
      setseasoncompetitions(array);
    }
  }

  function deleteItem(e, c){
    const i = seasoncompetitions.indexOf(c);
    if (i > -1) {
      const result = seasoncompetitions.filter(word => word !== c);
      setseasoncompetitions(result);
    }
  }

  const getSelectedcompetition = (childData) => {
    setcurrentcompetition(childData)
  }
  const getSeason = (childData) => {
    setseason(childData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let y1 = season.substr(0, 4);
    let y2 = season.substr(-4);

    if (y1[0] === "2" && y1[1] === "0" && y2[0] === "2" && y2[1] === "0") {

      let final1 = parseInt(y1.substr(2, 2));
      let final2 = parseInt(y2.substr(2, 2));

      if (final2-final1 != 1) {
        seterrortext("Los dos años de la temporada deben ser continuos");
      }
      else{
        seterrortext("");
        let newSeason = y1 + y2;
        let nameSeason = y1 + " " + y2;

        const { data: seasonid } = await axios.get(`/api/season/season?id=` + newSeason);

        if (seasonid.length > 0) { //La temporada ya existe
          setresulttext("La temporada ya existe");
        }
        else { //Añade la temporada en la base de datos
          const res = await axios.post('/api/season', {
            id: newSeason,
            name: nameSeason
          });

          if(seasoncompetitions.length > 0) createcompetitions(newSeason);

          setresulttext("Temporada creada");
        }        
      }
    }
    else {
      seterrortext("El formato de el nombre de la temporada debe ser 20_ _ / 20_ _");
    }
  };

  const createcompetitions = async (season) => { //Añade las competiciones indicadas que hay en esta temporada

    let partid = season.substr(2, 2) + season.substr(-2);

    for (let i=0; i<seasoncompetitions.length; i++) {
      let id = seasoncompetitions[i] + partid;
      const { data: competitionname } = await axios.get(`/api/competition/name?abr=` + seasoncompetitions[i]);
      let name = competitionname[0].competition_name;
      let abbreviation = seasoncompetitions[i];
      const { data: competitionpicture } = await axios.get(`/api/competition/picture?abr=` + seasoncompetitions[i]);
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
                        <FreeText atribute="Temporada" w="40ch" defval={season} placeh="Ej: 2015-2016 o 2015/2016 o 20152016" parentCallback = {getSeason}/>
                        <h1 style={{color: "red"}}>{errortext}</h1>
                    </div>
                </div>
                <div className={styles.right2cols}>
                  <div className={styles.centerChildren}>
                    <div className={styles.pairIcon}>
                        <SelectText id="addcompetition" options={totalcompetitionArray} defval={totalcompetitionArray[0].value} atribute="Competicion" w="35ch" parentCallback = {getSelectedcompetition}/>
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
                            {seasoncompetitions.map( function (current, index) {

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
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>AÑADIR</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

AddSeason.auth = {
  roles: ["manager"]
};