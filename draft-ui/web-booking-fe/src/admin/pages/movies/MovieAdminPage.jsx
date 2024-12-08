import React from "react";
import { AddMovieAdminModal } from "./AddMovieAdminModal";

export default function MovieAdminPage() {
  return (
    <div className="w-full min-h-screen p-6">
      <div className=" mb-6 w-full text-xl font-bold uppercase text-center">
        quản lý phim
      </div>
      <div className="w-full flex justify-center">
        <AddMovieAdminModal />
      </div>
    </div>
  );
}
