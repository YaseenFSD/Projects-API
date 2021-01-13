import express, { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import { uri, db } from "./db"
import { checkKey } from "./middleware"


export const startServer = async () => {
    const port = process.env.PORT || 3000
    const app = express()
    app.use(express.json())

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    
    app.use(checkKey)

    app.get("/projects", async (req: Request, res: Response) => {
        const data = await db.collection("projects").find().toArray()
        res.send(data)
    })


    app.listen(port, () => {
        console.log(`Serving on port ${port}`)
    })

}
