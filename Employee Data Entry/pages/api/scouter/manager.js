import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getmanager(req, res);
      
    }
}

const getmanager = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM scouter WHERE role="manager"')
    return res.status(200).json(result);
}