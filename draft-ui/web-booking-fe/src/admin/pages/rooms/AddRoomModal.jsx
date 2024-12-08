import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

export function AddRoomModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} color="blue">
        Thêm phòng
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className=" uppercase">Thêm phòng</DialogHeader>
        <DialogBody className=" h-[500px] overflow-y-auto">
          <div className=" flex flex-col gap-3">
            <Input label="names" />
            <Input label="rows" type="number" />
            <Input label="cols" type="number" />
            <Input label="row_vip_start" type="number" />
            <Input label="row_vip_end" type="number" />
            <Input label="col_vip_start" type="number" />
            <Input label="col_vip_end" type="number" />
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
          <Button variant="gradient" color="blue" onClick={handleOpen}>
            <span>Thêm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
