import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getCompetitionName(req, res);     
    }
}

const getCompetitionName = async (req, res) => {
    const [result] = await pool.query('SELECT competition_name FROM competition WHERE competition_abbreviation="' + req.query.abr + '" ORDER BY competition_season DESC;')
    return res.status(200).json(result);
}