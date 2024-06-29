import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getscouter(req, res);
      
    }
}

const getscouter = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM scouter WHERE role="scouter"')
    return res.status(200).json(result);
}