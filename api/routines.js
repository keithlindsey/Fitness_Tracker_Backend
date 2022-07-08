const express = require("express");
const routinesRouter = express.Router();
const { requireUser, requiredNotSent} = require("./utils");
const { getAllPublicRoutines, createRoutine, getRoutineById, updateRoutine, destroyRoutine } = require("../db/routines");
const {getRoutineActivitiesByRoutine, addActivityToRoutine } = require("../db/routine_activities");



routinesRouter.get("/", async (req, res, next)=>{
    try {
        const _publicRoutines = await getAllPublicRoutines();
        res.send(_publicRoutines);
    } catch (error) {
        next(error);
    }
})


routinesRouter.post("/", requireUser, async(req, res, next) => {
    const { name, goal, isPublic } = req.body;
    const creatorId = req.user.id; 

    try {
        const _createdRoutine = await createRoutine({ creatorId, isPublic, name, goal });
        res.send(_createdRoutine);

    } catch(error) {
       next(error);
    }
});




routinesRouter.post("/:routineId/activities", requiredNotSent({requiredParams: ['activityId', 'count', 'duration']}), async(req, res, next) => {
    
    const {activityId, count, duration} = req.body
    const {routineId} = req.params; 

    try {

        const _compRoutine = await getRoutineActivitiesByRoutine({id: routineId});
        const _routineActivity = _compRoutine && _compRoutine.filter(_activity => _activity.activityId === activityId);
        
        
        if (_routineActivity && _routineActivity.length){
            next({
                            name: 'RoutineActivityExistsError',
                            message: "already exists"
                          });
        } else {
            const _attachActivty = await addActivityToRoutine({routineId, activityId, count, duration});
            if (_attachActivty){
                res.send(_attachActivty);
            } else {
                next({
                                  name: 'FailedToCreate',
                                  message: "There was an error"
                                });
            }
        }
        
    } catch (error) {
        throw(error)
        
    }
});




routinesRouter.delete('/:routineId', requireUser, async(req, res, next)=>{
           
    try {
         const {routineId} = req.params;
          const _deletedRoutine = await destroyRoutine(routineId)
                
        res.send(_deletedRoutine);
    } catch (error) {
        next(error);
    }
})


routinesRouter.patch('/:routineId', requireUser, requiredNotSent({requiredParams: ['name', 'goal', 'isPublic'], atLeastOne: true}), async (req, res, next) => {
    const {routineId} = req.params;
    const {isPublic, name, goal} = req.body;
    const getRoutine = await getRoutineById(routineId);
  
    try {
      
      if(!getRoutine) {
        next()
      } else if(getRoutine.creatorId !== req.user.id) {
        next();
      } else {
        const updatedRoutine = await updateRoutine({id: routineId, isPublic, name, goal});
        if(updatedRoutine) {
          res.send(updatedRoutine);
        } else {
          next()
        }
      }
    } catch (error) {
      next(error);
    }
  });





module.exports = routinesRouter;