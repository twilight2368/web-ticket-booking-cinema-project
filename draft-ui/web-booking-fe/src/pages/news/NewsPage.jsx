import React from "react";
import NewsCard from "../../components/card/NewsCard";

export default function NewsPage() {
  return (
    <div className=" padding-for-header">
      <div className=" w-full mt-12 mb-16">
        <h1 className=" text-2xl text-center font-bold">📻 Tin tức </h1>
      </div>
      <div className=" w-full grid grid-cols-4 gap-6 px-24">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />

        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </div>
  );
}
