import React, { useContext, useEffect, useState } from "react";
import { userContext } from '../context/userContext';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Profileposts() {
  const { user } = useContext(userContext);
  const [myposts, setMyposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user && user.userId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/posts/user/${user.userId}`);
          setMyposts(response.data);
          // console.log(user);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };

    fetchPosts();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // Optional: Handle loading or not authenticated state
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      {myposts.length > 0 ? (
        myposts.map(post => (
          <Link key={post._id} to={`/posts/post/${post._id}`} className="block">
            <div className="flex flex-col md:grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-md">
              {/* Image Section */}
              <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden md:col-span-1">
                <img
                  src={post.photo ? `http://localhost:3000/${post.photo}` : 'https://via.placeholder.com/600x400'}
                  alt='post'
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col space-y-4 md:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>

                <div className="flex flex-col md:flex-row md:justify-between text-gray-600">
                  <div>{post.username}</div> {/* Replace with your actual field for the author */}
                  <div className="flex space-x-2">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                <p className="text-gray-700">
                  {post.desc} {/* Replace with your actual field for the post content */}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>No posts found</div>
      )}
    </div>
  );
}
