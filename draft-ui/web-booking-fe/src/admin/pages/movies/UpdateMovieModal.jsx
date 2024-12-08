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

export function UpdateMovieModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" size="sm" color="orange">
        Sửa 
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className=" uppercase">Sửa thông tin phim</DialogHeader>
        <DialogBody className=" h-[500px] overflow-y-auto">
          <div className=" flex flex-col gap-3">
            <Input className=" w-full" label="title" />
            <Textarea className=" w-full" label="description" />
            <Textarea className=" w-full" label="actors" />
            <Input className=" w-full" label="director" />
            <Textarea className=" w-full" label="genre" />
            <Input label="duration_in_minutes" type="number" />
            <Input label="release_date" type="date" />
            <Input label="parental_guidance (G, PG, PG-13, R, NC-17)" />
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
            <span>Thay đổi</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
