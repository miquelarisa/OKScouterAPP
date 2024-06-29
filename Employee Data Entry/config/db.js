import {createPool} from 'mysql2/promise';

const pool = createPool({
    /*host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'okscouter_db'*/

    database: "okscouter_db",
    user: "",
    host: "wqdnqcd7f05t.eu-west-2.psdb.cloud",
    password: "",
    ssl: {
        rejectUnauthorized: false
    }

})

export { pool };
