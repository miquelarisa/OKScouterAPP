import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getTeamCompetition(req, res);
        case 'POST':
            return await saveTeamCompetition(req, res);
        case 'DELETE':
            return await deleteTeamCompetition(req, res);
    }
}

const getTeamCompetition = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM team_competition')
    return res.status(200).json(result);
}

const saveTeamCompetition = async (req, res) => {
    const {id, team, competition} = req.body

    const [result] = await pool.query('INSERT INTO team_competition SET ?', {
        team_competition_id: id,
        team: team,
        competition: competition,
    });

    return res
        .status(200)
        .json({id, team, competition, id: result.insertId})
}

const deleteTeamCompetition = async (req, res) => {
    const [result] = await pool.query('DELETE FROM team_competition WHERE team_competition_id="' + req.query.id + '"');
    return res.status(204).json();
}