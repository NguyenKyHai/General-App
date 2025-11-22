'use client'
import { useState } from 'react';
import { Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import Link from 'next/link';
import Paginate from './Pagination';
import FloatingFlowers from '@/components/FloatingFlowers';

const postsData = [
  {
    id: 1,
    title: 'Time line - Dòng thời gian',
    excerpt: 'Dòng thời gian những kỉ niệm quan trọng',
    image: 'https://img.freepik.com/premium-vector/valentines-day-couple-characters_1318093-14552.jpg',
     link: '/system/timeline'
  },
  {
    id: 2,
    title: 'Photo',
    excerpt: 'Nơi chứa những hình ảnh đáng iu',
    image: 'https://img.freepik.com/free-vector/hand-drawn-couples-collection_23-2149005805.jpg',
     link: '/system/photo'
  },
  {
    id: 3,
    title: 'Phạt',
    excerpt: 'Nơi chứa những hình phạt siu dễ thương',
    image: 'https://img.freepik.com/free-vector/cute-boy-cheek-pinching-his-girlfriend-happy-valentine-cartoon-character-illustration_56104-367.jpg',
     link: '/system/punishment'
  },
];

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsData.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(postsData.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <Link
            key={post.id}
            href={post?.link}
            className="hover:scale-105 transition-transform duration-300"
          >
            <Card className="w-full h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              {/* Hình ảnh */}
              <CardMedia
                component="div"
                className="h-full w-full overflow-hidden"
              >
                <img
                  src={post?.image}
                  alt={post?.title}
                  className="w-full h-full object-cover"
                />
              </CardMedia>

              {/* Nội dung */}
              <CardContent className="flex-grow">
                <h2 className="text-2xl font-semibold">{post?.title}</h2>
                <p className="mt-2 text-gray-600">{post?.excerpt}</p>
              </CardContent>

              {/* Nút (chỉ để trang trí thêm) */}
              <CardActions className="flex justify-end p-4">
                <Button size="small" color="primary">
                  Xem
                </Button>
              </CardActions>
            </Card>
          </Link>
        ))}
      </div>
      <FloatingFlowers />
      {/* Phân trang */}
      <Paginate page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default PostList;
