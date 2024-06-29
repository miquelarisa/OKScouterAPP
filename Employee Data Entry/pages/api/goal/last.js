import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getGoal(req, res); 
    }
}

const getGoal = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM goal ORDER BY goal_id DESC LIMIT 1;')
    return res.status(200).json(result);
}
