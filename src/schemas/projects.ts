import mongoose, { Schema, Document } from "mongoose"

interface IProject extends Document {
    name: string,
    project_level: number,
    init_mvp: number,
    team_count: number,
    img_url: string,
    techs_used: string[],
    main_language: string,
    repo_link: string,
    description: string,
    website_url: string,
    more_info: string
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    project_level: { type: Number, required: true, },
    init_mvp: Number,
    team_count: {type: Number, required: true },
    img_url: String,
    techs_used: {type:Array, required: true},
    main_language: {type: String, required: true},
    repo_link: {type:String, required: true},
    description: {type: String, required: true},
    website_url: String,
    more_info: String
});

export default mongoose.model<IProject>('Project', ProjectSchema);
