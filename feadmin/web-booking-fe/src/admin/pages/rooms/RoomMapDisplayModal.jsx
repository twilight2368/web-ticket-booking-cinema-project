import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import SeatMapAdmin from "./SeatMapAdmin";

export function RoomMapDisplayModal({ seats }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} color="green" size="sm">
        Xem sơ đồ chỗ ngồi
      </Button>
      <Dialog open={open} handler={handleOpen} size="xxl">
        <DialogHeader className=" uppercase pt-12 flex justify-center items-center bg-gray-900 text-white">
          <span>Sơ đồ chỗ ngồi</span>
        </DialogHeader>
        <DialogBody className="h-[600px] flex flex-col gap-12  justify-center items-center bg-gray-900">
          <SeatMapAdmin fakeSeatsData={seats} />
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 "
          >
            <span>đóng</span>
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}
