import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getPenalty(req, res);
        case 'POST':
            return await savePenalty(req, res);   
        case 'DELETE':
            return await deletePenalty(req, res);    
    }
}

const getPenalty = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM penalty')
    return res.status(200).json(result);
}

const savePenalty = async (req, res) => {
    const {period, minute, localgoals, visitantgoals, scoreboard, player, goalkeeper, timmi, resultado,
            finalization, goalkeeperaction, height, side, option, warning, reference,
            linkvideo, game, teamshot, teamreceiver} = req.body

    const [result] = await pool.query('INSERT INTO penalty SET ?', {
        penalty_period: period,
        penalty_minute: minute,
        penalty_localgoals: localgoals,
        penalty_visitantgoals: visitantgoals,
        penalty_scoreboard: scoreboard,
        penalty_player: player,
        penalty_goalkeeper: goalkeeper,
        penalty_timmi: timmi,
        penalty_result: resultado,
        penalty_finalization: finalization,
        penalty_goalkeeperaction: goalkeeperaction,
        penalty_height: height,
        penalty_side: side,
        penalty_2option: option,
        penalty_warning: warning,
        penalty_reference: reference,
        penalty_video: linkvideo,
        penalty_match: game,
        penalty_teamshot: teamshot,
        penalty_teamreciever: teamreceiver
    });

    return res
        .status(200)
        .json({period, minute, localgoals, visitantgoals, scoreboard, player, goalkeeper, timmi, resultado,
            finalization, goalkeeperaction, height, side, option, warning, reference,
            linkvideo, game, teamshot, teamreceiver, id: result.insertId})
}

const deletePenalty = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM penalty WHERE penalty_id=' + req.query.id);
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}