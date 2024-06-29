import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getCompetitions(req, res);
        case 'POST':
            return await saveCompetition(req, res);
        case 'DELETE':
            return await deleteCompetition(req, res);   
        case 'PUT':
            return await updateCompetition(req, res);
    }
}

const getCompetitions = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM competition')
    return res.status(200).json(result);
}

const saveCompetition = async (req, res) => {
    const {id, name, season, abbreviation, gender, picture} = req.body

    const [result] = await pool.query('INSERT INTO competition SET ?', {
        competition_id: id,
        competition_name: name,
        competition_season: season,
        competition_abbreviation: abbreviation,
        competition_picture: picture,
        competition_gender: gender
    });

    return res
        .status(200)
        .json({id, name, season, abbreviation, picture, id: result.insertId})
}

const deleteCompetition = async (req, res) => {
    const [result] = await pool.query('DELETE FROM competition WHERE competition_abbreviation="' + req.query.abr + '" and competition_season="' + req.query.season + '"');
    return res.status(204).json();
}

const updateCompetition = async (req, res) => {
    const {id, name, gender, picture} = req.body
    try {
        const [result] = await pool.query('UPDATE competition SET competition_name="' + name + '", competition_picture="' + picture + '", competition_gender="' + gender + '" WHERE competition_id="' + id + '"');
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}