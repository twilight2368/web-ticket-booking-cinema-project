import { Card, CardBody } from "@material-tailwind/react";

export default function MovieCard() {
  return (
    <div className="w-full">
      <Card className=" w-full text-white bg-black/0">
        <CardBody className="p-0">
          <div className="w-full h-full">
            <div className="w-full mb-2">
              <img
                src="https://i.ebayimg.com/images/g/pEUAAOSwr~hjBQrB/s-l1200.jpg"
                alt=""
                className=" w-full h-full object-cover rounded-lg shadow-md shadow-black"
              />
            </div>
            <div className="w-full">
              <p className=" text-lg text-white truncate text-center">
                {"Howl's Moving Castle"}
              </p>
              <p className=" text-sm text-gray-600 truncate text-center">
                {"20/11/2024"}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
