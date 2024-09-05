import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { userContext } from "../context/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Postdetails() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(userContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Function to fetch the post and its comments
  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [postRes, commentsRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/posts/${id}`),
        axios.get(`http://localhost:3000/api/comments/post/${id}`)
      ]);

      setPost(postRes.data.post);
      setComments(commentsRes.data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="flex justify-center">Error: {error}</div>;
  if (!post) return <div className="flex justify-center">Post not found</div>;

  const handlePostDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${post._id}`, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  async function handleAddComment(){
  

    if (!comment.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3000/api/comments/create',
        { postId: id, comment, author: user.username, userId: user.userId },
        { withCredentials: true }
      );
      setComments([...comments, res.data]);
      setComment('');
    } catch (err) {
      console.error(err);
      alert('Failed to add comment. Please try again.');
    }
  };

  async function handleDeleteComment(commentId){
      try{
         await axios.delete(`http://localhost:3000/api/comments/${commentId}`,{withCredentials: true})
         setComments(comments.filter(comment => comment._id !== commentId));

      }catch(err){
        console.error(err);
      }
  }

  return (
    <div className="min-h-screen">
      <div className="px-8 py-6 max-w-4xl mx-auto">
        <Navbar />
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            {user.userId === post.userId && (
              <div className="flex space-x-4 text-gray-600">
                <button className="hover:text-blue-600">
                  <Link to={`/edit/${post._id}`}>Edit</Link>
                </button>
                <button onClick={handlePostDelete} className="hover:text-red-600 cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 text-gray-500 mb-4">
            <span className="font-semibold">@{post.username}</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
          </div>

          <div className="pt-4">
            <img
              className="w-full h-auto rounded-lg object-cover"
              src={post.photo ? `http://localhost:3000/${post.photo}` : 'https://via.placeholder.com/600x400'}
              alt="Post"
            />
          </div>

          <div className="pt-4">
            <p className="text-gray-700 leading-relaxed">{post.desc}</p>
          </div>

          <div className="pt-4 flex items-center space-x-4 text-gray-600">
            <span className="font-semibold">Categories:</span>
            {post.categories.map((c, i) => (
              <span
                key={i}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
                  <div className="flex items-center space-x-4 text-gray-700 mb-2">
                    <span className="font-semibold">@{comment.author}</span>
                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    <span>{new Date(comment.createdAt).toLocaleTimeString()}</span>
                    {user.userId === comment.userId && (
                      <div className="ml-auto flex space-x-2">
                        {/* <button className="text-blue-600 hover:text-blue-800">Edit</button> */}
                        <button  onClick={() => handleDeleteComment(comment._id)} className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}

            <div className="flex border-t pt-4">
              <input
                onChange={(e) => setComment(e.target.value)}
                type="text"
                value={comment}
                placeholder="Add a comment..."
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleAddComment} className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700">
                Add Comment
              </button>
            </div>
          </div>
        </div>
        <Footer className="pt-6" />
      </div>
    </div>
  );
}
