import {createPool} from 'mysql2/promise';

const pool = createPool({
    /*host: 'localhost',
    user: 'root',
    password: '2302Arisa',
    port: 3306,
    database: 'okscouter_db'*/

    database: "okscouter_db",
    user: "ovwx6fr8jyzy",
    host: "wqdnqcd7f05t.eu-west-2.psdb.cloud",
    password: "pscale_pw_OahRKXlzeN9LtWb3oYdEqdRuO2KQKJY9m4GjTw-S8Dc",
    ssl: {
        rejectUnauthorized: false
    }

})

export { pool };