import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'PUT':
            return await updateGoalGame(req, res);    
    }
}

const updateGoalGame = async (req, res) => {
    const {id, lv, num} = req.body
    try {
        if (lv === "l") {
            const [result] = await pool.query('UPDATE game SET game_glentered="' + num + '" WHERE game_id="' + id + '"');
            return res.status(204).json();
        }
        else if (lv === "v") {
            const [result] = await pool.query('UPDATE game SET game_gventered="' + num + '" WHERE game_id="' + id + '"');
            return res.status(204).json();
        }
    } catch (error) {
        console.error(error);
    }
}