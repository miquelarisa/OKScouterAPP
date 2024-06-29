import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getpenaltys(req, res);
        case 'DELETE':
            return await deletepenaltys(req, res);    
    }
}

const getpenaltys = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM penalty WHERE penalty_match="' + req.query.idgame + '"')
    return res.status(200).json(result);
}

const deletepenaltys = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM penalty WHERE penalty_match="' + req.query.idgame + '"');
        return res.status(204).json(result);
    } catch (error) {
        console.error(error);
    }
}

const deleteGame = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM game WHERE game_id=' + req.query.id);
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}