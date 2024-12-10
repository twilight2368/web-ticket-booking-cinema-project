import { Button, Card, CardBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import DayDisplay from "../../../components/time/DayDisplay";
import TimeDisplay from "../../../components/time/TimeDisplay";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function UserAdminPage() {
  const [userList, setUserList] = useState([]);

  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    if (admin.admin) {
      axios
        .get(`${BASE_URL}/api/all-users`, {
          headers: { Authorization: `Bear ${admin.admin.jwt}` },
        })
        .then((response) => {
          setUserList(response.data.data);
        })
        .catch(() => {
          toast.error("Failed to get users");
        });
    }
  }, []);

  return (
    <div className="w-full">
      <div className="m-12 text-xl font-bold uppercase text-center text-gray-700">
        Danh sách người dùng
      </div>
      <div className=" flex flex-col gap-3 w-full px-12 mb-32">
        {userList ? (
          <>
            {userList.map((user) => {
              return (
                <>
                  <UserInfoItemDisplay
                    username={user.username}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    email={user.email}
                    phone_number={user.phone_number}
                    time_created={user.createdAt}
                    last_time_change={user.updatedAt}
                    key={user._id}
                  />
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function UserInfoItemDisplay({
  username,
  first_name,
  last_name,
  email,
  phone_number,
  time_created,
  last_time_change,
}) {
  return (
    <>
      <div className="w-full">
        <Card className="bg-black/0 w-full shadow-none">
          <CardBody className="p-0 border-2 rounded-lg border-gray-800 border-dashed ">
            <div className="p-6 text-black text-xs">
              <div className=" w-full">
                <span className=" capitalize">tên khách hàng</span>
                <p className="uppercase truncate font-black">
                  {last_name} {first_name}
                </p>
              </div>
              <div>
                <span>Username: </span>
                <span className="font-black">{username}</span>
              </div>
              <div>
                <span>Email: </span>
                <span className="font-black">{email}</span>
              </div>
              <div>
                <span>Số điện thoại:</span>
                <span className="font-black">{phone_number}</span>
              </div>
              <div className="">
                <span className="font-medium">Thời gian tạo tài khoản: </span>
                <span className=" font-black ">
                  <DayDisplay isoDate={time_created} />
                  <span>-</span>
                  <TimeDisplay isoDate={time_created} />
                </span>
              </div>
              <div className="">
                <span className="font-medium">
                  Lần cuối thay đổi thông tin:
                </span>
                <span className=" font-black ">
                  <DayDisplay isoDate={last_time_change} /> <span>-</span>
                  <TimeDisplay isoDate={last_time_change} />
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
