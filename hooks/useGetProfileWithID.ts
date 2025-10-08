import pool from "../db.ts"


const useGetProfileWithID = async(id : number) => {

  const profileData = await pool.query(
    `SELECT * FROM profile WHERE id = $1`,
    [id]
  )

  if(profileData.rows.length > 0) {
    return profileData.rows[0];
  } else {
    return null;
  }

}

export default useGetProfileWithID
