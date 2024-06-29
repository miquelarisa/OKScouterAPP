import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getGames(req, res);
    }
}

const getGames = async (req, res) => {
    const [result] = await pool.query('SELECT game.game_id, competition.competition_abbreviation, competition.competition_season, fixture.fixture_number, game.game_localteam, game.game_localgoals, game.game_visitantgoals, game.game_glentered, game.game_gventered, game.game_visitantteam FROM game JOIN fixture ON game.game_fixture=fixture.fixture_id JOIN competition ON fixture.fixture_competition=competition.competition_id JOIN team_competition ON team_competition.competition=competition.competition_id WHERE competition.competition_abbreviation="' + req.query.competition + '" GROUP BY game.game_id;')
    return res.status(200).json(result);
}