"use client";

import { useContext, useEffect, useState } from "react";
import { Global } from "@/app/GlobalContext";
import PostItem from "@/app/_components/PostItem";
export default function Page() {
  const { userid } = useContext(Global);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/userAdminPosts?userId=${userid}`,
          {
            credentials: "include", // if cookies are needed
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const posts = await res.json();
        console.log("user posts");
        console.log(posts);
        setData(posts);
      } catch (e) {
        console.log("Error fetching posts:", e.message);
      }
    };

    if (userid) getPosts(); // Ensure userId is available
  }, [userid]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Post</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8">
        {data.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
