import mongoose, {Schema,Document} from 'mongoose'

export interface IWeek extends Document{
    name: string
}
const WeekSchema: Schema = new Schema({
    name: {type: String, required: true}
}, {timestamps: true}
    )

const WeekModel = mongoose.model<IWeek>("Week",WeekSchema)
export default WeekModel;
