const client = require('./client');
const { attachActivitiesToRoutines } = require("./activities");


async function getRoutineById(id) {
    try {
      const { rows: [ routine ] } = await client.query(`
        SELECT * 
        FROM routines
        WHERE id = $1
      `, [id]);

      return routine;
    } catch (error) {
      throw error;
    }
  }

async function getRoutinesWithoutActivities(){
    try {
        const {rows} = await client.query(`
        SELECT * FROM routines
        `)
        return rows;
    } catch (error) {
        throw (error);
    }
}

async function getAllRoutines() {
    try {
        const { rows: routines } = await client.query(`
        SELECT *, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id
        `);

        return attachActivitiesToRoutines(routines);
    } catch (error) {
        throw error;
    }
}

async function getAllRoutinesByUser({username}) {
    try {
    
      
      const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id 
      WHERE username = $1
      `, [username]);
            
      return attachActivitiesToRoutines(routines);
    } catch (error) {
      throw error
    }
  }

  async function getPublicRoutinesByUser({username}) {
    try {
            
      const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id 
      WHERE username = $1
      AND "isPublic" = true
      `, [username]);
          
      return attachActivitiesToRoutines(routines);
    } catch (error) {
      throw error
    }
  }

async function getAllPublicRoutines() {
    try {
      const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      WHERE "isPublic" = true
      `);
      return attachActivitiesToRoutines(routines);
    } catch (error) {
      throw error
    }
  }

  async function getPublicRoutinesByActivity({id}) {
    try {
      const { rows: routines } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id
        JOIN routine_activities ON routine_activities."routineId" = routines.id
        WHERE routines."isPublic" = true
        AND routine_activities."activityId" = $1;
      `, [id]);

      return attachActivitiesToRoutines(routines);
    } catch (error) {
      throw error;
    }
  }

async function createRoutine({
    creatorId,
    isPublic,
    name, 
    goal}) {
  try {
    const { rows: [ routine ] } = await client.query(`
        INSERT INTO routines ("creatorId", "isPublic", "name", "goal")
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `, [creatorId, isPublic, name, goal]);

    return routine;
  } catch (error) {
    throw error;
  }
}


async function updateRoutine(fields) {
  const { id } = fields;
  delete fields.id;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    const {rows: [updatedRoutine],} = await client.query(
      `
            UPDATE routines
            SET ${setString}
            WHERE id = ${id}
            RETURNING*;
        `,
      Object.values(fields)
    );

    return updatedRoutine;
  } catch (error) {
    throw error;
  }
}






async function destroyRoutine(id) {
    try {
        const { rows: [ deletedRoutine ] } = await client.query(`
        DELETE FROM routines
        WHERE id=$1
        RETURNING *;
        `, [id])

        const { rows } = await client.query(`
        DELETE FROM routine_activities
        WHERE "routineId"=$1
        `, [id])
           
        return deletedRoutine
    } catch (error) {
        throw error
    }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
destroyRoutine,
updateRoutine,
}