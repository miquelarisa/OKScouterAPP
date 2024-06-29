import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getSeasonCompetition(req, res);     
    }
}

const getSeasonCompetition = async (req, res) => {
    const [result] = await pool.query('SELECT competition_season FROM competition WHERE competition_abbreviation="' + req.query.competition + '" ORDER BY competition_season DESC');
    return res.status(200).json(result);
}