import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./admin/pages/login/LoginPage";
import RegisterPage from "./admin/pages/register/RegisterPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

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
