import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function UpdateImageModal({ display_text = "Update Image" }) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleOpen = () => setOpen(!open);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" size="sm" color="blue">
        {display_text}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="uppercase">{display_text}</DialogHeader>
        <DialogBody>
          {imagePreview && (
            <div className="w-full flex justify-center items-center mb-3">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
          <div className="m-3">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleOpen}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
