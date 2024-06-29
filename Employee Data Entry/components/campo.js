import React, { useState } from 'react';import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import styles from '../styles/campo.module.css'
import SelectText from './textField/SelectText'
import dades from '../sources/info/opcions.json'


export default function Campo(props) {

    const[selectedGoalZone, setSelectedGoalZone] = useState("");
    const[selectedAsistZone, setSelectedAsistZone] = useState("");

    const[valGolZone, setvalGolZone] = useState(dades.cuenta[0].value);
    const[valAsistZone, setvalAsistZone] = useState(dades.cuenta[0].value);
    const[valGolLado, setvalGolLado] = useState(dades.lado[0].value);
    const[valAsistLado, setvalAsistLado] = useState(dades.lado[0].value);

    const[gol_asist, setgol_asist] = useState("G");

    function markZone(e){
        
        if (gol_asist == "G")
        {
            var zona = "";
            var lado = "";
            if (selectedGoalZone != "")
            {
                document.getElementById(selectedGoalZone).style.backgroundColor = 'rgba(128, 128, 128, 0.185)';
            }
            setSelectedGoalZone(e.target.id);
            if (selectedGoalZone!="" && selectedAsistZone == e.target.id) {
                document.getElementById(e.target.id).style.backgroundColor = 'rgba(255, 0, 255, 0.385)';
            }
            else{
                document.getElementById(e.target.id).style.backgroundColor = 'rgba(255, 0, 0, 0.385)';
                if (selectedAsistZone != "")
                    document.getElementById(selectedAsistZone).style.backgroundColor = 'rgba(0, 0, 255, 0.385)';
            }

            if (e.target.id[0] == "l") {
                lado = dades.lado[1].value;
            }
            else if (e.target.id[0] == "c") {
                lado = dades.lado[2].value;
            }
            else if (e.target.id[0] == "r") {
                lado = dades.lado[3].value;
            }
            
            var num = parseInt(e.target.id.substr(1)) + 1;
            zona = dades.cuenta[num].value;
            setvalGolZone(zona);
            setvalGolLado(lado);
            props.parentCallback({tipo: "G", zona: zona, lado: lado});
        }

        else if (gol_asist == "A")
        {
            var zona = "";
            var lado = "";
            if (selectedAsistZone != "")
            {
                document.getElementById(selectedAsistZone).style.backgroundColor = 'rgba(128, 128, 128, 0.185)';
            }
            setSelectedAsistZone(e.target.id);
            if ( selectedGoalZone!="" && e.target.id == selectedGoalZone) {
                document.getElementById(e.target.id).style.backgroundColor = 'rgba(255, 0, 255, 0.385)';
            }
            else {
                document.getElementById(e.target.id).style.backgroundColor = 'rgba(0, 0, 255, 0.385)';
                if (selectedAsistZone != "")
                    document.getElementById(selectedGoalZone).style.backgroundColor = 'rgba(255, 0, 0, 0.385)';
            }

            if (e.target.id[0] == "l") {
                lado = dades.lado[1].value;
            }
            else if (e.target.id[0] == "c") {
                lado = dades.lado[2].value;
            }
            else if (e.target.id[0] == "r") {
                lado = dades.lado[3].value;
            }
            
            var num = parseInt(e.target.id.substr(1)) + 1;
            zona = dades.cuenta[num].value;
            setvalAsistZone(zona);
            setvalAsistLado(lado);
            props.parentCallback({tipo: "A", zona: zona, lado: lado});
        }
    }

    function changeSwitch() {
        if (gol_asist == "G")
        {
            setgol_asist("A");
        }
        else {
            setgol_asist("G");
        }
    }

    const getGoalZone = (childData) => {
        setvalGolZone(childData);
        props.parentCallback({tipo: "G", zona: childData, lado: valGolLado});
    };
    const getGolSide = (childData) => {
        setvalGolLado(childData);
        props.parentCallback({tipo: "G", zona: valGolZone, lado: childData});
    };
    const getAssistZone = (childData) => {
        setvalAsistZone(childData);
        props.parentCallback({tipo: "A", zona: childData, lado: valAsistLado});
    };
    const getAssistSide = (childData) => {
        setvalAsistLado(childData);
        props.parentCallback({tipo: "A", zona: valAsistZone, lado: childData});
    };

    return (
        <div>
            <div className={styles.center2}>
                <div>
                    <section className={styles.campo}>
        {/*---------Detras de porteria------------------------------------------------------------------------------------------------- */}
                        <div className={styles.detrasPorteria}>
                            <section className={styles.layout3h}>
                                <div className={styles.pintarBorde} id="l4" onClick={markZone}>
                                    4
                                </div>
                                <div className={styles.pintarBorde} id="c7" onClick={markZone}>
                                    7
                                </div>
                                <div className={styles.pintarBorde} id="r4" onClick={markZone}>
                                    4
                                </div>
                            </section>
                        </div>
        {/*---------Zona de porteria------------------------------------------------------------------------------------------------- */}
                        <div className={styles.zonaPorteria}>
                            <section className={styles.layout3h}>
                                <div className={styles.pintarBorde} id="l3" onClick={markZone}>
                                    3
                                </div>
                                <div className={styles.center3h}>
                                    <section className={styles.layout2v}>
                                        <div className={styles.up2v}>
                                            <section className={styles.layout2v}>
                                                <div className={styles.up2v}>
                                                    <section className={styles.layout3h}>
                                                        <div className={styles.pintarBorde} id="l6" onClick={markZone}>
                                                            6
                                                        </div>
                                                        <div className={styles.pintarBorde} id="c8" onClick={markZone}>
                                                            8
                                                        </div>
                                                        <div className={styles.pintarBorde} id="r6" onClick={markZone}>
                                                            6
                                                        </div>
                                                    </section>
                                                </div>
                                                <div className={styles.down2v}>
                                                    <section className={styles.layout3h}>
                                                        <div className={styles.pintarBorde} id="l10" onClick={markZone}>
                                                            10
                                                        </div>
                                                        <div className={styles.pintarBorde} id="c5" onClick={markZone}>
                                                            5
                                                        </div>
                                                        <div className={styles.pintarBorde} id="r10" onClick={markZone}>
                                                            10
                                                        </div>
                                                    </section>
                                                </div>
                                            </section>
                                        </div>
                                        <div className={styles.pintarBorde} id="c9" onClick={markZone}>
                                            9
                                        </div>
                                    </section>
                                </div>
                                <div className={styles.pintarBorde} id="r3" onClick={markZone}>
                                    3
                                </div>
                            </section>
                        </div>
        {/*---------Tres cuartos de campo------------------------------------------------------------------------------------------------- */}
                        <div className={styles.tresCuartos}>
                            <section className={styles.layout3h}>
                                <div className={styles.pintarBorde} id="l1" onClick={markZone}>
                                    1
                                </div>
                                <div className={styles.pintarBorde} id="c2" onClick={markZone}>
                                    2
                                </div>
                                <div className={styles.pintarBorde} id="r1" onClick={markZone}>
                                    1
                                </div>
                            </section>
                        </div>
        {/*---------Campo propio------------------------------------------------------------------------------------------------- */}
                        <div className={styles.pintarBorde} id="c0" onClick={markZone}>
                            0
                        </div>
        {/*---------------------------------------------------------------------------------------------------------- */}
                    </section>
                </div>
                <div>
                    <FormControlLabel id="switch" onClick={changeSwitch}
                        control={<Switch defaultChecked color="default" sx={{
                            "& .MuiSwitch-switchBase": {
                                color: "rgb(137,137,255)",
                            },
                            "& .Mui-checked": {
                                color: "rgb(255,127,127)",
                            },
                            "& .MuiSwitch-track": {
                                backgroundColor: "white",
                            },

                        }} />}
                        sx={{
                            "& .MuiTypography-body1": {
                                color: "white",
                            },
                            marginLeft: "0%",
                        }}
                        label={gol_asist}
                    />
                </div>
                <div>
                    <section className={styles.nexto}>
                        <div className={styles.left2}>
                            <SelectText id="zonaGol" options={dades.cuenta} defval={valGolZone} atribute="Zona gol" w="12ch" parentCallback={getGoalZone}/>
                        </div>
                        <div className={styles.right2}>
                            <SelectText id="ladoGol" options={dades.lado} defval={valGolLado} atribute="Lado gol" w="12ch" parentCallback={getGolSide}/>
                        </div>
                    </section>
                    <section className={styles.nexto}>
                        <div className={styles.left2}>
                            <SelectText id="zonaAsist" options={dades.cuenta} defval={valAsistZone} atribute="Zona asistencia" w="12ch" parentCallback={getAssistZone}/>
                        </div>
                        <div className={styles.right2}>
                            <SelectText id="ladoAsist" options={dades.lado} defval={valAsistLado} atribute="Lado asistencia" w="12ch" parentCallback={getAssistSide}/>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};