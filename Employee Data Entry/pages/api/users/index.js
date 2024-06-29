import {pool} from '../../../config/db';

export default async function handler(req, res) {

    switch(req.method) {
        case 'GET':
            return await getUsers(req, res);
        case 'POST':
            return await saveUser(req, res);
        case 'PUT':
            return await updateuser(req, res);   
    }
}

const getUsers = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM users')
    return res.status(200).json(result);
}

const saveUser = async (req, res) => {
    const {username, name, password, email} = req.body

    const [usernamevalidation] = await pool.query('SELECT * FROM users WHERE username="' + username + '"');
    if (usernamevalidation.length > 0) { return res.status(200).json("Usuario ya existe"); }

    const [emailvalidation] = await pool.query('SELECT * FROM users WHERE email="' + email + '"');
    if (emailvalidation.length > 0) { return res.status(200).json("Email ya existe"); }

    //Fer Hash de la password i guardar password y salt
    const bcrypt = require("bcrypt");
    let passwordhash = await bcrypt.hash(password, 16);

    const [result] = await pool.query('INSERT INTO users SET ?', {
        username: username,
        name: name,
        password: passwordhash,
        email: email
    });

    return res
        .status(204)
        .json({username, name, password, email, id: result.insertId})
}

const updateuser = async (req, res) => {
    const {id, username, name, password, email} = req.body
    if(password==null || password==undefined) {
        const [result] = await pool.query('UPDATE user SET username="' + username + '", name="' + name + '", email="' + email + '" WHERE username="' + id + '"');
        return res.status(204).json(result);
    }
    else {
        //Fer Hash de la password i guardar password y salt
        const bcrypt = require("bcrypt");
        let passwordhash = await bcrypt.hash(password, 16);
        const [result] = await pool.query('UPDATE user SET username="' + username + '", name="' + name + '", email="' + email + '", password="' + passwordhash + '" WHERE username="' + id + '"');

        return res.status(204).json(result);
    }
}