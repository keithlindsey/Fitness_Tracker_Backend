
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

    console.log("just do it damnit!!", req.params)
    const routine = await getRoutineById(req.params.routineActivityId)
    console.log(routine, "nike2");
    console.log(req.user, "reebok");
    // const {creatorId} = routine
    // console.log (creatorId, "nike3");

    try {

        const _deleted = await destroyRoutineActivity(req.params.routineActivityId)
            console.log(_deleted, "nike");
        res.send(_deleted);
        
    } catch (error) {
        
    }
})
















// routine_activitiesRouter.use('/', async(req, res, next)=>{
//     console.log("wu tang");
// })

// routine_activitiesRouter.delete('/:routineActivityId', requireUser, async(req, res, next)=>{
//         console.log(req.params.routineActivityId, "bradly")
//     //  const user = req.user
//     //  console.log(user, "keef");
//     //  const _routine = getRoutineById(req.params.routineActivityId);
//     //  console.log(_routine, "corey");
     
 
         
//     // console.log('hi')
//     // try {
     

 

//     //     // if (user.id !== routine.creatorId){
//     //     //     next(error)
          

//     //     // }
//     //      const _deleted = destroyRoutineActivity(req.params.routineActivityId)
 
//     //      res.send({success: true, ..._deleted})

          

//     // } catch (error) {
//     //     console.log(error, "bbbbbbbbbb");
//     //     next(error);
//     // }


// }
// )






module.exports=routine_activitiesRouter;