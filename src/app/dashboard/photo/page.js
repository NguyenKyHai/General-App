"use client";

import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(null); // State để lưu URL ảnh đã tải lên
  const [file, setFile] = useState(null); // State để lưu file đã chọn
  const [publicId, setPublicId] = useState(""); // Lưu public_id khi upload thành công
  const [loading, setLoading] = useState(false); // Trạng thái loading khi upload
  const [error, setError] = useState(""); // State để lưu lỗi nếu có

  // Hàm xử lý khi người dùng chọn file
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Lấy file được chọn
    setFile(selectedFile); // Lưu file vào state
    setError(""); // Reset lỗi nếu có
    setPublicId(""); // Reset publicId
    setImageUrl(URL.createObjectURL(selectedFile)); // Tạo URL tạm thời để hiển thị ảnh
  };

  // Hàm upload ảnh lên server
  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");

    setLoading(true); // Bật trạng thái loading khi upload
    setError(""); // Reset lỗi trước khi upload
    const formData = new FormData();
    formData.append("file", file); // Đảm bảo file được gửi đi đúng

    try {
      const response = await fetch("/api/photo/upload", {
        method: "POST",
        body: formData, // Gửi formData vào API route
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrl(result.url); // Lưu URL hình ảnh trả về từ server
        setPublicId(result.public_id); // Lưu public_id (nếu cần thiết)
      } else {
        setError(result.error || "Error uploading image."); // Hiển thị lỗi nếu upload không thành công
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again."); // Lỗi chung
    } finally {
      setLoading(false); // Tắt loading sau khi xong
    }
  };

  // Hàm lấy ảnh từ server bằng public_id
  const handleGetImage = async () => {
    if (!publicId) return alert("Please enter the public_id");

    try {
      const response = await fetch(`/api/photo/getImage?public_id=${publicId}`);
      const result = await response.json();

      if (response.ok) {
        setImageUrl(result.secure_url); // Hiển thị lại ảnh nếu thành công
      } else {
        setError(result.error || "Error fetching image."); // Hiển thị lỗi khi không tìm thấy ảnh
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Upload and Get Image</h1>

      {/* Upload Image Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Image</h2>
        <input
          type="file"
          onChange={handleFileChange} // Khi chọn file sẽ gọi handleFileChange
          className="border p-2 rounded-md w-full mb-4"
        />
        <button
          onClick={handleUpload} // Khi nhấn upload sẽ gọi handleUpload
          disabled={loading} // Disable button khi đang upload
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
        >
          {loading ? (
            <span className="spinner-border animate-spin border-t-2 border-white rounded-full w-6 h-6 mr-2"></span>
          ) : (
            "Upload Image"
          )}
        </button>
      </div>

      {/* Hiển thị lỗi nếu có */}
      {error && <div className="mt-4 text-red-500">{error}</div>}

      {/* Hiển thị ảnh vừa tải lên nếu có */}
      {imageUrl && (
        <div className="mt-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Image</h2>
          <img
            src={imageUrl} // Sử dụng URL hình ảnh trả về hoặc URL tạm thời
            alt="Uploaded Image"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
          <p className="mt-2 text-gray-600">Public ID: {publicId}</p>
        </div>
      )}

      {/* Get Image Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Image by Public ID</h2>
        <input
          type="text"
          placeholder="Enter public_id"
          value={publicId}
          onChange={(e) => setPublicId(e.target.value)}
          className="border p-2 rounded-md w-full mb-4"
        />
        <button
          onClick={handleGetImage}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Get Image
        </button>
      </div>
    </div>
  );
}