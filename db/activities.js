const client = require("./client")


async function getAllActivities() {
    try {
        const {rows} = await client.query(`
            SELECT * FROM activities;
        `)
            return rows;

    } catch (error) {
        throw error;
    }

}

async function getActivityById(id) {
    try {
        const { rows: [ activity ] } = await client.query(`
        SELECT *
        FROM activities
        WHERE id=$1
      `, [id]);

        return activity;
    } catch (error) {
        throw error;
    }
}

async function getActivityByName(name){
    try {
      const {rows: [activity]} = await client.query(`
        SELECT * FROM activities
        WHERE name = $1
      `, [name]);
      return activity;
    } catch (error) {
      throw error;
    }
  }
async function attachActivitiesToRoutines(routines) {
   
    const routinesToReturn = [...routines];
    const joins = routines.map((_, index) => `$${index + 1}`).join(', ');
    const routineIds = routines.map(routine => routine.id);
    if (!routineIds?.length) return [];
    
    try {
      
      const { rows: activities } = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
        FROM activities 
        JOIN routine_activities ON routine_activities."activityId" = activities.id
        WHERE routine_activities."routineId" IN (${ joins });
      `, routineIds);
  
      
      for(const routine of routinesToReturn) {
       
        const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
       
        routine.activities = activitiesToAdd;
      }
      return routinesToReturn;
    } catch (error) {
      throw error;
    }
  }

async function createActivity({ name, description }) {
    try {
        const { rows: [ activity ] } = await client.query(`
        INSERT INTO activities (name, description) 
        VALUES($1, $2) 
        RETURNING *;
      `, [name, description]);

        return activity;
    } catch (error) {
        throw error;
    }
}


async function updateActivity({ id, name, description }) {

    try {
        const { rows: [ activity ] } = await client.query(`
        UPDATE activities
        SET name=$1,
        description=$2
        WHERE id=$3
        RETURNING *;
      `, [name, description, id]);

        return activity;
    } catch (error) {
        throw error;
    }
}


module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}
