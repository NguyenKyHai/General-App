import { useEffect, useState } from 'react';

const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1000);  // Xử lý cho thiết bị có chiều rộng <= 768px (thường là mobile)
    };

    checkIfMobile();  // Kiểm tra ngay khi render lần đầu

    // Lắng nghe sự thay đổi kích thước cửa sổ
    window.addEventListener('resize', checkIfMobile);

    // Dọn dẹp event listener khi component unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

export default useMobileDetect;
