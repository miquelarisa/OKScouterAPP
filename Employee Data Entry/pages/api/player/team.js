import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getTeam(req, res);
        case 'PUT':
            return await saveTeam(req, res);       
    }
}

const getTeam = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM player WHERE player_team="' + req.query.team + '"')
    return res.status(200).json(result);
}

const saveTeam = async (req, res) => {
    const {player, team} = req.body

    try {
        const [result] = await pool.query('UPDATE player SET player_team="' + team + '" WHERE player_name="' + player + '"');
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}