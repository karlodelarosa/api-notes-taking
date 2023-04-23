import mysql, { Connection, MysqlError } from 'mysql';

const db: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'notes-db'
});

db.connect((err: MysqlError) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database!');
});

export default db;