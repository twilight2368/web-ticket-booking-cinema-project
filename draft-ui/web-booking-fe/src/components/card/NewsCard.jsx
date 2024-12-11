import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import DayDisplay from "../time/DayDisplay";
export default function NewsCard({ title, date, id, image_url }) {
  return (
    <div>
      <Link to={`/news/${id}`}>
        <Card className=" h-80 bg-gray-900 shadow shadow-black">
          <CardBody className="p-0 h-full">
            <div className="h-2/3 w-full">
              <img
                src={image_url}
                alt=""
                className=" h-full w-full rounded-t-xl object-cover"
              />
            </div>
            <div className=" h-1/3 p-3 ">
              <div>
                <p className=" line-clamp-2 font-semibold text-white text-lg h-14">
                  {title}
                </p>
              </div>
              <div className=" text-sm">
                <DayDisplay isoDate={date} />
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}
