import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getGoal(req, res);
        case 'POST':
            return await saveGoal(req, res);   
        case 'DELETE':
            return await deleteGoal(req, res);    
    }
}

const getGoal = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM goal')
    return res.status(200).json(result);
}

const saveGoal = async (req, res) => {
    const {period, minute, localgoals,visitantgoals, scoreboard, player, assistant, goalkeeper, gamesituation,
            gamephase, contrarec, type, goalkeeperaction, finishingzone, finishingside, assistantzone, assistantside,
            height, side, reference, linkvideo, game, teamscorer, teamreceiver} = req.body


    const [result] = await pool.query('INSERT INTO goal SET ?', {
        goal_period: period,
        goal_minute: minute,
        goal_localgoals: localgoals,
        goal_visitantgoals: visitantgoals,
        goal_scoreboard: scoreboard,
        goal_player: player,
        goal_assistant: assistant,
        goal_goalkeeper: goalkeeper,
        goal_gamesituation: gamesituation,
        goal_gamephase: gamephase,
        goal_contrarecup: contrarec,
        goal_type: type,
        goal_goalkeeperaction: goalkeeperaction,
        goal_finishingzone: finishingzone,
        goal_finishingside: finishingside,
        goal_assistantzone: assistantzone,
        goal_assistantside: assistantside,
        goal_height: height,
        goal_side: side,
        goal_reference: reference,
        goal_video: linkvideo,
        goal_game: game,
        goal_teamscore: teamscorer,
        goal_teamreceiver: teamreceiver
    });

    return res
        .status(200)
        .json({period, minute, localgoals, visitantgoals, scoreboard, player, assistant, goalkeeper, gamesituation, gamephase, contrarec, type, goalkeeperaction, finishingzone, finishingside, assistantzone, assistantside, height, side, reference, linkvideo, game, teamscorer, teamreceiver, id: result.insertId})
}

const deleteGoal = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM goal WHERE goal_id=' + req.query.id);
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}