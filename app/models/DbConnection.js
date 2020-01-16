const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'kiszna123$',
    database: 'nodemysql-api',
    insecureAuth: true
});

connection.connect(error => {
    if (error)
        throw error;
    console.log("Successfully connected to the database.");
});

const sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, " +
    "firstName VARCHAR(255), lastName VARCHAR(255) )";
connection.query(sql, function (err, result) {
    if (err)
        throw err;
    console.log("User table created");
});

module.exports = connection;