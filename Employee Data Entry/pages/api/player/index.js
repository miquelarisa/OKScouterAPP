import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getPlayers(req, res);
        case 'POST':
            return await savePlayer(req, res);   
        case 'PUT':
            return await updatePlayer(req, res);    
    }
}

const getPlayers = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM player ORDER BY player_name')
    return res.status(200).json(result);
}

const savePlayer = async (req, res) => {
    const {name, position, laterality, born, genero, nationality, number, picture, team} = req.body

    const [result] = await pool.query('INSERT INTO player SET ?', {
        player_name: name,
        player_position: position,
        player_laterality: laterality,
        player_born: born,
        player_gender: genero,
        player_nationality: nationality,
        player_number: number,
        player_picture: picture,
        player_team: team
    });

    return res
        .status(200)
        .json({name, position, laterality, born, genero, nationality, number, picture, team, id: result.insertId})
}

const updatePlayer = async (req, res) => {
    const {initialname, name, position, laterality, born, genero, nationality, number, picture, team} = req.body
    try {
        const [result] = await pool.query('UPDATE player SET player_name="' + name + '", player_position="' + position + '", player_laterality="' + laterality + '", player_born="' + born 
         + '", player_gender="' + genero + '", player_nationality="' + nationality + '", player_number="' + number + '", player_picture="' + picture + '", player_team="' + team 
         + '" WHERE player_name="' + initialname + '"');
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}