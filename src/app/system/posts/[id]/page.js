// src/app/system/posts/[id]/page.js

'use client';  // Đảm bảo đây là một Client Component

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';  // Import React.use()

const PostPage = ({ params }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);

  // Unwrap Promise của params sử dụng React.use()
  const { id } = use(params);  // unwrap params object

  useEffect(() => {
    if (!id) return;  // Nếu id chưa có, dừng việc fetch

    async function fetchPostData() {
      try {
        const res = await fetch(`/api/posts/${id}`);  // Giả sử API của bạn sẽ trả về dữ liệu bài viết
        if (!res.ok) {
          throw new Error('Failed to fetch post data');
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPostData();
  }, [id]);  // Mỗi khi id thay đổi, fetch lại dữ liệu

  // Nếu dữ liệu chưa được tải về
  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-pink-600 mb-4">Post ID: {id}</h1>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-pink-500">{post.title}</h2>
        <p className="mt-4 text-gray-700">{post.content}</p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => router.push('/new-route')}
          className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
        >
          Go to New Route
        </button>
      </div>
    </div>
  );
};

export default PostPage;
