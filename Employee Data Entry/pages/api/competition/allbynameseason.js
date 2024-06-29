import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getCompetition(req, res); 
    }
}

const getCompetition = async (req, res) => {

    const [result] = await pool.query('SELECT * FROM competition WHERE competition_abbreviation="' + req.query.competition + '" AND competition_season="' + req.query.season + '"');
    return res.status(200).json(result);
}