// import React from "react";

// function ScheduleManagement() {
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Quản lý Lịch Chiếu</h2>
//       <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
//         Tạo lịch chiếu mới
//       </button>
//     </div>
//   );
// }

// export default ScheduleManagement;

// **2
// import React, { useState } from "react";
// import { Button, Input } from "@material-tailwind/react";

// const ScheduleManagement = () => {
//   const [showtime, setShowtime] = useState({
//     movie: "",
//     date: "",
//     time: "",
//   });
//   const [showtimes, setShowtimes] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShowtime((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddShowtime = () => {
//     setShowtimes((prev) => [...prev, showtime]);
//     setShowtime({ movie: "", date: "", time: "" });
//   };

//   const handleDeleteShowtime = (index) => {
//     setShowtimes(showtimes.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-4">Quản lý lịch chiếu</h2>
      
//       <div className="mb-4">
//         <Input
//           label="Tên phim"
//           name="movie"
//           value={showtime.movie}
//           onChange={handleInputChange}
//         />
//         <Input
//           label="Ngày chiếu"
//           name="date"
//           value={showtime.date}
//           onChange={handleInputChange}
//           type="date"
//         />
//         <Input
//           label="Thời gian chiếu"
//           name="time"
//           value={showtime.time}
//           onChange={handleInputChange}
//           type="time"
//         />
//         <Button color="blue" onClick={handleAddShowtime}>Thêm lịch chiếu</Button>
//       </div>

//       <div>
//         <h3 className="text-xl font-semibold">Danh sách lịch chiếu</h3>
//         <ul>
//           {showtimes.map((showtime, index) => (
//             <li key={index} className="flex justify-between items-center mb-2">
//               <span>{`${showtime.movie} - ${showtime.date} ${showtime.time}`}</span>
//               <Button color="red" onClick={() => handleDeleteShowtime(index)}>
//                 Xóa
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ScheduleManagement;


//**3 update time
// import React, { useState } from "react";
// import { Button, Input } from "@material-tailwind/react";

// const ScheduleManagement = () => {
//   const [showtime, setShowtime] = useState({
//     movie: "",
//     date: "",
//     time: "", // Định dạng 24h
//   });
//   const [showtimes, setShowtimes] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShowtime((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddShowtime = () => {
//     setShowtimes((prev) => [...prev, showtime]);
//     setShowtime({ movie: "", date: "", time: "" });
//   };

//   const handleDeleteShowtime = (index) => {
//     setShowtimes(showtimes.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-4">Quản lý lịch chiếu</h2>
      
//       <div className="mb-4">
//         <Input
//           label="Tên phim"
//           name="movie"
//           value={showtime.movie}
//           onChange={handleInputChange}
//         />
//         <Input
//           label="Ngày chiếu"
//           name="date"
//           value={showtime.date}
//           onChange={handleInputChange}
//           type="date"
//         />
//         <Input
//           label="Thời gian chiếu "
//           name="time"
//           value={showtime.time}
//           onChange={handleInputChange}
//           type="time" 
//         />
//         <Button color="blue" onClick={handleAddShowtime}>Thêm lịch chiếu</Button>
//       </div>

//       <div>
//         <h3 className="text-xl font-semibold">Danh sách lịch chiếu</h3>
//         <ul>
//           {showtimes.map((showtime, index) => (
//             <li key={index} className="flex justify-between items-center mb-2">
//               <span>{`${showtime.movie} - ${showtime.date} ${showtime.time}`}</span>
//               <Button color="red" onClick={() => handleDeleteShowtime(index)}>
//                 Xóa
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ScheduleManagement;

//**4 update image 
import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";

const ScheduleManagement = () => {
  const [showtime, setShowtime] = useState({
    movie: "",
    date: "",
    time: "", // Định dạng 24h
    image: "", // Dữ liệu hình ảnh
  });

  // Lấy dữ liệu từ localStorage khi component mount
  const loadShowtimes = () => {
    const savedShowtimes = JSON.parse(localStorage.getItem('showtimes')) || [];
    return savedShowtimes;
  };

  const [showtimes, setShowtimes] = useState(loadShowtimes);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowtime((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShowtime((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddShowtime = () => {
    const updatedShowtimes = [...showtimes, showtime];
    setShowtimes(updatedShowtimes);
    localStorage.setItem('showtimes', JSON.stringify(updatedShowtimes)); // Lưu vào localStorage
    setShowtime({ movie: "", date: "", time: "", image: "" });
  };

  const handleDeleteShowtime = (index) => {
    const updatedShowtimes = showtimes.filter((_, i) => i !== index);
    setShowtimes(updatedShowtimes);
    localStorage.setItem('showtimes', JSON.stringify(updatedShowtimes)); // Cập nhật lại vào localStorage
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Quản lý lịch chiếu</h2>

      <div className="mb-4">
        <Input
          label="Tên phim"
          name="movie"
          value={showtime.movie}
          onChange={handleInputChange}
        />
        <Input
          label="Ngày chiếu"
          name="date"
          value={showtime.date}
          onChange={handleInputChange}
          type="date"
        />
        <Input
          label="Thời gian chiếu (24h)"
          name="time"
          value={showtime.time}
          onChange={handleInputChange}
          type="time" // Định dạng 24h
        />
        <div className="my-4">
          <label className="block text-lg font-semibold mb-2">Chọn hình ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
        </div>
        {showtime.image && (
          <div className="my-4">
            <img src={showtime.image} alt="Movie Showtime" className="w-32 h-32 object-cover" />
          </div>
        )}
        <Button color="blue" onClick={handleAddShowtime}>Thêm lịch chiếu</Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Danh sách lịch chiếu</h3>
        <ul>
          {showtimes.map((showtime, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {showtime.image && (
                  <img src={showtime.image} alt="Movie Showtime" className="w-16 h-16 object-cover mr-4" />
                )}
                <span>{`${showtime.movie} - ${showtime.date} ${showtime.time}`}</span>
              </div>
              <Button color="red" onClick={() => handleDeleteShowtime(index)}>
                Xóa
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScheduleManagement;
