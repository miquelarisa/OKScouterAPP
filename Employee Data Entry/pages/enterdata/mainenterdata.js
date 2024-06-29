import * as React from 'react';
import Button from '@mui/material/Button';

import styles from '../../styles/gestionWeb.module.css'
import { signOut } from 'next-auth/react'
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const btnStyle = {
  border: "2px solid rgba(0,0,0,0)",
  color: "white",
  backgroundColor: "rgba(255,255,255,0.100)",
  width: "350px",
  marginBottom: "20px",
  marginLeft: "20px",
  marginRight: "20px",
  justifyContent: "left",
  padding: "10px"
}
const btnStyleLogout = {
  border: "2px solid rgba(200,0,0,1)",
  color: "red",
  backgroundColor: "rgba(255,255,255,0.100)",
  width: "350px",
  justifyContent: "center",
  padding: "10px",
  marginTop: "-40px"
}
const btnAtras = {
  position: "absolute",
  left: "50px",
  border: "2px solid rgba(0,0,0,0)",
  color: "white",
  backgroundColor: "rgba(255,255,255,0.000)",
  width: "200px",
}

export default function MainEnterData() {

  const { data: session, status } = useSession();

  if(session.user.role === "scouter") {
    return (
      <div>
        <section className={styles.layout}>
          <div className={styles.header}>
            <Button variant="outlined" style={btnAtras}>
              <img src="/images/icons/atras.png" width="40px"/>
              <div className={styles.text}>ATRÁS</div>
            </Button>
            <img src="/images/logos/logo.png" width="300px"/>
          </div>
  
          <div className={styles.main}>  
            <div className={styles.centerItems} style={{marginTop: "-150px"}}>
              <div className={styles.centerChildren}>
                <Button variant="outlined" style={btnStyle} href="./managedata">
                  <img src="/images/icons/enterData.png" width="60px"/>
                  <div className={styles.text}>ENTRAR DATOS</div>
                </Button>
                <Button variant="outlined" style={btnStyle} href="./managefixture">
                  <img src="/images/icons/editData.png" width="60px"/>
                  <div className={styles.text}>GESTIONAR JORNADAS</div>
                </Button>
              </div>
              <div className={styles.centerChildren}>
                <Button variant="outlined" style={btnStyle} href="./addplayer">
                  <img src="/images/icons/addPlayer.png" width="60px"/>
                  <div className={styles.text}>AÑADIR JUGADOR</div>
                </Button>
                <Button variant="outlined" style={btnStyle} href="./editplayer">
                  <img src="/images/icons/editPlayer.png" width="60px"/>
                  <div className={styles.text}>EDITAR JUGADOR</div>
                </Button>
              </div>
            </div>
  
            <div className={styles.centerItems}>
              <div className={styles.centerChildren}>
                <Button variant="outlined" style={btnStyleLogout} onClick={e => {
                  e.preventDefault()
                  signOut({callbackUrl: `${`/enterdata/login`}`})
                }}>LOG OUT</Button>
              </div>
            </div>
  
          </div>
  
          <div className={styles.footer}></div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className={styles.layout}>
        <div className={styles.header}>
          <Button variant="outlined" style={btnAtras}>
            <img src="/images/icons/atras.png" width="40px"/>
            <div className={styles.text}>ATRÁS</div>
          </Button>
          <img src="/images/logos/logo.png" width="300px"/>
        </div>

        <div className={styles.main}>
          <div className={styles.centerItems}>
            <div className={styles.centerChildren}>
              <Button variant="outlined" style={btnStyle} href="./addtypeusers">
                <img src="/images/icons/addUser.png" width="60px"/>
                <div className={styles.text}>AÑADIR USUARIO</div>
              </Button>
              <Button variant="outlined" style={btnStyle} href="./edittypeusers">
                <img src="/images/icons/editUser.png" width="60px"/>
                <div className={styles.text}>EDITAR USUARIO</div>
              </Button>
            </div>
            <div className={styles.centerChildren}>
              <Button variant="outlined" style={btnStyle} href="./addseason">
                <img src="/images/icons/addSeason.png" width="60px"/>
                <div className={styles.text}>AÑADIR TEMPORADA</div>
              </Button>
              <Button variant="outlined" style={btnStyle} href="./editseason">
                <img src="/images/icons/editSeason.png" width="60px"/>
                <div className={styles.text}>EDITAR TEMPORADA</div>
              </Button>
            </div>
            <div className={styles.centerChildren}>
              <Button variant="outlined" style={btnStyle} href="./addcompetition">
                <img src="/images/icons/addCompetition.png" width="60px"/>
                <div className={styles.text}>AÑADIR COMPETICIÓN</div>
              </Button>
              <Button variant="outlined" style={btnStyle} href="./editcompetition">
                <img src="/images/icons/editCompetition.png" width="60px"/>
                <div className={styles.text}>EDITAR COMPETICIÓN</div>
              </Button>
            </div>
          </div>

          <div className={styles.centerItems}>
            <div className={styles.centerChildren}>
              <Button variant="outlined" style={btnStyle} href="./managedata">
                <img src="/images/icons/enterData.png" width="60px"/>
                <div className={styles.text}>ENTRAR DATOS</div>
              </Button>
              <Button variant="outlined" style={btnStyle} href="./managefixture">
                <img src="/images/icons/editData.png" width="60px"/>
                <div className={styles.text}>GESTIONAR JORNADAS</div>
              </Button>
            </div>
            <div className={styles.centerChildren}>
              <Button variant="outlined" style={btnStyle} href="./addteam">
                <img src="/images/icons/addTeam.png" width="60px"/>
                <div className={styles.text}>AÑADIR EQUIPO</div>
              </Button>
              <Button variant="outlined" style={btnStyle} href="./editteam">
                <img src="/images/icons/editTeam.png" width="60px"/>
                <div className={styles.text}>EDITAR EQUIPO</div>
              </Button>
            </div>
            <div className={styles.centerChildren}>
              <Button variant="outlined" style={btnStyle} href="./addplayer">
                <img src="/images/icons/addPlayer.png" width="60px"/>
                <div className={styles.text}>AÑADIR JUGADOR</div>
              </Button>
              <Button variant="outlined" style={btnStyle} href="./editplayer">
                <img src="/images/icons/editPlayer.png" width="60px"/>
                <div className={styles.text}>EDITAR JUGADOR</div>
              </Button>
            </div>
          </div>

          <div className={styles.centerItems}>
            <div className={styles.centerChildren}>
              <Button variant="outlined" style={btnStyleLogout} onClick={e => {
                e.preventDefault()
                signOut({callbackUrl: `${`/enterdata/login`}`})
              }}>LOG OUT</Button>
            </div>
          </div>

        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};


MainEnterData.auth = {
  roles: ["manager", "scouter"]
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}