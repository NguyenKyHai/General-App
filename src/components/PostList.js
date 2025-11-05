'use client'
// src/app/components/PostList.js
import { useState } from 'react';
import { Card, CardContent, CardActions, Button } from '@mui/material';
import Link from 'next/link';
import Paginate from './Pagination';

const postsData = [
  { id: 1, title: 'Blog Post Title 1', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, title: 'Blog Post Title 2', excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 3, title: 'Blog Post Title 3', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 4, title: 'Blog Post Title 4', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 5, title: 'Blog Post Title 5', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 6, title: 'Blog Post Title 6', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 7, title: 'Blog Post Title 7', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 8, title: 'Blog Post Title 8', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 9, title: 'Blog Post Title 9', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 10, title: 'Blog Post Title 10', excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
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
          <Card
            key={post.id}
            className="w-full h-96 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <CardContent className="flex-grow">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-gray-600">{post.excerpt}</p>
            </CardContent>
            <CardActions className="flex justify-end p-4">
              <Link href={`/system/posts/${post.id}`}>
                <Button size="small" color="primary">
                  Read more
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>

      {/* Phân trang */}
      <Paginate page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default PostList;
