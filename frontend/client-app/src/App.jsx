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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<><Banner /><div className="mt-8"><MovieList /></div></>} />
            <Route path="/schedule" element={<MovieList />} />
            <Route path="/news" element={<NewsSection />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
