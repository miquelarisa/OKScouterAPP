import React, { useState } from 'react';import FormGroup from '@mui/material/FormGroup';

import styles from '../styles/porteria.module.css'
import SelectText from './textField/SelectText'
import dades from '../sources/info/opcions.json'


export default function Porteria(props) {

    const[selectedZone, setselectedZone] = useState("");
    const[valAltura, setvalAltura] = useState(dades.alturaPorteria[0].value);
    const[valLado, setvalLado] = useState(dades.ladoPorteria[0].value);

    function markZone(e){

        if (selectedZone != "")
        {
            document.getElementById(selectedZone).style.backgroundColor = 'rgba(128, 128, 128, 0.185)';
        }
        setselectedZone(e.target.id);
        
        document.getElementById(e.target.id).style.backgroundColor = 'rgba(0, 0, 0, 0.385)';

        var altura = "";
        var lado = "";

        if (e.target.id.substr(0,2) == "al"){
            altura = dades.alturaPorteria[1].value;
        }
        else if (e.target.id.substr(0,2) == "ma"){
            altura = dades.alturaPorteria[2].value;
        }
        else if (e.target.id.substr(0,2) == "pa"){
            altura = dades.alturaPorteria[3].value;
        }
        else if (e.target.id.substr(0,2) == "ra"){
            altura = dades.alturaPorteria[4].value;
        }

        var num = parseInt(e.target.id.substr(2)) + 3;
        lado = dades.ladoPorteria[num].value

        setvalAltura(altura);
        setvalLado(lado);
        props.parentCallback({altura: altura, lado: lado});
    }

    const getAltura = (childData) => {
        setvalAltura(childData);
        props.parentCallback({altura: childData, lado: valLado});
    };
    const getLado = (childData) => {
        setvalLado(childData);
        props.parentCallback({altura: valAltura, lado: childData});
    };

    return (    
        <div>
            <section className={styles.porteria}>
                <div className={styles.alta}>
                    <section className={styles.layoutH}>
                        <div className={styles.pall}></div>
                        <div className={styles.pintarBorde} id="al-2" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="al-1" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="al0" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="al1" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="al2" onClick={markZone}></div>
                        <div className={styles.palr}></div>
                    </section>
                </div>
                <div className={styles.medioalta}>
                    <section className={styles.layoutH}>
                        <div className={styles.pall}></div>
                        <div className={styles.pintarBorde} id="ma-2" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="ma-1" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="ma0" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="ma1" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="ma2" onClick={markZone}></div>
                        <div className={styles.palr}></div>
                    </section>
                </div>
                <div className={styles.palmo}>
                    <section className={styles.layoutH}>
                        <div className={styles.pall}></div>
                        <div className={styles.pintarBorde} id="pa-2" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="pa-1" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="pa0" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="pa1" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="pa2" onClick={markZone}></div>
                        <div className={styles.palr}></div>
                    </section>
                </div>
                <div className={styles.rasa}>
                    <section className={styles.layoutH}>
                        <div className={styles.pall}></div>
                        <div className={styles.pintarBorde} id="ra-2" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="ra-1" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="ra0" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="ra1" onClick={markZone}></div>
                        <div className={styles.pintarBorde} id="ra2" onClick={markZone}></div>
                        <div className={styles.palr}></div>
                    </section>
                </div>
            </section>
            <div style={{marginTop: "40px"}}>
                <SelectText options={dades.alturaPorteria} defval={valAltura} atribute="Altura" w="25ch" parentCallback={getAltura}/>
                <SelectText options={dades.ladoPorteria} defval={valLado} atribute="Lado portero" w="25ch" parentCallback={getLado}/>
            </div>
        </div>
    );
};