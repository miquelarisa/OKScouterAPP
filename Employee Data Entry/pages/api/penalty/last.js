import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getPenalty(req, res); 
    }
}

const getPenalty = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM penalty ORDER BY penalty_id DESC LIMIT 1;')
    return res.status(200).json(result);
}
