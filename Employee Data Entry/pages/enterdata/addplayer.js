import * as React from 'react';
import * as moment from 'moment';
import SelectText from '../../components/textField/SelectText';
import FreeText from '../../components/textField/FreeText';

import Button from '@mui/material/Button';

import axios from 'axios';
import { getSession } from 'next-auth/react';

import styles from '../../styles/gestionWeb.module.css';
import dades from '../../sources/info/opcions.json'

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

export const getServerSideProps = async (context) => {
  const { data: teams } = await axios.get(`${process.env.URL_PAGE}/api/team`)

  var totalteamsArray = [];
  totalteamsArray.push({value: "", label: ""})
  for (let i = 0; i < teams.length; i++) {
    if(teams[i].team_gender == "Masculino")
    {
      let t = {value: teams[i].team_id, label: teams[i].team_id}
      totalteamsArray.push(t);
    }
  }

  return {
    props: {
      totalteamsArray,
      session: await getSession(context),
    },
  };
}

export default function AddPlayer({totalteamsArray}) {
  const [name, setname] = React.useState(""); //Valor de el nombre
  const [date, setdate] = React.useState(""); //Valor de la fecha de nacimiento
  const [nationality, setnationality] = React.useState(""); //Valor de la nacionalidad
  const [gender, setgender] = React.useState(dades.genero[0].value); //Valor de el genero
  const [totalequipos, settotalequipos] = React.useState(totalteamsArray); //Valor de el equipo
  const [equipo, setequipo] = React.useState(totalteamsArray[0].value); //Valor de el equipo
  const [posicion, setposicion] = React.useState(""); //Valor de la posicion
  const [lateralidad, setlateralidad] = React.useState(""); //Valor de la lateralidad
  const [dorsal, setdorsal] = React.useState(""); //Valor de el dorsal
  const [imagen, setimagen] = React.useState(""); //Valor de la imagen

  const [resulttext, setresulttext] = React.useState("");
  const [errortext, seterrortext] = React.useState("");

  React.useEffect( async () => {
    const { data: teams } = await axios.get(`/api/team`)

    var totalteamsArraynew = [];
    totalteamsArraynew.push({value: "", label: ""})
    for (let i = 0; i < teams.length; i++) {
      if(teams[i].team_gender == gender)
      {
        let t = {value: teams[i].team_id, label: teams[i].team_id}
        totalteamsArraynew.push(t);
      }
    }

    settotalequipos(totalteamsArraynew);
    setequipo(totalteamsArraynew[0].value);

  }, [gender]);

  const getSelectedteam = (childData) => {
    setequipo(childData);
  }
  const getName = (childData) => {
    setname(childData);
  };
  const getNationality = (childData) => {
    setnationality(childData);
  };
  const getDate = (childData) => {
    setdate(childData);
  };
  const getGender = (childData) => {
    setgender(childData);
  };
  const getPosition = (childData) => {
    setposicion(childData);
  };
  const getLaterality = (childData) => {
    setlateralidad(childData);
  };
  const getDorsal = (childData) => {
    setdorsal(childData);
  };
  const getPicture = (childData) => {
    setimagen(childData);
  };

  const handleSubmit = async (e) => { //Update DB
    e.preventDefault();

    let year = date.substr(-4);
    let month = date.substr(3, 2);
    let day = date.substr(0, 2);

    var datecorrect = year + "-" + month + "-" + day;

    let resultdate = moment(datecorrect, 'YYYY-MM-DD',true).isValid();

    if (resultdate == true) {
      const res = await axios.post('/api/player', {
        name: name,
        position: posicion,
        laterality: lateralidad,
        born: datecorrect,
        genero: gender,
        nationality: nationality,
        number: dorsal,
        picture: imagen,
        team: equipo
      });

      seterrortext("");
      setresulttext("Jugador " + name + " inserido");
    }
    else {
      seterrortext("La fecha de nacimiento es equivocada");
      setresulttext("");
    }
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
                        <FreeText atribute="Nombre" defval={name} w="30ch" placeh="Nombre de el jugador" parentCallback={getName}/>
                        <FreeText atribute="Fecha de nacimiento" defval={date} w="30ch" placeh="Ej: 31-12-2001 or 31/12/2001" parentCallback={getDate}/>
                        <FreeText atribute="Nacionalidad" w="30ch" defval={nationality} placeh="Nacionalidad" parentCallback={getNationality}/>
                        <SelectText options={dades.genero} defval={dades.genero[0].value} atribute="Genero" w="30ch" parentCallback={getGender}/>
                    </div>
                </div>
                <div className={styles.right2cols}>
                  <div className={styles.centerChildren}>
                      <SelectText options={totalequipos} defval={equipo} atribute="Equipo" w="30ch" parentCallback = {getSelectedteam}/>
                      <SelectText options={dades.position} defval={dades.position[0].value} atribute="Position" w="30ch" parentCallback={getPosition}/>
                      <SelectText options={dades.laterality} defval={dades.laterality[0].value} atribute="Lateralidad" w="30ch" parentCallback={getLaterality}/>
                      <FreeText atribute="Dorsal" defval={dorsal} w="30ch" placeh="Dorsal" parentCallback={getDorsal}/>
                      <FreeText atribute="Imagen" defval={imagen} w="30ch" placeh="Imagen" parentCallback={getPicture}/>
                  </div>
                </div>
            </section>
            <div className={styles.centerChildren}>
              <h1 style={{color: "rgb(235,0,0)"}}>{errortext}</h1>
              <h1 style={{color: "rgb(9,235,235)"}}>{resulttext}</h1>
              <Button variant="outlined" style={btnConfirm} onClick={handleSubmit}>AÑADIR</Button>
            </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

AddPlayer.auth = {
  roles: ["manager", "scouter"]
};