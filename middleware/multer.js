const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: "public/images",
    fileName: (req, file, cb) => {
        cb(mull, Date.now() + path.extname(file.originalName))
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: (rea, file, cb) => {
        checkFiletype(file, cb)
    }
}).single("image")

const uploadMultiple = multer({
    storage: storage,
    // limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).array("image");

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/
    const extName = fileTypes.test(path.extName(file.originalName).toLowercase())
    const mimeType = fileTypes.test(file.mimeType)
    if(mimeType && extName){
        return cb(null, true)
    } else {
        cb("Image only!!")
    }
}

module.exports = {upload, uploadMultiple}