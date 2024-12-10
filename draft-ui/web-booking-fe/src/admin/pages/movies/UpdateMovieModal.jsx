import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function UpdateMovieModal({ movie }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: movie.title,
    description: movie.description,
    actors: movie.actors,
    director: movie.director,
    genre: movie.gerne,
    duration_in_minutes: movie.duration_in_minutes,
    release_date: movie.release_date,
    parental_guidance: movie.parental_guidance,
    trailer_url: movie.trailer_url,
  });

  const admin = useSelector((state) => state.admin);
  // Handle modal open/close
  const handleOpen = () => setOpen(!open);

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (PUT request)
  const handleSubmit = async () => {
    try {
      axios
        .put(`${BASE_URL}/api/movies/${movie._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bear ${admin.admin.jwt}`,
          },
        })
        .then((response) => {
          toast.success("Change movie successfull");
          handleOpen();
        })
        .catch((error) => {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
          toast.error("Failed to update movie!!!");
        });
    } catch (error) {
      console.error("Error updating movie", error);
      toast.error("Failed to update movie.");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" size="sm" color="orange">
        Sửa
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="uppercase">Sửa thông tin phim</DialogHeader>
        <DialogBody className="h-[500px] overflow-y-auto">
          <div className="flex flex-col gap-3">
            <Input
              className="w-full"
              label="Title"
              name="title"
              defaultValue={formData.title}
              onChange={handleInputChange}
            />
            <Textarea
              className="w-full"
              label="Description"
              name="description"
              defaultValue={formData.description}
              onChange={handleInputChange}
            />
            <Textarea
              className="w-full"
              label="Actors"
              name="actors"
              defaultValue={formData.actors}
              onChange={handleInputChange}
            />
            <Input
              className="w-full"
              label="Director"
              name="director"
              defaultValue={formData.director}
              onChange={handleInputChange}
            />
            <Textarea
              className="w-full"
              label="Genre"
              name="genre"
              defaultValue={formData.genre}
              onChange={handleInputChange}
            />
            <Input
              label="Duration in minutes"
              type="number"
              name="duration_in_minutes"
              defaultValue={formData.duration_in_minutes}
              onChange={handleInputChange}
            />
            <Input
              label="Release Date"
              type="date"
              name="release_date"
              defaultValue={formData.release_date}
              onChange={handleInputChange}
            />
            <Input
              label="Parental Guidance (G, PG, PG-13, R, NC-17)"
              name="parental_guidance"
              defaultValue={formData.parental_guidance}
              onChange={handleInputChange}
            />
            <Input
              label="Trailer URL"
              name="trailer_url"
              defaultValue={formData.trailer_url}
              onChange={handleInputChange}
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
            <span>Hủy bỏ</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSubmit}>
            <span>Thay đổi</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
