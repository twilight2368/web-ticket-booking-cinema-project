// import React from "react";

// function AdminBooking() {
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Quản lý Đăng ký Vé</h2>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//         Thêm Đăng ký mới
//       </button>
//     </div>
//   );
// }

// export default AdminBooking;


//**2 
// import React, { useState } from "react";
// import { Button, Input } from "@material-tailwind/react";

// const AdminBooking = () => {
//   const [booking, setBooking] = useState({
//     name: "",
//     movie: "",
//     date: "",
//     time: "",
//     tickets: 0,
//   });
//   const [bookings, setBookings] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBooking((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddBooking = () => {
//     setBookings((prev) => [...prev, booking]);
//     setBooking({ name: "", movie: "", date: "", time: "", tickets: 0 });
//   };

//   const handleDeleteBooking = (index) => {
//     setBookings(bookings.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-4">Quản lý đăng ký vé</h2>
      
//       <div className="mb-4">
//         <Input
//           label="Tên người dùng"
//           name="name"
//           value={booking.name}
//           onChange={handleInputChange}
//         />
//         <Input
//           label="Tên phim"
//           name="movie"
//           value={booking.movie}
//           onChange={handleInputChange}
//         />
//         <Input
//           label="Ngày"
//           name="date"
//           value={booking.date}
//           onChange={handleInputChange}
//           type="date"
//         />
//         <Input
//           label="Thời gian"
//           name="time"
//           value={booking.time}
//           onChange={handleInputChange}
//           type="time"
//         />
//         <Input
//           label="Số vé"
//           name="tickets"
//           value={booking.tickets}
//           onChange={handleInputChange}
//           type="number"
//         />
//         <Button color="blue" onClick={handleAddBooking}>Thêm đăng ký vé</Button>
//       </div>

//       <div>
//         <h3 className="text-xl font-semibold">Danh sách đăng ký vé</h3>
//         <ul>
//           {bookings.map((booking, index) => (
//             <li key={index} className="flex justify-between items-center mb-2">
//               <span>{`${booking.name} - ${booking.movie} - ${booking.date} ${booking.time} - ${booking.tickets} vé`}</span>
//               <Button color="red" onClick={() => handleDeleteBooking(index)}>
//                 Xóa
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminBooking;


//**3 
// import React, { useState } from "react";
// import { Button, Input, Select, Option } from "@material-tailwind/react";

// const AdminBooking = () => {
//   const [booking, setBooking] = useState({
//     name: "",
//     movie: "",
//     date: "",
//     time: "", // Định dạng 24h
//     seats: [],
//   });
//   const [bookings, setBookings] = useState([]);

//   const availableSeats = [
//     "A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"
//   ]; // Các ghế có sẵn

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBooking((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddSeat = (seat) => {
//     setBooking((prev) => ({
//       ...prev,
//       seats: [...prev.seats, seat],
//     }));
//   };

//   const handleAddBooking = () => {
//     setBookings((prev) => [...prev, booking]);
//     setBooking({ name: "", movie: "", date: "", time: "", seats: [] });
//   };

//   const handleDeleteBooking = (index) => {
//     setBookings(bookings.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-4">Quản lý đăng ký vé</h2>
      
//       <div className="mb-4">
//         <Input
//           label="Tên người dùng"
//           name="name"
//           value={booking.name}
//           onChange={handleInputChange}
//         />
//         <Input
//           label="Tên phim"
//           name="movie"
//           value={booking.movie}
//           onChange={handleInputChange}
//         />
//         <Input
//           label="Ngày"
//           name="date"
//           value={booking.date}
//           onChange={handleInputChange}
//           type="date"
//         />
//         <Input
//           label="Thời gian"
//           name="time"
//           value={booking.time}
//           onChange={handleInputChange}
//           type="time" // Định dạng thời gian 24h
//         />
//         <Select label="Chọn ghế" onChange={(e) => handleAddSeat(e.target.value)}>
//           {availableSeats.map((seat, index) => (
//             <Option key={index} value={seat}>{seat}</Option>
//           ))}
//         </Select>
//         <Button color="blue" onClick={handleAddBooking}>Thêm đăng ký vé</Button>
//       </div>

//       <div>
//         <h3 className="text-xl font-semibold">Danh sách đăng ký vé</h3>
//         <ul>
//           {bookings.map((booking, index) => (
//             <li key={index} className="flex justify-between items-center mb-2">
//               <span>{`${booking.name} - ${booking.movie} - ${booking.date} ${booking.time} - Ghế: ${booking.seats.join(", ")}`}</span>
//               <Button color="red" onClick={() => handleDeleteBooking(index)}>
//                 Xóa
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminBooking;

//*4 update giao dien 
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [searchInfo, setSearchInfo] = useState({ movieName: "", date: "", time: "" });
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", phone: "" });

  // Mock phim & ghế trống
  const mockMovies = [
    { id: 1, name: "Hành Trình Của Moana 2", date: "2024-12-03", time: "14:00", seats: ["A1", "A2", "B1", "B2"] },
    { id: 2, name: "Avengers Endgame", date: "2024-12-04", time: "18:00", seats: ["A3", "C1", "C2"] },
  ];

  const handleSearch = () => {
    const movie = mockMovies.find(
      (m) => m.name === searchInfo.movieName && m.date === searchInfo.date && m.time === searchInfo.time
    );

    if (movie) {
      setAvailableSeats(movie.seats);
      setCurrentStep(2);
    } else {
      alert("Không tìm thấy phim phù hợp!");
    }
  };

  const handleConfirmSeat = () => {
    if (!selectedSeat) {
      alert("Vui lòng chọn ghế!");
      return;
    }

    setCurrentStep(3);
  };

  const handleAddBooking = () => {
    if (!userInfo.name || !userInfo.phone) {
      alert("Vui lòng nhập đủ thông tin người dùng!");
      return;
    }

    const newBooking = {
      id: bookings.length + 1,
      movieName: searchInfo.movieName,
      date: searchInfo.date,
      time: searchInfo.time,
      seat: selectedSeat,
      user: userInfo,
    };

    setBookings([...bookings, newBooking]);
    resetForm();
  };

  const resetForm = () => {
    setIsDialogOpen(false);
    setCurrentStep(1);
    setSearchInfo({ movieName: "", date: "", time: "" });
    setAvailableSeats([]);
    setSelectedSeat("");
    setUserInfo({ name: "", phone: "" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý đăng ký vé</h1>
        <Button onClick={() => setIsDialogOpen(true)} color="blue">
          Thêm đăng ký vé
        </Button>
      </div>

      <div className="mt-6">
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded shadow">
                <h2 className="font-bold">{booking.movieName}</h2>
                <p>Ngày: {booking.date}</p>
                <p>Giờ: {booking.time}</p>
                <p>Ghế: {booking.seat}</p>
                <p>Người dùng: {booking.user.name}</p>
                <p>SĐT: {booking.user.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có đăng ký vé nào.</p>
        )}
      </div>

      {/* Modal thêm đăng ký vé */}
      <Dialog open={isDialogOpen} handler={resetForm}>
        <DialogHeader>Thêm Đăng Ký Vé</DialogHeader>
        <DialogBody>
          {currentStep === 1 && (
            <div className="grid gap-4">
              <Input
                label="Tên phim"
                name="movieName"
                value={searchInfo.movieName}
                onChange={(e) => setSearchInfo({ ...searchInfo, movieName: e.target.value })}
              />
              <Input
                label="Ngày (YYYY-MM-DD)"
                name="date"
                value={searchInfo.date}
                onChange={(e) => setSearchInfo({ ...searchInfo, date: e.target.value })}
              />
              <Input
                label="Giờ (HH:mm)"
                name="time"
                value={searchInfo.time}
                onChange={(e) => setSearchInfo({ ...searchInfo, time: e.target.value })}
              />
              <Button onClick={handleSearch} color="blue">
                Tìm kiếm phim
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid gap-4">
              <h2 className="font-bold">Chọn Ghế</h2>
              <Select label="Ghế Trống" onChange={(e) => setSelectedSeat(e)}>
                {availableSeats.map((seat, idx) => (
                  <Option key={idx} value={seat}>
                    {seat}
                  </Option>
                ))}
              </Select>
              <Button onClick={handleConfirmSeat} color="blue">
                Xác nhận ghế
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid gap-4">
              <h2 className="font-bold">Thông Tin Người Dùng</h2>
              <Input
                label="Họ và Tên"
                name="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
              <Input
                label="Số Điện Thoại"
                name="phone"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              />
              <Button onClick={handleAddBooking} color="green">
                Xác nhận
              </Button>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={resetForm}>
            Hủy
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AdminBooking;

