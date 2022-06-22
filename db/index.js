// require and re-export all files in this db directory (users, activities...)
const {  createUser,
    getUser,
    getUserById,
    getUserByUsername,} = require("./users");

const { getAllActivities, createActivity , updateActivity,   getActivityById,} = require("./activities");

const { createRoutine, getRoutinesWithoutActivities, getRoutineById, getAllRoutines, destroyRoutine, getAllPublicRoutines, getAllRoutinesByUser,
getPublicRoutinesByActivity, getPublicRoutinesByUser, }  = require("./routines");

const { addActivityToRoutine, destroyRoutineActivity,updateRoutineActivity, getRoutineActivityById} = require("./routine_activities");





module.exports ={
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
}
    