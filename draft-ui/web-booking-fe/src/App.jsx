import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

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

function App() {
  return (
    <>
      <Helmet>
        <title>Trung tâm chiếu phim Ghibli</title>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="ticket-price" element={<TicketPricePage />} />
            <Route path="movies" element={<MoviePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="update-profile" element={<UpdateProfilePage />} />
            <Route path="update-password" element={<UpdatePasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*">
            <Route index element={<>Hello admin</>} />
            <Route path="*" element={<>Not found</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
