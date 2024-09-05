import React, { useContext, useEffect, useState } from "react";
import Homeposts from "../components/Homeposts";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { userContext } from '../context/userContext';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [noposts, setNoposts] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(userContext);

  useEffect(() => {
    const postFetch = async () => {
      setLoader(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/posts?filter=${filter}`);
        setPosts(res.data);
        setNoposts(res.data.length === 0);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoader(false);
    };
    postFetch();
  }, [filter]);

  return (
    <>
      <Navbar setFilter={setFilter} />

      <main className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="container mx-auto space-y-6 md:space-y-8">
          {/* Post Listings */}
          <div className="space-y-6 md:space-y-8">
            {loader ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : !noposts ? (
              posts.map(post => (
                <Link
                  key={post._id}
                  to={user ? `/posts/post/${post._id}` : '/login'}
                  className="block"
                >
                  <Homeposts post={post} />
                </Link>
              ))
            ) : (
              <h1 className="flex justify-center items-center text-lg font-semibold text-gray-700">
                No posts available
              </h1>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
