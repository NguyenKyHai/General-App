// src/app/page.js
import PostList from '@/components/PostList';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
      <p className="mt-4 text-lg">This is the home page of my personal blog.</p>
      <PostList />
    </div>
  );
}
