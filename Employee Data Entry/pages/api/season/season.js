import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getSeason(req, res);     
    }
}

const getSeason = async (req, res) => {
    const [result] = await pool.query('SELECT season_id FROM season WHERE season_id="' + req.query.id + '"')
    return res.status(200).json(result);
}