import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
export default function NewsCard() {
  return (
    <div>
      <Card className=" h-80 bg-gray-900 shadow shadow-black">
        <CardBody className="p-0 h-full">
          <div className="h-2/3 w-full">
            <img
              src="https://wallpapercat.com/w/full/0/0/7/1379578-1920x1080-desktop-1080p-movie-theater-wallpaper.jpg"
              alt=""
              className=" h-full w-full rounded-t-xl object-cover"
            />
          </div>
          <div className=" h-1/3 p-3 ">
            <div>
              <p className=" line-clamp-2 font-semibold text-white text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                ratione commodi repudiandae libero. Asperiores animi autem
                accusantium eos magnam. Veritatis omnis laborum accusantium
                animi, pariatur explicabo esse sit eaque placeat?
              </p>
            </div>
            <div className=" text-sm">{"01/01/2024"}</div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
