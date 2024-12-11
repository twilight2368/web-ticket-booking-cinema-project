import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function MovieDescriptionModal({ description }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        className=" text-white underline"
      >
        xem chi tiết nội dung
      </Button>
      <Dialog open={open} handler={handleOpen} className="bg-black text-white">
        <DialogBody className=" text-white nunito ">{description}</DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleOpen} className="mx-auto">
            <span>đóng</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
