import { Button, Input, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreateAdminNewsPage() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // For sending the file
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
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
      setImageFile(file); // Save the file for form submission
    }
  };

  const handleSubmit = async () => {
    if (!title || !value) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", value);
    formData.append("writer", admin.admin.admin.id);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      axios
        .post(`${BASE_URL}/api/news/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bear ${admin.admin.jwt}`,
          },
        })
        .then((response) => {
          console.log("====================================");
          console.log(response);
          console.log("====================================");
          toast.success("Add news successfull");
          setIsLoading(false);
          navigate("/admin/news");
        })
        .catch((error) => {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
          toast.error("Something went wrong!!!");
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error creating news:", error);
      toast.error("Failed to create news.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 text-xl font-bold uppercase text-center text-gray-700">
        Quản lý tin tức
      </div>
      <div className="w-full py-3">
        <Input
          label="Title"
          size="lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
    </div>
  );
}
