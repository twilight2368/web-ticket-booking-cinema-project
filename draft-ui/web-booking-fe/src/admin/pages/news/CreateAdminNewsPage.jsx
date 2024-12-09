import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateAdminNewsPage() {
  const [value, setValue] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { align: [] },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "code-block"],
    ],
  };

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
    <div className="p-6">
      <div className="mb-6 text-xl font-bold uppercase text-center text-gray-700">
        Quản lý tin tức
      </div>
      <div className="w-full py-3">
        <Input label="title" size="lg" />
      </div>
      <ReactQuill
        modules={modules}
        placeholder="Input..."
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <div className="w-full mt-12">
        {imagePreview && (
          <div className=" w-full flex justify-center items-center mb-3">
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
      <div className=" w-full flex justify-center items-center">
        <Button color="blue">xác nhận</Button>
      </div>
    </div>
  );
}
