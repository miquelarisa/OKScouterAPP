import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getCompetitions(req, res);     
    }
}

const getCompetitions = async (req, res) => {
    const [result] = await pool.query('SELECT competition FROM user_competition WHERE user="' + req.query.username + '"')
    return res.status(200).json(result);
}