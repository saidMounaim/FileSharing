import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
})

const File = mongoose.model("File", FileSchema);

export default File;