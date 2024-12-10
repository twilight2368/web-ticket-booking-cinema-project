import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import MovieDescriptionModal from "../../components/modals/MovieDescriptionModal";
import TrailerPlayerModal from "../../components/modals/TrailerPlayerModal";
import MovieScheduleLink from "../../components/button/MovieScheduleLink";
import RoomDisplayMap from "../../components/rooms/RoomDisplayMap";
export default function MovieLayout() {
  const { id } = useParams();
  // Get search params object
  const [searchParams] = useSearchParams();
  // Retrieve the 'query' parameter from the URL
  const showID = searchParams.get("showID");

  return (
    <div className="w-full">
      <div className=" relative w-full md:h-[500px] h-[1200px]">
        <div className=" w-full h-full">
          <img
            src="https://hanayukichan.wordpress.com/wp-content/uploads/2015/07/kiki-d0bf06d1aa41cf5a57d8db9f6eb72a41.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className=" absolute top-0 w-full h-full bg-gradient-to-b from-black/45 to-black/80 z-10 md:px-24 px-6 ">
          <div className=" w-full h-full padding-for-header flex justify-center items-center">
            <div className="flex md:flex-row flex-col w-4/5 h-full p-6">
              <div className="md:w-1/3 w-full flex justify-center items-center">
                <img
                  src="https://hanayukichan.wordpress.com/wp-content/uploads/2015/07/kiki-d0bf06d1aa41cf5a57d8db9f6eb72a41.jpg"
                  alt=""
                  className="h-full aspect-[2/3] object-cover object-center"
                />
              </div>
              <div className="md:w-2/3 w-full overflow-auto">
                <div className="w-full p-3 text-white">
                  <div className="w-full text-2xl font-bold mb-2">
                    <p className=" line-clamp-3">Kiki's Delivery Service</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-full font-thin ">
                      <p className=" line-clamp-2">
                        <span>Thể loại: </span>
                        <span>
                          Lorem ipsum dolor sit amet consectetur, Lorem ipsum
                          dolor sit amet consectetur adipisicing elit. Natus
                          quos rem, vel ea cupiditate ipsam. Doloremque tempore
                          esse error odio similique soluta corrupti maiores. Cum
                          sapiente odio voluptatem delectus quos!
                        </span>
                      </p>
                    </div>
                    <div className="w-full font-bold">
                      <p className=" truncate">
                        <span>Thời lượng: </span>
                        <span>100 phút</span>
                      </p>
                    </div>
                    <div className="w-full  font-thin">
                      <p className=" line-clamp-2">
                        <span>Diễn viên: </span>
                        <span>Lorem ipsum dolor sit amet consectetur,</span>
                      </p>
                    </div>
                    <div className="w-full font-thin">
                      <p className=" truncate">
                        <span>Đạo diễn: </span>
                        <span>Lorem ipsum dolor sit amet consectetur,</span>
                      </p>
                    </div>
                    <div className="w-full font-thin">
                      <p className=" truncate">
                        <span>Xuất xứ: </span>
                        <span>Lorem ipsum dolor sit amet consectetur,</span>
                      </p>
                    </div>
                    <div className="w-full font-thin">
                      <p className=" truncate">
                        <span>Khởi chiếu: </span>
                        <span>01/01/2024</span>
                      </p>
                    </div>
                    <div className="w-full font-bold text-lg  text-red-600 mt-1 mb-2">
                      <p className=" truncate">
                        <span>PG: </span>
                        <span className=" px-2 rounded-md border-2 border-red-400">
                          ...
                        </span>
                      </p>
                    </div>
                    <div className=" flex sm:flex-row flex-col gap-2">
                      <MovieDescriptionModal />
                      <TrailerPlayerModal />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-20 bg-black">
        <div className=" w-full h-full flex flex-row justify-center md:gap-6 gap-3 items-center mb-6">
          <Button
            variant="outlined"
            color="white"
            disabled={showID ? true : false}
          >
            01/01/2024
          </Button>
          <Button
            variant="outlined"
            color="white"
            disabled={showID ? true : false}
          >
            02/01/2024
          </Button>
          <Button
            variant="outlined"
            color="white"
            disabled={showID ? true : false}
          >
            03/01/2024
          </Button>
        </div>
      </div>
      <div className="min-h-96">
        {showID ? (
          <>
            <RoomDisplayMap />
          </>
        ) : (
          <>
            <div className="w-full px-32 pt-12 grid grid-cols-2 md:grid-cols-8 sm:grid-cols-6 gap-6 text-center">
              <MovieScheduleLink to={"?showID=1"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
