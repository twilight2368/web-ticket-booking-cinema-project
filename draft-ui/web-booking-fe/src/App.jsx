import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainLayout />}>
            <Route index element={<></>} />
            <Route path="*" element={<>Not found</>} />
          </Route>
          <Route path="/login" element={<>Login</>} />
          <Route path="/register" element={<>Register</>} />
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
