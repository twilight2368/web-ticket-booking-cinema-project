import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setMovies, setRooms } from "../../app/stores/AdminSlice";
import ReloadButton from "./ReloadButton";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function AdminHeader() {
  const [time, setTime] = useState(DateTime.now().setZone("Asia/Bangkok"));
  const adminInfo = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.now().setZone("Asia/Bangkok"));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}/api/movies`)
        .then((response) => {
          dispatch(setMovies(response.data));
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}/api/rooms`)
        .then((response) => {
          dispatch(setRooms(response.data));
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  }, []);
  return (
    <div className=" flex flex-row justify-between items-center px-12 py-6">
      <div>
        <ReloadButton />
      </div>
      <div className=" text-right">
        <div className="max-w-96 text-lg font-black">
          <p className=" w-full truncate  before:content-['Hello,']">
            <span className="px-1 font-normal">
              {adminInfo ? adminInfo.admin.admin.username : ""}
            </span>
          </p>
        </div>
        <div>
          <p>{time.toFormat("dd-MM-yyyy HH:mm:ss")}</p>
        </div>
      </div>
    </div>
  );
}
