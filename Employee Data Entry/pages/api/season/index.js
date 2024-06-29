import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getSeason(req, res);
        case 'POST':
            return await saveSeason(req, res);       
    }
}

const getSeason = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM season ORDER BY season_id DESC')
    return res.status(200).json(result);
}

const saveSeason = async (req, res) => {
    const {id, name} = req.body

    const [result] = await pool.query('INSERT INTO season SET ?', {
        season_id: id,
        season_name: name,
    });

    return res
        .status(200)
        .json({id, name, id: result.insertId})
}