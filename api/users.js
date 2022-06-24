

const express = require("express");
const usersRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

const { getUserByUsername, getUser, createUser, getUserById, getPublicRoutinesByUser } = require("../db");
const { requireUser } = require("./utils");


usersRouter.post("/register", async(request, response, next) => {
    
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^");
    try {
        const { username, password } = request.body;
            console.log(username, password, "!!!!!!!!!!!!!!!!!!!!");
        const _user = await getUserByUsername(username);
            console.log(_user, "@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("%%%%%%%%%%%%%%%%%%");
        if (_user) {
          next({
            name: 'UserExistsError',
            message: 'dont break'
          });
        } else if (password.length < 8) {
          next({
            name: 'PasswordLengthError',
            message: 'Password Too Short!'
          });

        } else {
          const user = await createUser({ username, password });
          if (!user) {
            next({
              name: 'UserCreationError',
              message: 'There was a problem registering you. Please try again.',
            });
          } else {
            const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET);
            response.send({ user, message: "you're signed up!", token });
          }
        }
      } catch (error) {
        next(error)
      }
    })


    usersRouter.post('/login', async (req,res, next)=>{
      const {username, password} = req.body;
      console.log("Helping riley with",req.body);
  
      if (!username || !password) {
        next ({
          name: "MissingCredentialError",
          message: "please supply both a username and password"
        });
      }
  
       try {
         const user = await getUser({username,password});
          console.log("we got there","******************************");
         if (!user){
          next({
            name:'IncorrectCredentialError',
            message: 'Username or password is incorrect'
          });
        
  
         } else {
              console.log(user),"This is the HOMIE____________________________";
          const token = jwt.sign({ id: user.id, username: username}, JWT_SECRET);
           res.send({message:"you're logged in!", token: token});
      
         }
       }catch (error){
         console.log(error);
         next(error);
       }
  })

  usersRouter.get('/me',requireUser, async (req, res, next)=>{
    //  const {username} = req.params;

     try {
          // const _user = await getUserByUsername({username})
          res.send(req.user);
     } catch (error) {
       next(error);
     }

  })
  


  usersRouter.get('/:username/routines', async (req, res, next)=>{
        const {username} = req.params;

        try {
          const _user = await getPublicRoutinesByUser({username})

          res.send(_user);
        } catch (error) {
          next(error);
        }




  })



module.exports = usersRouter;