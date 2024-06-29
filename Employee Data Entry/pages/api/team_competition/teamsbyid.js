import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getTeam(req, res);     
    }
}

const getTeam = async (req, res) => {
    const [result] = await pool.query('SELECT team FROM team_competition WHERE competition="' + req.query.competition + '"')
    return res.status(200).json(result);
}