import { v2 as cloudinary } from "cloudinary";

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
          { folder: "uploads" },
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
      throw new Error("File uploading error");
    }
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
