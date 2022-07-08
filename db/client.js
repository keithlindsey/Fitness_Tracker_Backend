

const { Client } = require('pg');



// const client = new Client({
//     connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/fitness-dev',
//     // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
//   });

 const client = new Client(process.env.DATABASE_URL || "postgres://localhost:5432/fitness-dev");

module.exports = client