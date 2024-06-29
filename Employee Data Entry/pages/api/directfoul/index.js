import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getDirectFoul(req, res);
        case 'POST':
            return await saveDirectFoul(req, res);   
        case 'DELETE':
            return await deleteDirectFoul(req, res);    
    }
}

const getDirectFoul = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM directfoul')
    return res.status(200).json(result);
}

const saveDirectFoul = async (req, res) => {
    const {period, minute, localgoals, visitantgoals, scoreboard, player, goalkeeper, timmi, resultado, initialposition,
            execution, finalization, finalizationzone, goalkeeperaction, stickuse, height, side, option, warning, reference,
            linkvideo, game, teamshot, teamreceiver} = req.body

    const [result] = await pool.query('INSERT INTO directfoul SET ?', {
        directfoul_period: period,
        directfoul_minute: minute,
        directfoul_localgoals: localgoals,
        directfoul_visitantgoals: visitantgoals,
        directfoul_scoreboard: scoreboard,
        directfoul_player: player,
        directfoul_goalkeeper: goalkeeper,
        directfoul_timmi: timmi,
        directfoul_result: resultado,
        directfoul_initialposition: initialposition,
        directfoul_execution: execution,
        directfoul_finalization: finalization,
        directfoul_finalizationzone: finalizationzone,
        directfoul_goalkeeperaction: goalkeeperaction,
        directfoul_stick: stickuse,
        directfoul_height: height,
        directfoul_side: side,
        directfoul_2option: option,
        directfoul_warning: warning,
        directfoul_reference: reference,
        directfoul_video: linkvideo,
        directfoul_match: game,
        directfoul_teamshot: teamshot,
        directfoul_teamreciever: teamreceiver
    });

    return res
        .status(200)
        .json({period, minute, localgoals, visitantgoals, scoreboard, player, goalkeeper, timmi, resultado, initialposition,
            execution, finalization, finalizationzone, goalkeeperaction, stickuse, height, side, option, warning, reference,
            linkvideo, game, teamshot, teamreceiver, id: result.insertId})
}

const deleteDirectFoul = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM directfoul WHERE directfoul_id=' + req.query.id);
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}