const express = require("express");
const database = require("./database/crudrepository");
const locationsRouter = require("./database/locations");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
database.initializeTable();

const connectToDatabaseAndStartServer = () => {
  const server = app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
  });

  setupGracefulShutdown(server);
};

const setupGracefulShutdown = (server) => {
  const shutdown = () => {
    server.close();
  };

  process.on("SIGTERM", shutdown); // system manager, some other application
  process.on("SIGINT", shutdown); // ctrl-c
};

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", locationsRouter);

connectToDatabaseAndStartServer();
