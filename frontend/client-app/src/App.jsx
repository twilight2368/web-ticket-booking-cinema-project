import { Button } from "@material-tailwind/react";
import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import MovieList from './components/MovieList';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import MovieDetail from "./components/MovieDetail";
import MovieSchedule from "./components/MovieSchedule";
import Login from "./components/Login";  // Đừng quên import các component như Login, Register
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Routes cho đăng nhập và đăng ký */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Routes cho các trang khác */}
        <Route path="/" element={
          <div className="grid grid-cols-3 grid-rows-[auto_1fr_auto] min-h-screen gap-4 p-4 bg-black">
            <main className="col-start-1 col-span-3 row-start-2 min-h-0">
              <Banner />
              <MovieList />
            </main>
          </div>
        } />
        <Route path="/schedule" element={<MovieSchedule />} />
        <Route path="/news" element={<NewsSection />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
