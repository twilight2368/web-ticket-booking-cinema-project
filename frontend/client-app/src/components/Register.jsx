import React, { useState } from 'react';
import { Button } from "@material-tailwind/react"; // Material Tailwind Button

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra các trường dữ liệu
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
    } else if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
    } else {
      setErrorMessage("");
      // Logic đăng ký (gọi API đăng ký, v.v.)
      console.log("Đăng ký với email:", email, "và mật khẩu:", password);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-lg bg-black border-orange-300 border-2 overflow-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>
        
        {/* Form đăng ký */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trường Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">Email</label>
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

          {/* Trường Xác nhận Mật khẩu */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium ">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 border-2 rounded-lg border-orange-300 focus:outline-none focus:ring-2 focus:ring-deep-orange-300 text-white bg-gray-800 mt-1"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Hiển thị thông báo lỗi */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          {/* Nút Đăng ký */}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
            Đăng ký
          </Button>
        </form>

        {/* Liên kết chuyển tới trang đăng nhập */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Bạn đã có tài khoản? <a href="/login" className="text-blue-500 hover:underline">Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
