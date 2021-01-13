import mongoose from "mongoose"

export const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@projects-db.iksy4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
export const db = mongoose.connection