import pool from "../db.ts"

const useGetRoleWithID = async (roleID : number) => {
  const result = await pool.query(
      `SELECT * FROM roles WHERE id = $1`,
      [roleID]
  );

  return result.rows[0];

}

export default useGetRoleWithID
