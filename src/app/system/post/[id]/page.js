'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { use } from 'react';  // Import React.use()

// Component hiển thị văn bản
const TextContent = ({ content }) => (
  <p className="text-lg text-gray-700 mb-3">{content}</p>
);

// Component hiển thị hình ảnh
const ImageContent = ({ src, alt, note }) => (
  <div className="mb-6">
    <img src={src} alt={alt || 'Ảnh'} className="w-full h-auto rounded-md shadow-lg" />
    {note && <p className="text-sm text-gray-500 mt-2">{note}</p>}
  </div>
);

// Component hiển thị trích dẫn
const QuoteContent = ({ content }) => (
  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-6">
    “{content}”
  </blockquote>
);

const PostPage = ({ params }) => {
  //const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
      } finally {
        setLoading(false);
      }
    }

    fetchPostData();
  }, [id]);  // Mỗi khi id thay đổi, fetch lại dữ liệu

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nếu dữ liệu chưa được tải về
  if (loading) return <LoadingSpinner />;

  if (!post) {
    return <p className="text-center text-red-500 mt-10">Không tìm thấy bài viết</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Ngày đăng: {new Date(post.date).toLocaleDateString('vi-VN')}
      </p>

      {/* Render nội dung bài viết */}
      {post.content.map((block, index) => {
        switch (block.type) {
          case 'text':
            return <TextContent key={index} content={block.content} />;
          case 'image':
            return block.media.map((media, j) => (
              <ImageContent key={`${index}-${j}`} src={media.src} alt={media.alt} note={media.note} />
            ));
          case 'quote':
            return <QuoteContent key={index} content={block.content} />;
          default:
            return null;
        }
      })}
      {showScrollTop && (
        <div className="mt-8 text-right">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow inline-flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
