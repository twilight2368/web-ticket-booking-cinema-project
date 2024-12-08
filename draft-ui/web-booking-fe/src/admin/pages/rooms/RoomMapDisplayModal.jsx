import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import SeatMapAdmin from "./SeatMapAdmin";

export function RoomMapDisplayModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  // Fake seats data matching the schema
  const fakeSeatsData = [
    ...Array.from({ length: 5 }, (_, rowIndex) =>
      Array.from({ length: 10 }, (_, colIndex) => ({
        _id: `seat-${rowIndex + 1}-${colIndex + 1}`,
        room_id: "room-123",
        seat_row: rowIndex + 1,
        seat_column: colIndex + 1,
        seat_type: rowIndex < 3 ? "Vip" : "Normal",
      }))
    ).flat(),
  ];

  return (
    <>
      <Button onClick={handleOpen} color="green" size="sm">
        Xem sơ đồ chỗ ngồi
      </Button>
      <Dialog open={open} handler={handleOpen} size="xxl">
        <DialogHeader className=" uppercase pt-12 flex justify-center items-center bg-gray-900 text-white">
          <span>Sơ đồ chỗ ngồi</span>
        </DialogHeader>
        <DialogBody className="h-[600px] flex justify-center items-center bg-gray-900">
          <SeatMapAdmin fakeSeatsData={fakeSeatsData} />
        </DialogBody>
        <DialogFooter className="bg-gray-900 flex justify-center items-center">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 "
          >
            <span>đóng</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
