import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getGamesFixture(req, res);
        case 'DELETE':
            return await deleteGamesFixture(req, res);
    }
}

const getGamesFixture = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM game WHERE game_fixture="' + req.query.id + '"');
    return res.status(200).json(result);
}

const deleteGamesFixture = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM game WHERE game_fixture="' + req.query.fixture + '"');
        return res.status(204).json();
    } catch (error) {
        console.error(error);
    }
}