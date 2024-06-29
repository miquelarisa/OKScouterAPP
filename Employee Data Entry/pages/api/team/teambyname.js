import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getTeams(req, res);
    }
}

const getTeams = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM team WHERE team_id="' + req.query.team + '" ORDER BY team_id')
    return res.status(200).json(result);
}