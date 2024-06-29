import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getUsernames(req, res);     
    }
}

const getUsernames = async (req, res) => {
    const [result] = await pool.query('SELECT username FROM users')
    return res.status(200).json(result);
}