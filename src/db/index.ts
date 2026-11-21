import {Pool} from "pg";
import {config} from "../config";

export const pool = new Pool({
  connectionString: config.connection_string
})
// console.log(pool)

export const initDb = async () => {
 try {
   await pool.query(`
  CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT,
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
    )
 `)
   console.log('database connected')
 } catch (err) {
   console.error(err)
   
 }
}