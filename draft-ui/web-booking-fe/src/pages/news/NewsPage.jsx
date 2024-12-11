import { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import NewsCard from "../../components/card/NewsCard";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NewsPage() {
  const [active, setActive] = useState(1);
  const [total, setTotal] = useState(1);
  const [newsList, setNewsList] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/news?page=${active}&limit=8`)
      .then((response) => {
        setActive(response.data.currentPage);
        setTotal(response.data.totalPages);
        setNewsList(response.data.items);
      })
      .catch((error) => {
        toast.error("Can get news information");
      });
  }, [active]);

  const next = () => {
    if (active === 10) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  return (
    <div className="padding-for-header px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="w-full mt-6 sm:mt-8 mb-8 sm:mb-12">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold">
          📻 Tin tức
        </h1>
      </div>

      {/* News Grid */}
      <div className="w-full px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16">
        {newsList ? (
          <>
            {newsList.map((news, i) => {
              return (
                <>
                  {" "}
                  <NewsCard
                    title={news.title}
                    id={news._id}
                    date={news.write_at}
                    image_url={news.image_url}
                  />
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center items-center mb-12 sm:mb-16 lg:mb-20">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <IconButton
            size="sm"
            color="white"
            onClick={prev}
            disabled={active === total}
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <span className="text-sm sm:text-base font-normal text-gray-600">
            Page <strong className="text-white">{active}</strong> of{" "}
            <strong className="text-white">{total}</strong>
          </span>
          <IconButton
            size="sm"
            onClick={next}
            color="white"
            disabled={active === total}
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
