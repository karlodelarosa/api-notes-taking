import mysql, { Connection, MysqlError } from 'mysql';

const db: Connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

db.connect((err: MysqlError) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database!');
});

export default db;