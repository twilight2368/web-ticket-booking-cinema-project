import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*">
            <Route index element={<>Hello world</>} />
            <Route path="*" element={<>Not found</>} />
          </Route>
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
