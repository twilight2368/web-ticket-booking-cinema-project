import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import ReactPlayer from "react-player";

export default function TrailerPlayerModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="text" className=" text-red-500">
        xem trailer
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody className=" h-[96] aspect-video p-0 rounded bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/i63STOtAL2g"
            allowfullscreen
          ></iframe>
        </DialogBody>
      </Dialog>
    </>
  );
}
