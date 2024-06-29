import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getGame(req, res);
        case 'POST':
            return await saveGame(req, res);   
        case 'PUT':
            return await updateGame(req, res);
        case 'DELETE':
            return await deleteGame(req, res);    
    }
}

const getGame = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM game ORDER BY game_fixture')
    return res.status(200).json(result);
}

const saveGame = async (req, res) => {
    const {fixture, localteam, visitantteam, localgoals, visitantgoals, date} = req.body

    const [result] = await pool.query('INSERT INTO game SET ?', {
        game_fixture: fixture,
        game_localteam: localteam,
        game_visitantteam: visitantteam,
        game_localgoals: localgoals,
        game_visitantgoals: visitantgoals,
        game_date: date
    });

    return res
        .status(200)
        .json({fixture, localteam, visitantteam, localgoals, visitantgoals, date, id: result.insertId})
}

const updateGame = async (req, res) => {
    const {id, fixture, localteam, visitantteam, localgoals, visitantgoals, date} = req.body
    try {
        const [result] = await pool.query('UPDATE game SET game_fixture="' + fixture + '", game_localteam="' + localteam + '", game_visitantteam="' + visitantteam
        + '", game_localgoals="' + localgoals + '", game_visitantgoals="' + visitantgoals + '", game_date="' + date
         + '" WHERE game_id="' + id + '"');
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}

const deleteGame = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM game WHERE game_id=' + req.query.id);
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}