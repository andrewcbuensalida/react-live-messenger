const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const pool = process.env.DATABASE_URL
	? new Pool({
			connectionString: process.env.DATABASE_URL,
			ssl: { rejectUnauthorized: false },
	  })
	: new Pool({
			database: process.env.DATABASE_NAME,
			host: process.env.DATABASE_HOST,
			password: process.env.DATABASE_PASSWORD,
			user: process.env.DATABASE_USER,
			port: process.env.DATABASE_PORT,
	  });

const initDb = async () => {
	try {
		const sql = fs.readFileSync(
			path.join(__dirname, "database.sql"),
			"utf8"
		);
		await pool.query(sql);
		console.log("Database initialized successfully");
	} catch (err) {
		console.error("Error initializing database", err);
	} finally {
		pool.end();
	}
};

initDb();
