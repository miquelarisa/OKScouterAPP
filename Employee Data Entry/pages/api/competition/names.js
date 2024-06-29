import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getCompetition(req, res);     
    }
}

const getCompetition = async (req, res) => {
    const [result] = await pool.query('SELECT competition_abbreviation FROM competition GROUP BY competition_abbreviation')
    return res.status(200).json(result);
}