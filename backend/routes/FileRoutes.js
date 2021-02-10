import express from 'express';
import path from 'path';
import File from "../models/FileModel.js";

const router = express.Router();
const __dirname = (() => { let x = path.dirname(decodeURI(new URL(import.meta.url).pathname)); return path.resolve((process.platform == "win32") ? x.substr(1) : x); })();


// @DESC Upload File
// @ROUTE /api/upload
// @ACCESS PUBLIC
router.post("/upload", async (req, res) => {
    try {
        if (!req.files) {
            res.status(401).json({ success: false, message: "File not found" });
        } else {
            let file = req.files.file;
            console.log(file)
            const savedFile = new File({
                name: file.name,
                mimetype: file.mimetype,
                size: file.size
            })
            await savedFile.save();
            let uploadPath = __dirname + '\\..\\uploads\\' + file.name;
            file.mv(uploadPath);
            res.status(201).json({ success: true, message: "File uploaded" });
        }
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
})

// @DESC Get All Files
// @ROUTE /api/files
// @ACCESS PUBLIC
router.get("/files", async (req, res) => {
    try {
        const allFiles = await File.find({});
        res.status(201).json({ success: true, data: allFiles });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
})

// @DESC Download File
// @ROUTE /api/download
// @ACCESS PUBLIC
router.get("/download/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const file = await File.findById(id);
            // const filePath = __dirname + '\\..\\uploads\\' + file.name;
            let fileLocation = __dirname + '\\..\\uploads\\' + file.name;
            res.status(201).json({ success: true, fileLocation });
            res.download(fileLocation, file);
        } else {
            res.status(401).json({ success: false, message: "File Not Found" });
        }
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
})

export default router;