const express = require("express");
const routine_activitiesRouter = express.Router();


const { getRoutineActivityById,
    addActivityToRoutine,
    getRoutineActivitiesByRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,} = require("../db")

const { requireUser } = require("./utils");



routine_activitiesRouter.patch("/routineActivityId", requireUser, async( req, res, next)=>{
try {
    console.log("hello world");
} catch (error) {
    next(error)
}


})

// routine_activitiesRouter.delete('/:routineActivityId',  requireUser,  async(req, res, next) => {
//     console.log("YEs")
//     res.send("A responses")
// })

// routine_activitiesRouter.delete('/:routineActivityId', requireUser, async(req, res, next)=>{
         
//     try {



//             const {routineActivityId} = req.params
//             const _deleted = await destroyRoutineActivity(routineActivityId)
//             console.log(_deleted, "vvvvvvvvvvv");
//             res.send(routineActivityId);

//     } catch (error) {
//         console.log(error, "bbbbbbbbbb");
//         next(error);
//     }


// })



module.exports=routine_activitiesRouter;