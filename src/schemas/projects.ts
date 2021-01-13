import mongoose, { Schema, Document } from "mongoose"

interface IProject extends Document {
    name: string,
    project_order: number,
    init_mvp: Date,
    team_count: number,
    img_url: string,
    techs_used: string[],
    main_language: string,
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    project_order: { type: Number, required: true, },
    init_mvp: Date,
    team_count: {type: Number, required: true },
    img_url: {type: String, unique: true},
    techs_used: {type:Array, required: true},
    main_language: {type: String, required: true}
});

export default mongoose.model<IProject>('Project', ProjectSchema);
