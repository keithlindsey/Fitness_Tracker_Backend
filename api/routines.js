const express = require("express");
const routinesRouter = express.Router();
const { requireUser, requiredNotSent} = require("./utils");
const { getAllPublicRoutines, createRoutine, getRoutineById, updateRoutine, destroyRoutine } = require("../db/routines");
const {getRoutineActivitiesByRoutine, addActivityToRoutine } = require("../db/routine_activities");



routinesRouter.get("/", async (req, res, next)=>{

    console.log("Dude we are having the ame pr");

    try {
        const _publicRoutines = await getAllPublicRoutines();
        res.send(_publicRoutines);
    } catch (error) {
        next(error);
    }




})


routinesRouter.post("/", requireUser, async(req, res, next) => {

    console.log("Ffffffffffffff", req.body);
    console.log(req.params,"gggggggggggggg");
    console.log(req.user,'hhhhhhhhhhhhhhhh');
    const { name, goal, isPublic } = req.body;
    const creatorId = req.user.id; 

    try {
        const _createdRoutine = await createRoutine({ creatorId, isPublic, name, goal });
        res.send(_createdRoutine);

    } catch(error) {
       next(error);
    }
});


routinesRouter.post('/:routineId/activities', async(req, res, next)=>{
      
        
    try {
const {activityId, count, duration} = req.body
const {routineId}= req.params
console.log(req.params, "777777777");

 const _new = await addActivityToRoutine({routineId, activityId, count, duration})

        console.log("jjjjjjjjj", _new);
 res.send(_new);

} catch (error) {
next(error)
}
})





routinesRouter.delete('/:routineId', requireUser, async(req, res, next)=>{
           
    try {
        console.log(req.params, "aaaaaaaa");
        // console.log(re.body,"aaaaaaaaaaaq")
        const {routineId} = req.params;
        console.log(routineId,"bitch");

        const _deletedRoutine = await destroyRoutine(routineId)
                console.log(_deletedRoutine,"aaaaaaa");
        res.send(_deletedRoutine);
    } catch (error) {
        next(error);
    }


})






module.exports = routinesRouter;