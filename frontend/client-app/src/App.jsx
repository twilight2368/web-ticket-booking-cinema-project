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
import Login from "./components/Login"
import Register from "./components/Register"
import TicketPricePage from "./components/TicketPricePage";

function App() {
  return (
    <Router>
      <Header/>
      <main className="flex flex-col min-h-screen bg-gray-900 pt-[70px]">
          <Routes>
            <Route path="/" element={
              <>
              <Banner />
              <MovieList />    
              </>
            }
            />
            <Route path="/schedule" element={<MovieSchedule />} />
            <Route path="/news" element={<NewsSection />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/prices" element={<TicketPricePage/>} />
          </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;