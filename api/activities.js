const express = require("express");
const activitiesRouter = express.Router();

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET = "neverTell" } = process.env;
const { requireUser,  } = require("./utils");

const {  getAllActivities,
    getActivityById,
    getActivityByName,
    attachActivitiesToRoutines,
    createActivity,
    updateActivity,
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
  } = require("../db")


  apiRouter.use('/:activityId/routines', async(req, res, next)=>{
    // review the helper function from the DB
        console.log(req.params,")))))))))))))))))))))))))))")


    try {

        const _activities = await getPublicRoutinesByActivity({id:req.params.activityId});

       if (_activities){
           res.send(_activities)
       } else{
           next(
        {
            name: 'ActivityExistsError',
            message:`activity doestn exist`,
          })}

    } catch (error) {
        next(error);
    }
})



module.exports = activitiesRouter;