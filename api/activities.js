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


  activitiesRouter.patch('/:activities', requireUser, async(req, res, next)=>{
    const {activities} = req.params;
    const {name, description} = req.body;

    console.log("--------------", name);
    try {
        // console.log('---------------', req.params);
        // console.log('-------------', req.body);

          

            const _updateActivity = await updateActivity({id: activities, name, description});
                console.log("_updateActivity", _updateActivity );
            res.send(_updateActivity);
        
    } catch (error) {
        next(error);
    }


})
    



    activitiesRouter.get("/",async(req, res, next)=>{
                console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
            try {
                const _activities = await getAllActivities();

                res.send(_activities)
            } catch (error) {
                throw error;
            }



    })
    

        activitiesRouter.post('/', requireUser, async(req, res, next)=>{
         

            

            try {
                
                const _newRoutine = await createActivity(req.body);

                res.send(_newRoutine);
                
            } catch (error) {
                next(error);
            }


        })

       



  activitiesRouter.get('/:activityId/routines', async(req, res, next)=>{
    // review the helper function from the DB
        console.log(req.params,"llllllllllllll")


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