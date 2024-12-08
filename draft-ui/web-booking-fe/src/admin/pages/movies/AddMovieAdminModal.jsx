import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function AddMovieAdminModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        thêm phim
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Thêm phim</DialogHeader>
        <DialogBody></DialogBody>
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
