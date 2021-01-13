require('dotenv').config()
import { startServer } from "./app"

try {
    startServer()
} catch (err) {
    console.log(`Server unable to start ${err}`)
}

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at: ", reason, "Promise: ", promise)
})