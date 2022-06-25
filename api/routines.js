const express = require("express");
const routinesRouter = express.Router();
const { requireUser} = require("./utils");
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







module.exports = routinesRouter;