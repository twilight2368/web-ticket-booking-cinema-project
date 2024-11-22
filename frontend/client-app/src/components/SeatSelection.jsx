import React, { useState } from "react";

function SeatSelection({selectedTime}){
    // Trang thai ghe
    const[seats, setSeats] = useState([
        { id: "A1", type: "normal", status: "available" },
        { id: "A2", type: "vip", status: "booked" },
        { id: "A3", type: "normal", status: "available" },
        { id: "B1", type: "normal", status: "available" },
        { id: "B2", type: "couple", status: "available" },
        { id: "B3", type: "couple", status: "available" },
        { id: "B4", type: "couple", status: "available" },
        { id: "B5", type: "couple", status: "available" },
        { id: "B6", type: "couple", status: "available" },
        { id: "B7", type: "couple", status: "available" },
        { id: "B8", type: "couple", status: "available" },
        { id: "B9", type: "couple", status: "available" },
        { id: "B10", type: "couple", status: "available" },
        { id: "B11", type: "couple", status: "available" },
        { id: "B12", type: "couple", status: "available" },
        { id: "B13", type: "couple", status: "available" },
    ]);
    const [selectedSeats, setSelectedSeats] = useState([]); // ghe dang chon
    const [timeLeft, setTimeLeft] = useState(300); // 5 phut dem nguoc

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
            <h2>Chọn ghế cho giờ chiếu: {selectedTime}</h2>
            <div>
                {/* Hiển thị đếm ngược */}
                <p>Thời gian giữ ghế: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
            </div>
            {/* Sơ đồ ghế */}
            <div className="grid grid-cols-5 gap-2">
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
            <div>
                <p>Ghế đã chọn: {selectedSeats.join(", ")}</p>
                <button
                    onClick={handleConfirmBooking}
                    className="bg-green-500 px-4 py-2 rounded-lg"
                >
                    Thanh toán
                </button>
            </div>
        </div>
    )
}
export default SeatSelection;