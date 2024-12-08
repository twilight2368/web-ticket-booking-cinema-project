import { useState } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";

export function AddMovieAdminPage() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="w-full text-center my-12">
        <h1 className=" text-3xl font-bold uppercase ">thêm phim</h1>
      </div>

      <div className="w-full flex flex-col px-16 justify-center items-start gap-6">
        <Input className=" w-full" label="title" />
        <Textarea className=" w-full" label="description" />
        <Textarea className=" w-full" label="actors" />
        <Input className=" w-full" label="director" />
        <Textarea className=" w-full" label="genre" />
        <Input label="duration_in_minutes" type="number" />
        <Input label="release_date" type="date" />
        <Input label="parental_guidance (G, PG, PG-13, R, NC-17)" />
        {imagePreview && (
          <div className=" w-full flex justify-center items-center mb-3">
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
        <div className=" m-3">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div className=" flex justify-center my-12">
        <Button variant="gradient">
          <span>Thêm</span>
        </Button>
      </div>
    </>
  );
}
