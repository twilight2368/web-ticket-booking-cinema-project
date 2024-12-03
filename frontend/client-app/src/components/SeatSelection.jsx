import React, { useEffect, useState } from "react";

function SeatSelection({selectedTime}){
    // Trang thai
    const [roomId, setRoomId] = useState(null);
    const[seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]); // ghe dang chon
    const [timeLeft, setTimeLeft] = useState(300); // 5 phut dem nguoc
    const [rows, setRows] = useState(0); // Số hàng
    const [columns, setColumns] = useState(0); // Số cột

    // Lấy dữ liệu ghế từ API
    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch("http://localhost:4000/rooms");
                const data = await response.json();
                if(data && data.length > 0 ) {
                    const room = data[0]; // Lấy phòng đầu tiên (Có thể thay đổi nếu cần)
                    setSeats(data[0].seats); // Lấy ghế từ phòng đầu tiên   
                    setRoomId(room.roomId); // Gán roomId từ API
                    setRows(room.rows);
                    setColumns(room.columns);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };
        fetchSeats();
    },[]);

    // Bat dau dem nguoc khi component duoc render
    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0)); // Giam thoi gian, khong nho hon 0
        },1000);
        
        return () => clearInterval(timer); // Cleanup  timer khi unmount
    },[]);

    const handleSeatClick = (seatId) => {
        setSelectedSeats((prev) => {
            if(prev.includes(seatId)) {
                return prev.filter((id) => id !== seatId); // Bo ghe neu dang chon
            } else {
                return [...prev, seatId]; // Them ghe vao danh sach chon
            }
        });
    };
    const handleConfirmBooking = () => {
        setSeats((prevSeats) => 
            prevSeats.map((seat) => 
                selectedSeats.includes(seat.id)
                    ? {...seat, status:"booked"} // Dat ghe thanh "booked"
                    :seat
            )
        );
        setSelectedSeats([]); // xoa danh sach ghe dang chon
        alert("Dat ve thanh cong!");
    };      
      // Lựa chọn className dựa trên trạng thái
      const seatClasses = {
        selected: "bg-blue-500", // Ghế đang chọn
        available: "bg-gray-500", // Ghế trống
        booked: "bg-red-500", // Ghế đã đặt
      };

      const getSeatClass = (seat) => {
        if (seat.status === "available" && selectedSeats.includes(seat.id)) {
            return seatClasses["selected"];
        }
        return seatClasses[seat.status] || "bg-gray-500"
      }

    return (
        <div>
            <p className="flex justify-between w-full">
                <span className="border-black border-2 rounded-lg p-2 mt-2">Giờ chiếu: {selectedTime}</span>
                <span className="border-black border-2 rounded-lg p-2 flex items-center justify-center">Thời gian giữ ghế: {Math.floor(timeLeft / 60)}:{timeLeft % 60} </span>
            </p>
            <div className="flex items-center justify-center">
            <p className="text-xl  border-black rounded-lg border-2 p-2 mb-2">Phòng chiếu số: {roomId ||"Đang tải..."}</p>
            </div>
            
            {/* Sơ đồ ghế */}
            <div className="grid gap-2"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`, // Số cột động
                }}
                >
                {seats.map((seat) => (
                    <button 
                        key={seat.id}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.status === "booked"}
                        className={`px-4 py-2 rounded-lg ${getSeatClass(seat)}`}
                    >
                        {seat.id}
                    </button>
                ))}
            </div>

            {/* Tổng tiền và thanh toán*/}
            <div className="flex justify-between w-full">
                <p className="border-black border-2 rounded-lg p-2 mt-2 inline-block">Ghế đã chọn: {selectedSeats.join(", ")}</p>
                <button
                    onClick={handleConfirmBooking}
                    className="bg-green-500 px-4 py-2 rounded-lg mt-2 block"
                >
                    Thanh toán
                </button>
            </div>
        </div>
    )
}
export default SeatSelection;