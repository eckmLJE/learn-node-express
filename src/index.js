import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

import models, { sequelize } from "./models";
import routes from "./routes";

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("rwieruch")
  };
  next();
});

// Routes

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/plans", routes.plan);

// Start

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "eckm",
      email: "lucas.eckman@gmail.com",
      messages: [
        {
          text: "Learning how to use Sequelize ORM"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.User.create(
    {
      username: "cbrue",
      email: "callie.bruemmer@gmail.com",
      messages: [
        {
          text: "Along for the ride..."
        },
        {
          text: "Keep going!"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.Plan.create({
    name: "Robyn @ The Anthem",
    eventId: "4632964",
    venueId: "430286",
    date: "2019-03-09T19:00:00"
  });
};
