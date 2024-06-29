import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getCompetition(req, res);     
    }
}

const getCompetition = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM team_competition JOIN competition ON competition.competition_id=team_competition.competition WHERE competition.competition_abbreviation="' + req.query.competition + '"' /*GROUP BY team'*/)
    return res.status(200).json(result);
}