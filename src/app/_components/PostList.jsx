"use client";
import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import Loading from "./Loading";
export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getposts`
        ); // Make sure this matches your backend route
        const data = await res.json();
        console.log("Fetched posts");
        console.log(data);
        setLoading(false);
        setPosts(data);
      } catch (e) {
        console.log("error", e.message);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        //
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8">
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </>
  );
}
