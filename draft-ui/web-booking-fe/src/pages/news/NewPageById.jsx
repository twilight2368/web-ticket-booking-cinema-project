import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { DateTime } from "luxon";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";

export default function NewPageById() {
  const { id } = useParams();
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/news/${id}`)
      .then((response) => {
        setHeader(response.data.title);
        setTime(response.data.write_at);
        setHtmlContent(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Can get news information");
      });
  }, []);
  return (
    <div className=" padding-for-header lg:px-60 sm:px-6  flex flex-col justify-center ">
      {htmlContent.length && !loading ? (
        <>
          <div className="mb-8 mt-12">
            <p>
              <h1 className="text-white text-5xl font-black mb-3 ">{header}</h1>
            </p>
            <p>
              <span className="text-gray-500">
                <RelativeTime isoDate={time} />
              </span>
            </p>
          </div>
          <div className="ql-snow w-full px-10 mt-3 ">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />{" "}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

const RelativeTime = ({ isoDate }) => {
  const now = DateTime.now(); // Current time
  const messageTime = DateTime.fromISO(isoDate);

  const diffInSeconds = Math.floor(now.diff(messageTime, "seconds").seconds);

  const formatRelativeTime = () => {
    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 172800) {
      return "yesterday";
    } else {
      return messageTime.toFormat("yyyy-MM-dd");
    }
  };

  return <span>{formatRelativeTime()}</span>;
};
