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

function App() {
  return (
    <Router>
      <Header/>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr_auto] min-h-screen gap-4 p-4 bg-gray-900 scroll-smooth">
        <main className="col-start-1 col-span-3 row-start-2 min-h-0">
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
          </Routes>
        </main>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;