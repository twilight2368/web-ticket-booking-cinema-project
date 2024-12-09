import React, { useState } from 'react';
import { Button } from "@material-tailwind/react"; // Material Tailwind Button

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng nhập ở đây, ví dụ gọi API đăng nhập
    if (!email || !password) {
      setErrorMessage("Vui lòng nhập email và mật khẩu!");
    } else {
      setErrorMessage("");
      // Gọi API đăng nhập hoặc xử lý logic tiếp theo
      console.log("Đăng nhập với email:", email, "và mật khẩu:", password);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
      <div className="w-full max-w-sm bg-black p-6 rounded-lg shadow-lg border-orange-300 border-2">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
        
        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trường Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border-2 rounded-lg border-orange-300 focus:outline-none focus:ring-2 focus:ring-deep-orange-300 text-white bg-gray-800 mt-1"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Trường Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border-2 rounded-lg border-orange-300 focus:outline-none focus:ring-2 focus:ring-deep-orange-300 text-white bg-gray-800 mt-1"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Hiển thị thông báo lỗi */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          {/* Nút Đăng nhập */}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
            Đăng nhập
          </Button>
        </form>

        {/* Các liên kết hỗ trợ */}
        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">Quên mật khẩu?</a>
          <p className="text-sm text-gray-600 mt-2">
            Bạn chưa có tài khoản? <a href="/register" className="text-blue-500 hover:underline">Đăng ký</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
