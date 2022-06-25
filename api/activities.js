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
                    try {
                        console.log("=================", req.user);
                        console.log ("+++++++++++++++++++++++++++++++++",req.body);
                        console.log("====================", req.user.id);
                        console.log('---------------', req.params);
                        
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
    // POST /activities (*)
    // ✕ Creates a new activity (5002 ms)

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