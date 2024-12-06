import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function MovieDescriptionModal() {
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
        <DialogBody className=" text-white nunito ">
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Consectetur laudantium placeat
          deserunt libero quaerat, molestiae consequuntur recusandae dolorem quo
          nulla, exercitationem tempore animi adipisci quas fugit provident eum
          voluptatem voluptates! Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Excepturi laboriosam, suscipit officia quibusdam
          reprehenderit, aut repellat quo repellendus iusto porro dolore culpa
          ratione quia voluptatibus eos voluptate ex consequuntur aliquam!
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleOpen} className="mx-auto">
            <span>đóng</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
