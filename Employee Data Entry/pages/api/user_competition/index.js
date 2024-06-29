import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getUserCompetition(req, res);
        case 'POST':
            return await saveUserCompetition(req, res);       
    }
}

const getUserCompetition = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM user_competition')
    return res.status(200).json(result);
}

const saveUserCompetition = async (req, res) => {
    const {id, user, competition} = req.body

    const [result] = await pool.query('INSERT INTO user_competition SET ?', {
        user_competition_id: id,
        user: user,
        competition: competition
    });

    return res
        .status(200)
        .json({id, user, competition, id: result.insertId})
}