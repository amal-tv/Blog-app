import React from "react";

export default function Homeposts({post}) {
  return (
    <div className="flex flex-col md:grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-md">
      {/* Image Section */}
      <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden md:col-span-1">
        <img
          src={post.photo ? `http://localhost:3000/${post.photo}` : 'https://via.placeholder.com/600x400'}
          alt="messi"
          className="w-full h-full object-cover"
          />

      </div>

      {/* Content Section */}
      <div className="flex flex-col space-y-4 md:col-span-3">
        <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>

        <div className="flex flex-col md:flex-row md:justify-between text-gray-600">
          <div>@{post.username}</div>
          <div className="flex space-x-2">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
          </div>
        </div>

        <p className="text-gray-700">
          {post.desc.slice(0, 200)}<span className="font-bold">...Read more</span>
        </p>
      </div>
    </div>
  );
}
