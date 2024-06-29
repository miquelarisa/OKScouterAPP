import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getFixtureData(req, res); 
    }
}

const getFixtureData = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM fixture JOIN competition ON fixture.fixture_competition=competition.competition_id WHERE fixture.fixture_id="' + req.query.id + '"');
    return res.status(200).json(result);
}