import {pool} from '../../../config/db';

import axios from 'axios';
import {hash, compare, genSalt} from 'bcrypt';


export default async function handler(req, res) {

    switch(req.method) {
        case 'POST':
            return await checklogin(req, res);
    }
}

const checklogin = async (req, res) => {
    const {username, password} = req.body
    const [user] = await pool.query('SELECT * FROM scouter WHERE username="' + username + '"');


    if(user.length < 1) { return res.status(401).json("Usuario o contraseña incorrecto"); }

    compare(password, user[0].password).then((match) =>{
        if(match) {
            let result = user;
            result.password = undefined;
            result.salt = undefined;
            return res.status(200).json(result);
        }
        else{ return res.status(401).json("Usuario o contraseña incorrecto"); }
    });
}