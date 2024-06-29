import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getFixtures(req, res); 
    }
}

const getFixtures = async (req, res) => {

    const [result] = await pool.query('SELECT fixture_number FROM fixture WHERE fixture_competition="' + req.query.competition + '" GROUP BY fixture_number ORDER BY fixture_number');
    return res.status(200).json(result);
}