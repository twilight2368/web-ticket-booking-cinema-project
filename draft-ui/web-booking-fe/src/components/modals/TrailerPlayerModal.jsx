import { useState } from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";

export default function TrailerPlayerModal({ trailer_url }) {
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
            src={trailer_url}
            allowfullscreen
          ></iframe>
        </DialogBody>
      </Dialog>
    </>
  );
}
