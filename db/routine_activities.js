const client = require('./client')

async function getRoutineActivityById(id){
    try {
        const {rows: [routine_activity]} = await client.query(`
            SELECT * FROM routine_activities
            WHERE id=$1;
        `[id]);
        console.log("kkkkkkkkkkkkkkkk", routine_activity);
        return routine_activity;
    } catch (error) {
        throw error
    }
}


async function addActivityToRoutine({
    routineId,
    activityId,
    count,
    duration
}) {

    try {
        const { rows: [routine_activity] } = await client.query(`
        INSERT INTO routine_activities("routineId", "activityId", "duration", "count") 
        VALUES($1, $2, $3, $4)
        ON CONFLICT ("routineId", "activityId")
        DO NOTHING 
        RETURNING *;
      `, [routineId, activityId, duration, count]);

        return routine_activity;
    } catch (error) {
        throw error;
    }
}
async function getRoutineActivitiesByRoutine({ id }) {
    try {
        const { rows:  activities  } = await client.query(`
        SELECT "activityId"
        FROM routine_activities
        WHERE "routineId"=$1
        `, [id])

        return activities
    } catch (error) {
        throw error
    }
}

async function updateRoutineActivity ({id, count, duration}) {
    try {
        const {rows:[routine_activity]} = await client.query(`
            UPDATE routine_activities
            SET count=$1,
            duration=$2
            WHERE id=$3
            RETURNING *;
        
        
        
        `,[count,duration,id]);
        return routine_activity;
    } catch (error) {
        
    }




}

async function destroyRoutineActivity(id) {
    try {
        const { rows: [ deleteRoutineActivity ] } = await client.query(`
        DELETE 
        FROM routine_activities
        WHERE id=$1
        RETURNING *;
        `,[id])

        return deleteRoutineActivity
    } catch (error) {
        throw error
    }
}

// async function canEditRoutineActivity(routineActivityId, userId) {



// }

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
//   canEditRoutineActivity,
};
