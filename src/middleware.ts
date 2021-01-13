import { Request, Response, NextFunction } from "express"
import { ObjectId } from "mongodb"
import { db } from "./db"

export const checkKey = async (req: Request, res: Response, next: NextFunction) => {
    let key
    try {
        key = await db.collection("api_keys").findOne(new ObjectId(req.query.api_key as string))
        if (key === null) {
            throw new Error("No Key was found")
        }
    } catch (error) {
        if (req.query.api_key === undefined || req.query.api_key === "") {
            res.status(401).send({
                "StatusCode": 401,
                "Message": "Missing API key"
            })
        } else {
            res.status(401).send({
                "StatusCode": 401,
                "Message": "Incorrect API key"
            })
        }
        return
    }
    if (!key.enabled) {
        res.status(403).send({
            "StatusCode": 403,
            "Message": "Key disabled"
        })
    } else {
        next()
    }

}