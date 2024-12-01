const movieData = {
    title: "VENOM: THE LAST DANCE-T13",
    origin: "Xuất xứ: Mỹ",
    releaseDate: "Khởi chiếu: 25/10/2024",
    rating: "T13: Phim được phổ biến đến khán giả từ đủ 13 tuổi trở lên;",
    showtimes: ["19:10", "19:50", "20:30", "21:00", "21:45", "21:50", "22:30", "22:50", "23:15", "23:35"],
    poster: "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2F0017667_0.jpg&w=256&q=75",
    description: "Khoa học viễn tưởng, 100 phút"
};

function MovieCard() {
    return (
        <div className="container">
            <div className="movie-poster">
                <img src={movieData.poster} alt="Movie Poster" />
            </div>
            <div className="movie-details">
                <h2 className="movie-title">{movieData.title}</h2>
                <p className="movie-info">{movieData.origin}</p>
                <p className="movie-info">{movieData.releaseDate}</p>
                <p className="movie-info">{movieData.rating}</p>
                <p className="movie-description">{movieData.description}</p>
                <div className="schedule">
                    {movieData.showtimes.map((time, index) => (
                        <TimeButton key={index} time={time} />
                    ))}
                    <button className="add-button">+</button>
                </div>
            </div>
        </div>
    );
}

function TimeButton({ time }) {
    const [hover, setHover] = React.useState(false);

    return (
        <div
            className="time-button-container"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <button className="time-button">{time}</button>
            {hover && (
                <div className="action-buttons">
                    <button className="edit-button">Sửa</button>
                    <button className="delete-button">Xóa</button>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<MovieCard />, document.getElementById('root'));
