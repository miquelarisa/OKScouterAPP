import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getscouter(req, res);
        case 'POST':
            return await savescouter(req, res);
        case 'PUT':
            return await updatescouter(req, res);
    }
}

const getscouter = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM scouter')
    return res.status(200).json(result);
}

const savescouter = async (req, res) => {
    const {username, name, password, role, email} = req.body

    const [usernamevalidation] = await pool.query('SELECT * FROM scouter WHERE username="' + username + '"');
    if (usernamevalidation.length > 0) { return res.status(200).json("Usuario ya existe"); }

    const [emailvalidation] = await pool.query('SELECT * FROM scouter WHERE email="' + email + '"');
    if (emailvalidation.length > 0) { return res.status(200).json("Email ya existe"); }

    //Fer Hash de la password i guardar password y salt
    const bcrypt = require("bcrypt");
    let passwordhash = await bcrypt.hash(password, 16);

    const [result] = await pool.query('INSERT INTO scouter SET ?', {
        username: username,
        name: name,
        password: passwordhash,
        email: email,
        role: role
    });

    return res
        .status(204)
        .json({username, name, email, id: result.insertId})
}

const updatescouter = async (req, res) => {
    const {id, username, name, password, email} = req.body
    if(password==null || password==undefined) {
        const [result] = await pool.query('UPDATE scouter SET username="' + username + '", name="' + name + '", email="' + email + '" WHERE username="' + id + '"');
        return res.status(204).json(result);
    }
    else {        
        //Fer Hash de la password i guardar password y salt
        const bcrypt = require("bcrypt");
        let passwordhash = await bcrypt.hash(password, 16);
        const [result] = await pool.query('UPDATE scouter SET username="' + username + '", name="' + name + '", email="' + email + '", password="' + passwordhash + '" WHERE username="' + id + '"');

        return res.status(204).json(result);
    }
}