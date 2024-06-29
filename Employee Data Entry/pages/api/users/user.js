import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getUser(req, res);     
    }
}

const getUser = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM users WHERE username="' + req.query.username + '"')
    return res.status(200).json(result);
}