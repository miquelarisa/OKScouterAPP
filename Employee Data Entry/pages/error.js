import * as React from 'react';
import Button from '@mui/material/Button';

import styles from '../styles/gestionWeb.module.css'

import { useSession } from 'next-auth/react';

const btnStyleLogout = {
  border: "2px solid rgba(0,179,179,1)",
  color: "white",
  backgroundColor: "rgba(255,255,255,0.100)",
  width: "350px",
  justifyContent: "center",
  padding: "10px",
  marginTop: "70px"
}
const textStyle = {
    color: "white",
    fontSize: "25px",
    marginTop: "-100px",
    textAlign: "center"
}

export default function Error() {

    const { data: session, status } = useSession();

    if(session !== null && session !== undefined){
        return (
            <div>
        
              <section className={styles.layout}>
                <div className={styles.header}>
                  <img src="/images/logos/logo.png" width="300px"/>
                </div>
        
                <div className={styles.main}>
                    <div className={styles.centerItems}>
                        <div className={styles.centerChildren}>
                            <h1 style={textStyle}>Lamentamos comunicar que no tiene acceso a esta página. <br/> Ponte en contacto con: okscouter.hp@gmail.com</h1>
                            <Button variant="outlined" style={btnStyleLogout} href="./mainenterdata">VOLVER AL MENÚ PRINCIPAL</Button>
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
                  <img src="/images/logos/logo.png" width="300px"/>
                </div>
        
                <div className={styles.main}>
                    <div className={styles.centerItems}>
                        <div className={styles.centerChildren}>
                            <h1 style={textStyle}>Lamentamos comunicar que no tiene acceso a esta página. <br/> Ponte en contacto con: okscouter.hp@gmail.com</h1>
                            <Button variant="outlined" style={btnStyleLogout} href="./login">VOLVER AL INICIO</Button>
                        </div>
                    </div>
                </div>
        
                <div className={styles.footer}></div>
            </section>
        </div>
      );
};