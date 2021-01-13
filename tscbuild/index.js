"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app_1 = require("./app");
try {
    app_1.startServer();
}
catch (err) {
    console.log(`Server unable to start ${err}`);
}
process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at: ", reason, "Promise: ", promise);
});
