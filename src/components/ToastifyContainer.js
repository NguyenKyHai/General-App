// components/ToastifyContainer.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS Toastify

function ToastifyContainer() {
  return (
    <ToastContainer
      position="bottom-right"  // Đặt vị trí ở dưới cùng bên phải
      autoClose={3000}         // Đóng toast sau 3 giây
      hideProgressBar={false}  // Hiển thị thanh tiến trình
      newestOnTop={false}      // Các toast mới sẽ nằm dưới các toast cũ
      closeButton={true}       // Hiển thị nút đóng
      rtl={false}              // Không sử dụng hướng văn bản phải sang trái
      draggable={true}         // Cho phép kéo thả
    />
  );
}

export default ToastifyContainer;
