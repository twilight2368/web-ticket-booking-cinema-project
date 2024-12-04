export default function MainFooter() {
  const date = new Date();
  return (
    <>
      <footer>
        <div className="mx-auto p-8">
          <ul className="flex items-center justify-center flex-wrap gap-4 sm:gap-10 mb-6 sm:mb-10 text-sm md:text-base">
            <li>Chính sách</li>
            <li>Lịch chiếu</li>
            <li>Tin tức</li>
            <li>Giá vé</li>
            <li>Hỏi đáp</li>
            <li>Liên hệ</li>
          </ul>
          <div className="text-center space-y-2 text-xs md:text-base mb-10">
            <p>Địa chỉ: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
            <div className="text-center text-sm mt-2">
              <p className="mb-1">
                Copyright {date.getFullYear()}. All Rights Reserved.
              </p>
              <p>
                <span>Dev by</span>
                <a href="https://github.com/twilight2368"> Twilight2368 </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
