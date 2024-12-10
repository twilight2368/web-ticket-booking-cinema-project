import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function UpdateImageModal({ movie_id }) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const admin = useSelector((state) => state.admin);
  const handleOpen = () => setOpen(!open);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Please select an image!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      axios
        .put(`${BASE_URL}/api/movie-image/${movie_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bear ${admin.admin.jwt}`,
          },
        })
        .then((response) => {
          toast.success("Change movie successfull");
          setIsLoading(false);
          handleOpen();
        })
        .catch((error) => {
          setIsLoading(true);
          console.log("====================================");
          console.log(error);
          console.log("====================================");
          toast.error("Failed to update movie!!!");
        });
    } catch (error) {
      setIsLoading(true);
      console.error("Error updating image", error);
      toast.error("Failed to update image.");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" size="sm" color="blue">
        cập nhật poster phim
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="uppercase">
          cập nhật poster phim ...
        </DialogHeader>
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
          <Button variant="gradient" color="blue" onClick={handleSubmit}>
            {isLoading ? <Spinner className=" h-6 w-6" /> : <span>Update</span>}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
