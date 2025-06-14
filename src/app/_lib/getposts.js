import React from "react";

export default async function getposts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getposts`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("error", e.message);
    return {};
  }
}
