import mongoose, {Schema,Document} from 'mongoose'
import {PasswordEncryption} from "../utils";

export interface IUser extends Document {
    role: number,
    name: string,
    phone: string,
    password: string,
    balance: number,
    number: number
}
const UserSchema: Schema = new Schema(
    {
        name: {type: String, required: true},
        phone: {type: String,required: true, unique: true},
        number: {type: Number, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: Number, enum: [0,1,2], required: true}, // 0-super-admin , 1 - admin , 2 - user
        balance: {type: Number, default: 0}
    }, {
        timestamps: true
    }
)
UserSchema.pre<IUser>( "save", async function ( next ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (user.isModified( "password" ) )
    {
        user.password = await PasswordEncryption( user.password );
        //user.confirm_hash = await PasswordEncryption( new Date().toString() );
    }
    //return next();
} );
const UserModel = mongoose.model<IUser>("User",UserSchema)
export default UserModel;

