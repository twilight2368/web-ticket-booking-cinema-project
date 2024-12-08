const { v2: cloudinary } = require("cloudinary");
const clc = require("cli-color");
const appConfig = require("../configs/app.config");
async function handlingFileImage(req, res, next) {
  try {
    // Ensure a file is provided
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Wrap Cloudinary upload_stream in a promise
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: appConfig.cloudinary.folder },
          (error, result) => {
            if (error) {
              console.log("====================================");
              console.error(error);
              console.log("====================================");
              reject(null);
            } else {
              resolve(result);
            }
          }
        );

        // End the upload stream with the file buffer
        upload_stream.end(req.file.buffer);
      });
    };

    // Await the upload result
    const result = await uploadToCloudinary();

    if (!result) {
      console.log("====================================");
      console.log(clc.red("Upload file failed"));
      console.log("====================================");
    }

    console.log("====================================");
    console.log(clc.green(`Upload file success: ${result.secure_url}`));
    console.log("====================================");
    // Attach the image URL to req.body
    req.body.image_url = result.secure_url;
    // Proceed to the next middleware
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handlingFileImage,
};
