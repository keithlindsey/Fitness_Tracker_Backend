

const express = require("express");
const usersRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

const { getUserByUsername, getUser, createUser, getUserById, getPublicRoutinesByUser } = require("../db");
// const { requireUser } = require("./utils");


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
            message: 'A user by that username already exists'
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



module.exports = usersRouter;