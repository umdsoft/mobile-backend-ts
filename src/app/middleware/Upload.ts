import multer from 'multer'
import md5 from 'md5'
import path from "path";

const defaultDirectory = './uploads/';

export default {
    directory: defaultDirectory,
    storage: multer.diskStorage( {
        destination: defaultDirectory,
        filename ( request, file, callback ) {
            // console.log( request );
            // @ts-ignore
            const fileName = `${md5(new Date())}.${path.extname(file.originalname)}`
            // const fileName = `uploaded_${file.originalname}`;
            return callback( null, fileName );
        },
    } ),
};
