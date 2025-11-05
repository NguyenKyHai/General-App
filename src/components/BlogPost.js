import React from "react";

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

export default function BlogPost({ post }) {
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
}
