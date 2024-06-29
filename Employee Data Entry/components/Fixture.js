import * as React from 'react';
import SelectText from './textField/SelectText';
import NumberText from './textField/NumberText';
import Box from '@mui/material/Box';

import styles from '../styles/gestionWeb.module.css';

export default function Fixture(props) {

    const [localteam, setlocalteam] = React.useState(props.fixture.localteam);
    const [visitantteam, setvisitantteam] = React.useState(props.fixture.visitantteam);
    const [localgoals, setlocalgoals] = React.useState(props.fixture.localgoals);
    const [visitantgoals, setvisitantgoals] = React.useState(props.fixture.visitantgoals);

    const getLocalTeam = (childData) => {
        setlocalteam(childData);
        props.parentCallback({id: props.fixture.id, localteam: childData, localgoals: localgoals, visitantteam: visitantteam, visitantgoals: visitantgoals});
    };
    const getVisitantTeam = (childData) => {
        setvisitantteam(childData);
        props.parentCallback({id: props.fixture.id, localteam: localteam, localgoals: localgoals, visitantteam: childData, visitantgoals: visitantgoals});
    };
    const getLocalGoals = (childData) => {
        setlocalgoals(childData);
        props.parentCallback({id: props.fixture.id, localteam: localteam, localgoals: childData, visitantteam: visitantteam, visitantgoals: visitantgoals});
    };
    const getVisitantGoals = (childData) => {
        setvisitantgoals(childData);
        props.parentCallback({id: props.fixture.id, localteam: localteam, localgoals: localgoals, visitantteam: visitantteam, visitantgoals: childData});
    };

    return (
        <Box>
            <div className={styles.pairIcon2}>
                <SelectText options={props.teams} defval={localteam} atribute="Local" w="15ch" parentCallback={getLocalTeam}/>
                <NumberText defval={localgoals} w="7ch" parentCallback={getLocalGoals}/>
                <NumberText defval={visitantgoals} w="7ch" parentCallback={getVisitantGoals}/>
                <SelectText options={props.teams} defval={visitantteam} atribute="Visitante" w="15ch" parentCallback={getVisitantTeam}/>
            </div>
        </Box>
    );
}
