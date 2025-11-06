'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { use } from 'react';  // Import React.use()

// Component để render đoạn văn bản
const TextContent = ({ content }) => <p className="text-lg text-gray-700 mb-6">{content}</p>;

// Component để render hình ảnh
const ImageContent = ({ src, alt }) => (
  <div className="mb-6">
    <img src={src} alt={alt} className="w-full h-auto rounded-md shadow-lg" />
  </div>
);

// Component để render quote
const QuoteContent = ({ content }) => (
  <blockquote className="border-l-4 pl-4 text-xl italic text-gray-600 mb-6">
    "{content}"
  </blockquote>
);

const PostPage = ({ params }) => {
  //const router = useRouter();
  const [post, setPost] = useState(null);

  // Unwrap Promise của params sử dụng React.use()
  const { id } = use(params);  // unwrap params object

  useEffect(() => {
    if (!id) return;  // Nếu id chưa có, dừng việc fetch

    async function fetchPostData() {
      try {
        const res = await fetch(`/api/post/${id}`);  // Giả sử API của bạn sẽ trả về dữ liệu bài viết
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
  if (!post) return <LoadingSpinner/>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-12">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h2>
        <p className="text-gray-500 text-sm mb-8">{post.date}</p>

        {/* Render nội dung bài viết */}
        {post.content.map((block, index) => {
          switch (block.type) {
            case "text":
              return <TextContent key={index} content={block.content} />;
            case "image":
              return <ImageContent key={index} src={block.src} alt={block.alt} />;
            case "quote":
              return <QuoteContent key={index} content={block.content} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default PostPage;
