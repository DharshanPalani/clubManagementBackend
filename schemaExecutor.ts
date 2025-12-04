import pool from "./db.ts";

const schemaExecutor = async (log: boolean = false) => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS roles(
        role_id SERIAL PRIMARY KEY,
        role_name TEXT NOT NULL
    )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS domains(
        domain_id SERIAL PRIMARY KEY,
        domain_name TEXT NOT NULL    
    )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS clubs(
        club_id SERIAL PRIMARY KEY,
        club_name TEXT NOT NULL    
    )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS profiles(
        profile_id SERIAL PRIMARY KEY,
        display_name TEXT NULL,
        phone_no TEXT NULL,
        email TEXT NULL,
        club_id INT REFERENCES clubs(club_id),
        role_id INT REFERENCES roles(role_id),
        user_id INT NOT NULL REFERENCES users(id)
      )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS leads(
        lead_id SERIAL PRIMARY KEY,
        profile_id INT NOT NULL REFERENCES profiles(profile_id),
        domain_id INT NOT NULL REFERENCES domains(domain_id),
        club_id INT NOT NULL REFERENCES clubs(club_id)
      )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS members(
        member_id SERIAL PRIMARY KEY,
        profile_id INT NOT NULL REFERENCES profiles(profile_id),
        club_id INT NOT NULL REFERENCES clubs(club_id)
    )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS member_domains(
        id SERIAL PRIMARY KEY,
        member_id INT NOT NULL REFERENCES members(member_id),
        domain_id INT NOT NULL REFERENCES domains(domain_id),
        UNIQUE(member_id, domain_id)   
    )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS heads(
        head_id SERIAL PRIMARY KEY,
        profile_id INT NOT NULL REFERENCES profiles(profile_id),
        club_id INT NOT NULL REFERENCES clubs(club_id)
    )`);

  if (log) {
    console.log("Query executed successfully");
  }
};

export default schemaExecutor;
