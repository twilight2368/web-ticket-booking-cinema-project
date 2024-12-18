import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

import AdminMainLayout from "./admin/layouts/AdminMainLayout";
import NotFoundAdminPage from "./admin/pages/NotFoundAdminPage";
import RoomAdminPage from "./admin/pages/rooms/RoomAdminPage";
import MovieAdminPage from "./admin/pages/movies/MovieAdminPage";
import { AddMovieAdminPage } from "./admin/pages/movies/AddMovieAdminPage";
import SchedulePage from "./admin/pages/schedule/SchedulePage";
import CreateAdminNewsPage from "./admin/pages/news/CreateAdminNewsPage";
import BookingAdminPage from "./admin/pages/booking/BookingAdminPage";
import AdminNewsPage from "./admin/pages/news/AdminNewsPage";
import UserAdminPage from "./admin/pages/users/UserAdminPage";
// import NewPageById from "./pages/news/NewPageById";

function App() {
  return (
    <>
      <Helmet>
        <title>Trung tâm chiếu phim Ghibli</title>
      </Helmet>
      <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/admin/*" element={<AdminMainLayout />}>
                <Route index element={<SchedulePage />} />
                <Route path="bookings" element={<BookingAdminPage />} />
                <Route path="movies" element={<MovieAdminPage />} />
                <Route path="movies/add" element={<AddMovieAdminPage />} />
                <Route path="rooms" element={<RoomAdminPage />} />
                <Route path="news" element={<AdminNewsPage />} />
                <Route path="news/add" element={<CreateAdminNewsPage />} />
                <Route path="users" element={<UserAdminPage />} />
                <Route path="*" element={<NotFoundAdminPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
