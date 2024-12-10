import MovieList1 from "../../components/home/MovieList1";
import MovieList2 from "../../components/home/MovieList2";

export default function HomePage() {

  return (
    <div className="w-full">
      <div className=" relative w-full mb-24">
        <div className=" absolute top-0 w-full h-full z-10">
          <div className=" text-right absolute bottom-0 right-0 p-2 bg-black/30 rounded-tl-lg">
            <a
              href="https://youtu.be/i63STOtAL2g?si=1TVa5ArAveqImETu"
              target="_blank"
              className=" text-sm font-bold sm:text-sm md:text-lg lg:text-xl"
            >
              🎞️ cinematography by studio ghibli
            </a>{" "}
            <br />
            <a href="https://www.youtube.com/@israwr" target="_blank">
              @israwr
            </a>
          </div>
        </div>
        <div>
          <video
            src="https://res.cloudinary.com/dy2xmyytw/video/upload/v1733314256/video_vwdvdx.mp4"
            muted
            loop
            autoPlay={true}
            className="w-full h-screen object-bottom object-cover"
          ></video>
        </div>
      </div>
      <div className="w-full mb-20">
        <MovieList1 />
      </div>
      <div className="w-full mb-20">
        <MovieList2 />
      </div>
      
    </div>
  );
}
