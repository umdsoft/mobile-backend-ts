import mongoose , {Schema, Document} from "mongoose";
import {IWeek} from "./Weeks";

export interface ICourse extends Document{
    name: string,
    type: string,
    video: string,
    week: IWeek | string,
    description: string
}

const CourseSchema: Schema = new Schema({
    name: {type: String,required: true},
    type: {type: String, enum: ['arriq','orta','semiz'], required: true},
    video: {type: String, required: true},
    description: {type: String, required: true},
    week: {
        type: Schema.Types.ObjectId,
        ref: "Week",
        required: true
    }
},{timestamps: true})

const CourseModel = mongoose.model<ICourse>("Course",CourseSchema)
export default CourseModel;
