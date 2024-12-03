// import React, { useState } from "react";
// import NewsCard from "../components/NewsCard";
// import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Textarea } from "@material-tailwind/react";

// const NewsManagement = () => {
//   const [newsList, setNewsList] = useState([
//     { id: 1, title: "Vui Tết Trung Thu - Rinh Quà Vui Vẻ", date: "15/09/2024", description: "Chương trình hấp dẫn cho mọi nhà." },
//     // Thêm dữ liệu mẫu khác nếu cần
//   ]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [newNews, setNewNews] = useState({ title: "", date: "", description: "" });

//   const handleAddNews = () => {
//     setNewsList([...newsList, { id: newsList.length + 1, ...newNews }]);
//     setNewNews({ title: "", date: "", description: "" });
//     setIsDialogOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewNews({ ...newNews, [name]: value });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Quản lý tin tức</h1>
//         <Button onClick={() => setIsDialogOpen(true)} color="blue">
//           Thêm Tin Tức
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {newsList.map((news) => (
//           <NewsCard key={news.id} news={news} />
//         ))}
//       </div>

//       {/* Modal thêm tin tức */}
//       <Dialog open={isDialogOpen} handler={setIsDialogOpen}>
//         <DialogHeader>Thêm Tin Tức Mới</DialogHeader>
//         <DialogBody>
//           <div className="grid gap-4">
//             <Input label="Tiêu đề" name="title" value={newNews.title} onChange={handleInputChange} />
//             <Input label="Ngày đăng" name="date" value={newNews.date} onChange={handleInputChange} />
//             <Textarea label="Mô tả" name="description" value={newNews.description} onChange={handleInputChange} />
//           </div>
//         </DialogBody>
//         <DialogFooter>
//           <Button variant="text" color="red" onClick={() => setIsDialogOpen(false)}>
//             Hủy
//           </Button>
//           <Button color="blue" onClick={handleAddNews}>
//             Lưu
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// };

// export default NewsManagement;


//**2 update image
import React, { useState, useEffect } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";

const NewsManagement = () => {
  const [news, setNews] = useState({
    title: "",
    description: "",
    image: "", // Dữ liệu hình ảnh
  });

  // Lấy dữ liệu tin tức từ localStorage khi component mount
  const loadNews = () => {
    const savedNews = JSON.parse(localStorage.getItem('news')) || [];
    return savedNews;
  };

  const [newsList, setNewsList] = useState(loadNews);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNews((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNews = () => {
    const updatedNewsList = [...newsList, news];
    setNewsList(updatedNewsList);
    localStorage.setItem('news', JSON.stringify(updatedNewsList)); // Lưu vào localStorage
    setNews({ title: "", description: "", image: "" });
  };

  const handleDeleteNews = (index) => {
    const updatedNewsList = newsList.filter((_, i) => i !== index);
    setNewsList(updatedNewsList);
    localStorage.setItem('news', JSON.stringify(updatedNewsList)); // Cập nhật lại vào localStorage
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Quản lý tin tức</h2>

      <div className="mb-4">
        <Input
          label="Tiêu đề tin tức"
          name="title"
          value={news.title}
          onChange={handleInputChange}
        />
        <Textarea
          label="Mô tả tin tức"
          name="description"
          value={news.description}
          onChange={handleInputChange}
          rows={5}
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
        {news.image && (
          <div className="my-4">
            <img src={news.image} alt="News" className="w-32 h-32 object-cover" />
          </div>
        )}
        <Button color="blue" onClick={handleAddNews}>Thêm tin tức</Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Danh sách tin tức</h3>
        <ul>
          {newsList.map((newsItem, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {newsItem.image && (
                  <img src={newsItem.image} alt="News" className="w-16 h-16 object-cover mr-4" />
                )}
                <div>
                  <p className="font-semibold">{newsItem.title}</p>
                  <p>{newsItem.description}</p>
                </div>
              </div>
              <Button color="red" onClick={() => handleDeleteNews(index)}>
                Xóa
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsManagement;
