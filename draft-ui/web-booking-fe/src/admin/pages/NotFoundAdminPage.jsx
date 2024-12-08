import React from "react";

export default function NotFoundAdminPage() {
  return (
    <div className=" w-full h-full relative">
      <div className=" w-full h-full ">
        <img
          src="https://r4.wallpaperflare.com/wallpaper/556/593/206/anime-studio-ghibli-spirted-away-spirited-away-wallpaper-191058adc14a1d7bf607e83f5051367d.jpg"
          alt=""
          className="h-full object-fill"
        />
      </div>
      <div className=" absolute top-0 w-full h-full bg-black/75 flex justify-center items-center text-white">
        <div className=" text-3xl ">
          <span className=" border-r-2 p-6">404</span>
          <span className="p-6"> This page could not be found.</span>
        </div>
      </div>
    </div>
  );
}
