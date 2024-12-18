import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AddScheduleModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    room_id: "",
    movie_id: "",
    date_show: "",
    time_start: "",
  });

  const movies = useSelector((state) => state.admin.movies);
  const rooms = useSelector((state) => state.admin.rooms);
  const admin = useSelector((state) => state.admin);
  const handleOpen = () => setOpen(!open);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = formData;

    // Kiểm tra nếu admin không hợp lệ
    if (!admin.admin) {
      toast.error("Add schedule failed...!!!");
      return; // Dừng lại nếu admin không hợp lệ
    }

    // Kiểm tra các trường dữ liệu form
    if (!formData.room_id || !formData.movie_id || !formData.date_show || !formData.time_start) {
      toast.error("Please fill all fields.");
      return;
    }

    // Gửi yêu cầu tạo lịch chiếu
    axios
      .post(`${BASE_URL}/api/create-shows`, payload, {
        headers: {
          Authorization: `Bearer ${admin.admin.jwt}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        handleOpen();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong!");
        handleOpen();
      });
  };

  return (
    <>
      <Button onClick={handleOpen} color="blue">
        Thêm lịch chiếu phim
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="uppercase">Thêm lịch chiếu phim</DialogHeader>
        <DialogBody className="h-96">
          <div className="flex flex-col gap-3">
            {Array.isArray(movies) && movies.length > 0 ? (
              <Select
                variant="outlined"
                label="Select movie name"
                onChange={(value) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    movie_id: value,
                  }));
                }}
              >
                {movies.map((movie, i) => {
                  return (
                    <Option key={i} value={movie._id}>
                      {movie.title}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <p>No movies available</p>
            )}

            {Array.isArray(rooms) && rooms.length > 0 ? (
              <Select
                variant="outlined"
                label="Select room"
                onChange={(value) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    room_id: value,
                  }));
                }}
              >
                {rooms.map((room, i) => {
                  return (
                    <Option key={i} value={room._id}>
                      {room.name}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <p>No rooms available</p>
            )}

            <Input
              label="Date of show"
              type="date"
              name="date_show"
              value={formData.date_show}
              onChange={handleInputChange}
            />
            <Input
              label="Start time"
              type="time"
              name="time_start"
              value={formData.time_start}
              onChange={handleInputChange}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Hủy bỏ</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSubmit}>
            <span>Thêm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}