import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { TiDelete } from "react-icons/ti";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [post, setPost] = useState(null); // State for the post data

  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();

  // Fetch post details
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
        const fetchedPost = res.data.post;
        setPost(fetchedPost);
        setTitle(fetchedPost.title);
        setDesc(fetchedPost.desc);
        setCats(fetchedPost.categories);
        if (fetchedPost.photo) {
          setPhotoPreview(`http://localhost:3000/${fetchedPost.photo}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchPost();
  }, [id]);

  // Function to add a category
  function addTocategory() {
    if (cat.trim() !== "") {
      setCats([...cats, cat]);
      setCat("");
    }
  }

  // Function to delete a category
  function deleteCategory(index) {
    setCats(cats.filter((_, i) => i !== index));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  }

  async function handleUpdatePost(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('categories', JSON.stringify(cats));
    
    formData.append('userId', post.userId); // Assuming userId remains unchanged
    formData.append('username', post.username); // Assuming username remains unchanged
     if(photo){
      formData.append('photo', photo);
     }
    try {
      await axios.put(`http://localhost:3000/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials : true
      },);
      navigate(`/posts/post/${id}`); // Redirect to the post detail page or another appropriate page
    } catch (err) {
      console.log(err);
    }
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow container mx-auto p-6">
        <form className="bg-white shadow-md rounded-lg p-8 space-y-6" onSubmit={handleUpdatePost}>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit this Post</h1>

          {/* Post Title */}
          <div className="mb-4">
            <input
              type="text"
              value={title}
              placeholder="Enter the post title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Adding Image */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload Image</label>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="sr-only"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm cursor-pointer hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>Select an image</span>
              </label>
              {/* Image Preview */}
              {photoPreview && (
                <div className="mt-4 flex justify-center items-center">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                type="text"
                placeholder="Enter the category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addTocategory();
                }}
                type="button"
                className="ml-4 px-4 py-2 bg-black text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>

            {/* Listed Categories */}
            <div className="space-y-2">
              {cats.map((category, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md shadow-sm">
                  <span className="text-gray-700">{category}</span>
                  <button
                    onClick={() => deleteCategory(index)}
                    type="button"
                    className="text-red-500 hover:text-red-600"
                  >
                    <TiDelete size={26} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <textarea
              rows={10}
              value={desc}
              placeholder="Enter the description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
