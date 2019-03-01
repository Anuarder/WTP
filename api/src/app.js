const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config/config");
const mongoose = require("mongoose");

const app = express();

//Router initialize
const userRouter = require("./routers/user");
const groupRouter = require("./routers/group");
const testRouter = require('./routers/test');
//Helpers
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());

// Routers
app.use(userRouter);
app.use(groupRouter);
app.use(testRouter);

// Start server
mongoose.connect(config.database_url, { useNewUrlParser: true }, err => {
    if (err) throw err;
    app.listen(config.port, () =>
        console.log("\u2705  Server running on port " + config.port)
    );
});