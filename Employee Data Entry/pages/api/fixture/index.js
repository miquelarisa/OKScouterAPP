import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getfixtures(req, res);
        case 'POST':
            return await savefixture(req, res);
        case 'DELETE':
            return await deletefixture(req, res);   
    }
}

const getfixtures = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM fixture')
    return res.status(200).json(result);
}

const savefixture = async (req, res) => {
    const {id, competition, number} = req.body

    const [result] = await pool.query('INSERT INTO fixture SET ?', {
        fixture_id: id,
        fixture_competition: competition,
        fixture_number: number
    });

    return res
        .status(200)
        .json({id, competition, number, id: result.insertId})
}

const deletefixture = async (req, res) => {
    const [result] = await pool.query('DELETE FROM fixture WHERE fixture_id="' + req.query.id + '"');
    return res.status(204).json();
}