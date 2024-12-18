import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AddRoomModal() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rows: 0,
    cols: 0,
    row_vip_start: 0,
    row_vip_end: 0,
    col_vip_start: 0,
    col_vip_end: 0,
  });

  const admin = useSelector((state) => state.admin);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpen = () => setOpen(!open);

  const addRoomSubmit = () => {
    if (admin.admin) {
      axios
        .post(`${BASE_URL}/api/create-room`, formData, {
          headers: {
            Authorization: `Bear ${admin.admin.jwt}`,
          },
        })
        .then((response) => {
          toast.success("Add room successful");
          handleOpen();
        })
        .catch((error) => {
          toast.error("Add room failed");
        });
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color="blue">
        Thêm phòng
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className=" uppercase">Thêm phòng</DialogHeader>
        <DialogBody className=" h-[500px] overflow-y-auto">
          <div className=" flex flex-col gap-3">
            <Input label="name" name="name" onChange={handleInputChange} />
            <Input
              label="rows"
              type="number"
              name="rows"
              onChange={handleInputChange}
            />
            <Input
              label="cols"
              type="number"
              name="cols"
              onChange={handleInputChange}
            />
            <Input
              label="row_vip_start"
              type="number"
              name="row_vip_start"
              onChange={handleInputChange}
            />
            <Input
              label="row_vip_end"
              type="number"
              name="row_vip_end"
              onChange={handleInputChange}
            />
            <Input
              label="col_vip_start"
              type="number"
              name="col_vip_start"
              onChange={handleInputChange}
            />
            <Input
              label="col_vip_end"
              type="number"
              name="col_vip_end"
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
          <Button variant="gradient" color="blue" onClick={addRoomSubmit}>
            <span>Thêm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
