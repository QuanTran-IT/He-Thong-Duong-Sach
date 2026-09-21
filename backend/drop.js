const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || '12345',
    server: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'DuongSach',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

async function drop() {
    try {
        await sql.connect(config);
        await sql.query`DROP TABLE IF EXISTS proposal`;
        console.log("Dropped proposal table");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
drop();
