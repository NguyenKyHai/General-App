'use client'
import blogPost from "@/lib/blogPost";
import BlogPost from "@/components/BlogPost";

export default function Post() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <BlogPost post={blogPost} />
      </div>
    </div>
  );
}
