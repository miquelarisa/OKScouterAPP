import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getGoals(req, res);
        case 'DELETE':
            return await deleteGoals(req, res);    
    }
}

const getGoals = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM goal WHERE goal_game="' + req.query.idgame + '"')
    return res.status(200).json(result);
}

const deleteGoals = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM goal WHERE goal_game="' + req.query.idgame + '"');
        return res.status(204).json(result);
    } catch (error) {
        console.error(error);
    }
}