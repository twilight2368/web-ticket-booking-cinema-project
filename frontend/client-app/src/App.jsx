import { Button } from "@material-tailwind/react";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminBooking from "./pages/AdminBooking";
import MovieManagement from "./pages/MovieManagement";
import ScheduleManagement from "./pages/ScheduleManagement";
import NewsManagement from "./pages/NewsManagement";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path="/admin-booking" element={<AdminBooking />} />
            <Route path="/movie-management" element={<MovieManagement />} />
            <Route path="/schedule-management" element={<ScheduleManagement />} />
            <Route path="/news-management" element={<NewsManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

