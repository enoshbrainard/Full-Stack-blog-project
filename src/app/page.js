"use client";
import { useState } from "react";
import Navigation from "./_components/Navigation";
import PostList from "./_components/PostList";

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleFilterClick = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <>
      <Navigation />
      <main className="px-4 py-6">
        {/* Filter Buttons */}
        {/* <div className="flex flex-wrap justify-center gap-4 my-10">
          {/* <button
            onClick={() => handleFilterClick("Technology")}
            className="border border-black bg-blue-600 text-white text-md px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            TECHNOLOGY
          </button>
          <button
            onClick={() => handleFilterClick("Black Holes")}
            className="border border-black bg-blue-600 text-white text-md px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ABOUT BLACK HOLES
          </button>
          <button
            onClick={() => handleFilterClick("Bible")}
            className="border border-black bg-blue-600 text-white text-md px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            TEACHINGS OF BIBLE
          </button>
        </div> */}

        {/* Post List */}
        <PostList selectedTopic={selectedTopic} />
      </main>
    </>
  );
}
