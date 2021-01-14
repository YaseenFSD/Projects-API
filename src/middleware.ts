import { Request, Response, NextFunction } from "express"
import { ObjectId } from "mongodb"
import { db } from "./db"

export const checkKey = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.api_key) {
        res.status(401).send({
            "StatusCode": 401,
            "Message": "Missing API key"
        })
        return
    }

    let key

    try {
        key = await db.collection("api_keys").findOne(new ObjectId(req.query.api_key as string))
    } catch (error) {
        res.status(401).send({
            "StatusCode": 401,
            "Message": "Incorrect API key"
        })

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

export const checkGenerationPw = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.gen_key) {
        res.status(401).send({
            "StatusCode": 401,
            "Message": "Missing Generation Key",
        })
        return
    }
    if (!req.body.key_holder) {
        res.status(400).send({
            "StatusCode": 400,
            "Message": "Missing Key holder"
        })

        return
    }

    if (req.query.gen_key === process.env.KEY_GEN_PASSWORD) {
        next()
        return
    } else {
        res.status(401).send({
            "StatusCode": 401,
            "Message": "Incorrect Generation key"
        })
        return
    }

}