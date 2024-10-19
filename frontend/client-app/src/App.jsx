import { Button } from "@material-tailwind/react";
import "./App.css";
import Header from "./Header";
import Banner from "./Banner"
import MovieList from "./MovieList";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header/>
      <Banner/>
      <MovieList/>
      <Footer/>
    </div>
  );
}

export default App;
