import express, { request, Request, response, Response } from "express"
import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import { uri, db } from "./db"
import { checkKey, checkGenerationPw } from "./middleware"
import Project from "./schemas/projects"


export const startServer = async () => {
    const port = process.env.PORT || 3000
    const app = express()
    app.use(express.json())

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    
    app.get("/", (req: Request, res: Response) => {
        res.redirect("/api/projects")
    })

    app.get("/api/projects", async (req: Request, res: Response) => {
        const data = await db.collection("projects").find().toArray()
        res.send(data)
    })

    app.post("/api/generate-key", checkGenerationPw, async (req: Request, res: Response) => {
        const new_key = new ObjectId()
        db.collection("api_keys").insertOne({
            "_id": new_key,
            key_holder: req.body.key_holder,
            enabled: true
        })
        res.send(new_key)
    })



    app.post("/api/project", checkKey, (req: Request, res: Response) => {
        Project.create(req.body, (err: Error) => {
            if (err){
                res.status(500).send(err)
            } else {
                res.status(200).send({
                    "StatusCode": 200,
                    "Message": "Project posted successfully"
                })
            }
        })

    })


    app.all("*", (req: Request, res: Response) => {
        res.status(404).send({
            "StatusCode": 404,
            "Message": "Not found"
        })
    })

    app.listen(port, () => {
        console.log(`Serving on port ${port}`)
    })

    process.on("unhandledRejection", (reason, promise) => {
        console.log("Unhandled Rejection at: ", reason, "Promise: ", promise)
    })
}
