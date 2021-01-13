import express from "express"
import mongoose from "mongoose"


export const startServer = async () => {
    const port = process.env.PORT || 3000
    const app = express()
    app.use(express.json())
    // console.log(process.env.JWT_SIGNATURE)

    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@projects-db.iksy4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const db = mongoose.connection
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


    app.get("/projects", async (req, res) => {
        const data = await db.collection("projects").find().toArray()
        res.send(data)
    })


    app.listen(port, () => {
        console.log(`Serving on port ${port}`)
    })

}
