import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getdirectfouls(req, res);
        case 'DELETE':
            return await deletedirectfouls(req, res);    
    }
}

const getdirectfouls = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM directfoul WHERE directfoul_match="' + req.query.idgame + '"')
    return res.status(200).json(result);
}

const deletedirectfouls = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM directfoul WHERE directfoul_match="' + req.query.idgame + '"');
        return res.status(204).json(result);
    } catch (error) {
        console.error(error);
    }
}