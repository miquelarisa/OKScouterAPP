import * as React from 'react';
import Button from '@mui/material/Button';
import { getSession } from 'next-auth/react';

import styles from '../../styles/gestionWeb.module.css'
import { isAbsolute, relative } from 'path';

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

const btnAtras = {
  position: "absolute",
  left: "50px",
  border: "2px solid rgba(0,0,0,0)",
  color: "white",
  backgroundColor: "rgba(255,255,255,0.000)",
  width: "200px",
}

export default function AddTypeUsers() {

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
          <div className={styles.centerItems}>
            <div className={styles.centerChildren} style={{marginTop: "-100px"}}>
              <Button variant="outlined" style={btnStyle} href="./adduser">
                <img src="/images/icons/addUser.png" width="60px"/>
                <div className={styles.text}>AÑADIR USUARIO</div>
              </Button>
              <Button variant="outlined" style={btnStyle} href="./addscouter">
                <img src="/images/icons/addUser.png" width="60px"/>
                <div className={styles.text}>AÑADIR SCOUTER</div>
              </Button>
              <Button variant="outlined" style={btnStyle} href="./addmanager">
                <img src="/images/icons/addUser.png" width="60px"/>
                <div className={styles.text}>AÑADIR MANAGER</div>
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.footer}></div>
      </section>
    </div>
  );
};

AddTypeUsers.auth = {
  roles: ["manager"]
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}