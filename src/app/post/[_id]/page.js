import Navigation from "@/app/_components/Navigation";
import Image from "next/image";

export default async function Page({ params }) {
  let data = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params._id}`
    );

    if (!res.ok) {
      console.log("Error fetching data");
      return <p>Failed to fetch data</p>;
    }

    data = await res.json();
  } catch (e) {
    console.log("Fetch error:", e.message);
    return <p>Server Error: {e.message}</p>;
  }

  if (!data) return <p>Post Not Found</p>;

  return (
    <>
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Post Image */}
        <div className="mb-6">
          <Image
            src={data.image}
            alt={data.title}
            width={1000}
            height={600}
            className="w-full h-auto object-cover rounded-xl shadow-emerald-50"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          {data.title}
        </h1>

        {/* Topic / Subtitle */}
        <p className="text-center text-gray-500 text-2xl mb-6">{data.topic}</p>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p>{data.content}</p>
        </div>
      </div>
    </>
  );
}
