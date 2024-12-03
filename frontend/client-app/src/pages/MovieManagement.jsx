// import React, { useState } from "react";
// import MovieCard from "../components/MovieCard";
// import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";

// const MovieManagement = () => {
//   const [movies, setMovies] = useState([
//     { id: 1, title: "Hành Trình Của Moana 2", duration: "99 phút", releaseDate: "29/11/2024", description: "Phim về hành trình biển cả.", type: "2D" },
//     // Thêm dữ liệu mẫu khác nếu cần
//   ]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [newMovie, setNewMovie] = useState({ title: "", duration: "", releaseDate: "", description: "", type: "" });

//   const handleAddMovie = () => {
//     setMovies([...movies, { id: movies.length + 1, ...newMovie }]);
//     setNewMovie({ title: "", duration: "", releaseDate: "", description: "", type: "" });
//     setIsDialogOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMovie({ ...newMovie, [name]: value });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Quản lý phim</h1>
//         <Button onClick={() => setIsDialogOpen(true)} color="blue">
//           Thêm Phim
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {movies.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>

//       {/* Modal thêm phim */}
//       <Dialog open={isDialogOpen} handler={setIsDialogOpen}>
//         <DialogHeader>Thêm Phim Mới</DialogHeader>
//         <DialogBody>
//           <div className="grid gap-4">
//             <Input label="Tên phim" name="title" value={newMovie.title} onChange={handleInputChange} />
//             <Input label="Thời lượng" name="duration" value={newMovie.duration} onChange={handleInputChange} />
//             <Input label="Ngày phát hành" name="releaseDate" value={newMovie.releaseDate} onChange={handleInputChange} />
//             <Input label="Mô tả" name="description" value={newMovie.description} onChange={handleInputChange} />
//             <Input label="Loại phim" name="type" value={newMovie.type} onChange={handleInputChange} />
//           </div>
//         </DialogBody>
//         <DialogFooter>
//           <Button variant="text" color="red" onClick={() => setIsDialogOpen(false)}>
//             Hủy
//           </Button>
//           <Button color="blue" onClick={handleAddMovie}>
//             Lưu
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// };

// export default MovieManagement;


//**2 update image 
import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Textarea } from "@material-tailwind/react";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);  // Bỏ dữ liệu mẫu, mảng trống
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({ title: "", duration: "", releaseDate: "", description: "", type: "", image: "" });

  const handleAddMovie = () => {
    // Thêm phim mới vào danh sách (Có thể thay đổi để thêm vào database qua API)
    setMovies([...movies, { id: movies.length + 1, ...newMovie }]);
    setNewMovie({ title: "", duration: "", releaseDate: "", description: "", type: "", image: "" });
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMovie((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý phim</h1>
        <Button onClick={() => setIsDialogOpen(true)} color="blue">
          Thêm Phim
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Modal thêm phim */}
      <Dialog open={isDialogOpen} handler={setIsDialogOpen}>
        <DialogHeader>Thêm Phim Mới</DialogHeader>
        <DialogBody>
          <div className="grid gap-4">
            <Input label="Tên phim" name="title" value={newMovie.title} onChange={handleInputChange} />
            <Input label="Thời lượng" name="duration" value={newMovie.duration} onChange={handleInputChange} />
            <Input label="Ngày phát hành" name="releaseDate" value={newMovie.releaseDate} onChange={handleInputChange} />
            <Textarea label="Mô tả" name="description" value={newMovie.description} onChange={handleInputChange} rows={4} />
            <Input label="Loại phim" name="type" value={newMovie.type} onChange={handleInputChange} />
            
            {/* Chọn hình ảnh */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Chọn hình ảnh</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              />
              {newMovie.image && (
                <div className="mt-2">
                  <img src={newMovie.image} alt="Movie" className="w-32 h-32 object-cover rounded-md" />
                </div>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setIsDialogOpen(false)}>
            Hủy
          </Button>
          <Button color="blue" onClick={handleAddMovie}>
            Lưu
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default MovieManagement;
