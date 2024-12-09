import React, {useState,useEffect} from "react";
import PropTypes from "prop-types";
import SeatSelection from "./SeatSelection";


function Showtimes({showtimes}){
    const [selectedDate, setSelectedDate] = useState(showtimes[0]?.date);
    const [selectedTime, setSelectedTime] = useState(null)
    
    useEffect(() => {
        console.log('Showtimes received:', showtimes); // Kiểm tra dữ liệu nhận vào
      }, [showtimes]);
    
      if (!showtimes || showtimes.length === 0) return <p>No showtimes available</p>;

    return (
        <div className="bg-black p-4 rounded-lg mt-8 text-white border-black border-4">
            {/* Phần chọn ngày */}
            <div className="flex justify-center space-x-4 mb-4 bg-gray-800">
                {showtimes.map((day)=>(
                    <button
                        key={day.date}
                        className={`px-4 py-2 rounded-lg ${
                            selectedDate === day.date ? 'bg-red-500' : 'bg bg-gray-700'
                        }`}
                        onClick={()=> setSelectedDate(day.date)}>
                        <p className="font-bold">{day.date}</p>
                        <p>{day.day}</p>
                    </button>
                ))}
            </div>
            {/* Phần hiển thị giờ */}
            <div>
                <p className="text-orange-400 text-center mb-4>">
                Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
                </p>
                <div className="grid grid-cols-4 gap-4">
                    {showtimes
                        .find((day) =>day.date === selectedDate)
                        ?.times.map((time,index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedTime(time)} // Cập nhật giờ chiếu đã chọn
                                className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-center border-orange-300 border-2"
                            >{time}
                            </button>
                        ))
                    }
                </div>
            </div>
            {/* Giao diện chọn ghế*/}
            {selectedTime && (
                <SeatSelection selectedDate={selectedDate} selectedTime={selectedTime}/>
            )}
        </div>
    );
}
Showtimes.propTypes = {
    showtimes: PropTypes.arrayOf(
        PropTypes.shape({
            date:PropTypes.string.isRequired,
            day:PropTypes.string.isRequired,
            times:PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ).isRequired,
};

export default Showtimes;
