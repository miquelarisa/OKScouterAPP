import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getCompetitionName(req, res);     
    }
}

const getCompetitionName = async (req, res) => {
    const [result] = await pool.query('SELECT competition_abbreviation FROM competition WHERE competition_season="' + req.query.season + '"');
    return res.status(200).json(result);
}