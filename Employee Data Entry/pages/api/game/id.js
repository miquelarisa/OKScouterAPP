import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getGame(req, res);
    }
}

const getGame = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM game WHERE game_id="' + req.query.id + '"');
    return res.status(200).json(result);
}