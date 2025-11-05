'use client'
// src/app/page.js
import PostList from '@/components/PostList';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold">Chào mừng bạn đến trang web dễ thương</h1>
      <p className="mt-4 text-lg">Nơi lưu giữ những kỉ niệm và khoảnh khắc đẹp nhất</p>
      <PostList />
    </div>
  );
}
