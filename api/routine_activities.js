
const express = require("express");
const routine_activitiesRouter = express.Router();
const {getRoutineById} = require("../db")

const { getRoutineActivityById,
    addActivityToRoutine,
    getRoutineActivitiesByRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,} = require("../db")

const { requireUser } = require("./utils");


routine_activitiesRouter.delete('/:routineActivityId', requireUser, async(req, res, next)=>{

    
   
    
    

    try {
          const _deleted = await destroyRoutineActivity(req.params.routineActivityId)
            
        res.send(_deleted);
        
    } catch (error) {
        next(error)
    }
})























module.exports=routine_activitiesRouter;