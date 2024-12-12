import { useState } from "react";
import { Button, Input, Spinner, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export function AddMovieAdminPage() {
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    actors: "",
    director: "",
    genre: "",
    country: "",
    duration_in_minutes: "",
    release_date: "",
    parental_guidance: "",
    trailer_url: "",
  });

  const admin = useSelector((state) => state.admin);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (!admin.admin) {
      toast.error("Something went wrong!!!");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("actors", formData.actors);
    form.append("director", formData.director);
    form.append("genre", formData.genre);
    form.append("country", formData.country);
    form.append("duration_in_minutes", formData.duration_in_minutes);
    form.append("release_date", formData.release_date);
    form.append("parental_guidance", formData.parental_guidance);
    if (formData.trailer_url !== "") {
      form.append("trailer_url", formData.trailer_url);
    }
    if (formData.image) {
      form.append("image", formData.image);
    }

    axios
      .post(`${BASE_URL}/api/movies`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bear ${admin.admin.jwt}`,
        },
      })
      .then((response) => {
        toast.success("Add movie successfull");
        setIsLoading(false);
        navigate("/admin/movies");
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        toast.error("Something went wrong!!!");
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="w-full text-center my-12">
        <h1 className="text-3xl font-bold uppercase">Thêm Phim</h1>
      </div>

      <div className="w-full flex flex-col px-16 justify-center items-start gap-6">
        <Input
          className="w-full"
          label="Title"
          name="title"
          onChange={handleInputChange}
        />
        <Textarea
          className="w-full"
          label="Description"
          name="description"
          onChange={handleInputChange}
        />
        <Textarea
          className="w-full"
          label="Actors"
          name="actors"
          onChange={handleInputChange}
        />
        <Input
          className="w-full"
          label="Director"
          name="director"
          onChange={handleInputChange}
        />
        <Textarea
          className="w-full"
          label="Genre"
          name="genre"
          onChange={handleInputChange}
        />
        <Input
          className="w-full"
          label="Country"
          name="country"
          onChange={handleInputChange}
        />
        <Input
          label="Duration in minutes"
          type="number"
          name="duration_in_minutes"
          onChange={handleInputChange}
        />
        <Input
          label="Release Date"
          type="date"
          name="release_date"
          onChange={handleInputChange}
        />
        <Input
          label="Parental Guidance (G, PG, PG-13, R, NC-17)"
          name="parental_guidance"
          onChange={handleInputChange}
        />
        <Input
          label="Trailer URL"
          name="trailer_url"
          onChange={handleInputChange}
        />

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
      </div>

      <div className="flex justify-center my-12">
        <Button variant="gradient" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <span>Thêm</span>
            </>
          )}
        </Button>
      </div>
    </>
  );
}
