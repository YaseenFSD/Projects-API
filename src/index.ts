import express from "express"

// interface Project {
//     name: string,
//     int_mvp: Date,
//     project_order: number,
// }
// type Projects = Project[]
const startServer = () => {

    const port = process.env.PORT || 3000
    const app = express()

    app.get("/project1", (req, res) => {
        res.send("yoooooo")
    })

    app.get("/projects", (req, res) => {
        // let projects: Projects
        // projects = [
        //     {
        //         name: "whatever",
        //         int_mvp: new Date(),
        //         project_order: 1
        //     },
        // ]
        // res.send(projects)
    })


    app.listen(port, () => {
        console.log(`Serving on port ${port}`)
    })

}

try {
    startServer()
} catch (err) {
    console.log(`Server unable to start ${err}`)
}

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at: ", reason, "Promise: ", promise)
})
