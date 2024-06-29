import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getGameFixture(req, res);
    }
}

const getGameFixture = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM game JOIN fixture ON game.game_fixture=fixture.fixture_id WHERE fixture_competition="' + req.query.competition + '" AND fixture_number=' + req.query.fixture)
    return res.status(200).json(result);
}