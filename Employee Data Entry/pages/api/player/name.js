import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getPlayerbyName(req, res);      
    }
}

const getPlayerbyName = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM player WHERE player_name="' + req.query.name + '"')
    return res.status(200).json(result);
}