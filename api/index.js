const client = require("../db");
const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;
const { getUserById } = require("../db");


apiRouter.use(async (req, res, next) => {
    
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    
    if (!auth) { 
      next();
        
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch (error) {
        next(error);
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });
  
  apiRouter.use((req, res, next) => {
    if (req.user) {
      
    }
    next();
  });


apiRouter.get("/health", async(req, res, next) => {
    res.send({
        message: "Its Healthy"
    })
})


const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const activitiesRouter = require("./activities");
apiRouter.use("/activities", activitiesRouter);

const routinesRouter = require("./routines");
apiRouter.use("/routines", routinesRouter);

const routine_activitiesRouter = require("./routine_activities");
apiRouter.use("/routine_activities", routine_activitiesRouter);

module.exports = apiRouter;

