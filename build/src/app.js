import { launchServer } from "./server.js";
import { configuration } from "./config/config.js";
import * as mongoose from "mongoose";
mongoose.connect(configuration.mongoUri)
    .then(() => {
    console.log("MongoDB successfully connected");
    launchServer();
})
    .catch(() => {
    console.log("Something went wrong");
});
