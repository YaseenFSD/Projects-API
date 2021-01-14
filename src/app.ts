import express, { Request, Response } from "express"
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



    app.post("/api/project", async (req: Request, res: Response) => {
        let project
        try {
            project = await Project.create(req.body)
            res.status(200).send({
                "StatusCode": 200,
                "Message": "Project posted successfully"
            })
        } catch (error) {
            res.send({
                "StatusCode": 400,
                "Message": "Invalid or incomplete data"
            })
            return
        }
        try {
            await db.collection("projects").insertOne(project)
        } catch (error) {
            res.status(500).send({
                "StatusCode": 500,
                "Message": "Internal server Error"
            })
            return
        }
        res.status(200).send({
            "StatusCode": 200,
            "Message": "Post successful"
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
