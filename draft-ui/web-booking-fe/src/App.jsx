import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import NewsPage from "./pages/news/NewsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UpdateProfilePage from "./pages/profile/UpdateProfilePage";
import UpdatePasswordPage from "./pages/profile/UpdatePasswordPage";
import TicketPricePage from "./pages/tickets/TicketPricePage";
import MoviePage from "./pages/movies/MoviePage";
import MovieLayout from "./pages/movies/MovieDetailPage";
import BookingPage from "./pages/booking/BookingPage";

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
import NewPageById from "./pages/news/NewPageById";

import LoginProvider from "./context/LoginProvider";
import LoginAdminProvider from "./admin/context/LoginAdminProvider";
import PaymentDetailPage from "./pages/payment/PaymentDetailPage";

function App() {
  return (
    <>
      <Helmet>
        <title>Trung tâm chiếu phim Ghibli</title>
      </Helmet>
      <Toaster />
      <LoginProvider>
        <LoginAdminProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="news/:id" element={<NewPageById />} />
                <Route path="ticket-price" element={<TicketPricePage />} />
                <Route path="movies/*">
                  <Route index element={<MoviePage />} />
                  <Route path=":id" element={<MovieLayout />} />
                </Route>
                <Route path="making-booking" element={<BookingPage />} />
                <Route path="booking/:id" element={<PaymentDetailPage />} />

                <Route path="profile" element={<ProfilePage />} />
                <Route path="update-profile" element={<UpdateProfilePage />} />
                <Route
                  path="update-password"
                  element={<UpdatePasswordPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
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
        </LoginAdminProvider>
      </LoginProvider>
    </>
  );
}

export default App;
