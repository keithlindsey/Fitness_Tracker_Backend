

const client = require("./client");
const {  createUser,
    getUser,
    getUserById,
    getUserByUsername,} = require("./users");

const { getAllActivities, createActivity , updateActivity,   getActivityById,} = require("./activities");

const { createRoutine, getRoutinesWithoutActivities, getRoutineById, getAllRoutines, destroyRoutine, getAllPublicRoutines, getAllRoutinesByUser,
getPublicRoutinesByActivity, getPublicRoutinesByUser, updateRoutine }  = require("./routines");

const { addActivityToRoutine, destroyRoutineActivity,updateRoutineActivity, getRoutineActivityById,getRoutineActivitiesByRoutine } = require("./routine_activities");





module.exports ={
    client,
    createUser,
    getUser,
    getUserById,
    getAllActivities,
    createActivity,
    createRoutine,
    getRoutinesWithoutActivities,
    addActivityToRoutine,
    getUserByUsername,
    updateActivity,
    getActivityById,
    getRoutineById,
    getAllRoutines,
    destroyRoutine,
    destroyRoutineActivity, 
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByActivity,
    getPublicRoutinesByUser,
    getRoutineActivityById,
    updateRoutineActivity,
    getRoutineActivitiesByRoutine,
    updateRoutine,
   
    
  
}
    