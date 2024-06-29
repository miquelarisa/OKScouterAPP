import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getDirectFoul(req, res); 
    }
}

const getDirectFoul = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM directfoul ORDER BY directfoul_id DESC LIMIT 1;')
    return res.status(200).json(result);
}
