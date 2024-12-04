import ReactPlayer from "react-player/youtube";

export default function HomePage() {
  return (
    <div className="w-full padding-for-header">
      <div className=" relative">
        <div className=" absolute top-0 w-full h-full z-10 bg-gradient-to-b from-black/0 from-90% to-black/75">
          <div className=" text-right absolute bottom-0 right-0 p-2 bg-black/60 rounded-tl-lg">
            <a
              href="https://youtu.be/i63STOtAL2g?si=1TVa5ArAveqImETu"
              target="_blank"
              className=" text-sm font-bold sm:text-sm md:text-lg lg:text-xl"
            >
              cinematography by studio ghibli
            </a>{" "}
            <br />
            <a href="https://www.youtube.com/@israwr">@israwr</a>
          </div>
        </div>
        <div>
          <video
            src="https://res.cloudinary.com/dy2xmyytw/video/upload/v1733314256/video_vwdvdx.mp4"
            muted
            loop
            autoPlay={true}
            className="w-full object-fill"
          ></video>
        </div>
      </div>
    </div>
  );
}
