import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getTeams(req, res);
        case 'POST':
            return await saveTeam(req, res);
        case 'PUT':
            return await updateTeam(req, res);
    }
}

const getTeams = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM team ORDER BY team_name')
    return res.status(200).json(result);
}

const saveTeam = async (req, res) => {
    const {id, name, gender, picture} = req.body

    const [result] = await pool.query('INSERT INTO team SET ?', {
        team_id: id,
        team_name: name,
        team_gender: gender,
        team_picture: picture,
    });

    return res
        .status(200)
        .json({id, name, gender, picture, id: result.insertId})
}

const updateTeam = async (req, res) => {
    const {id, name, gender, picture} = req.body

    try {
        const [result] = await pool.query('UPDATE team SET team_name="' + name + '", team_picture="' + picture + '" WHERE team_id="' + id + '"');
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}