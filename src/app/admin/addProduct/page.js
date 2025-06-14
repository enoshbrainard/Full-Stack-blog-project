"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [image, setImage] = useState("/upload.svg");
  const [data, setData] = useState({
    topic: "",
    title: "",
    content: "",
    image: image,
  });

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const objurl = URL.createObjectURL(file);
      setImage(objurl);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "blog_preset");
      formData.append("cloud_name", "dqzjcl3hq");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dqzjcl3hq/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const json = await res.json();
        console.log(json.secure_url);
        setData((prev) => ({ ...prev, image: json.secure_url }));
      } catch (e) {
        console.log("Image upload error:", e);
      }
    }
  };

  const handlefunction = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/createposts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit post");
      }

      const result = await res.json();
      alert("Post added successfully!");
      console.log(result);
    } catch (e) {
      console.log("Error occurred:", e.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="font-medium text-3xl mb-3">Upload Thumbnail</p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">
            <Image src={image} alt="upload image" width={100} height={100} />
          </label>
          <input
            type="file"
            onChange={handleChange}
            hidden
            required
            id="image"
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <p className="font-medium text-2xl">Blog Title</p>
          <input
            type="text"
            className="w-full border border-gray-400 rounded p-3.5"
            name="title"
            placeholder="Type here..."
            onChange={handlefunction}
            value={data.title}
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <p className="font-medium text-2xl">Topic</p>
          <input
            type="text"
            className="w-full border border-gray-400 rounded p-3.5"
            placeholder="Type here..."
            onChange={handlefunction}
            value={data.topic}
            name="topic"
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <p className="font-medium text-2xl">Content</p>
          <textarea
            className="w-full border border-gray-400 rounded p-3.5"
            placeholder="Write here..."
            onChange={handlefunction}
            value={data.content}
            name="content"
          />
        </div>

        <button
          type="submit"
          className="border border-b-blue-300 rounded cursor-pointer bg-black text-white sm:w-1/4 mt-5 p-2"
        >
          Add
        </button>
      </form>
    </div>
  );
}
