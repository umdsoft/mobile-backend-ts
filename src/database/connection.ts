import mongoose from "mongoose";

mongoose.connect(
    "mongodb://localhost:27017/mobile_app",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    },
    ( err: any ) => {
        if ( err ) {
            throw Error( err );
        }
        console.log('connect DB')
    }
);
