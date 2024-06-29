import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getUsers(req, res);     
    }
}

const getUsers = async (req, res) => {
    const [result] = await pool.query('SELECT user FROM user_competition WHERE competition="' + req.query.competition + '"')
    return res.status(200).json(result);
}