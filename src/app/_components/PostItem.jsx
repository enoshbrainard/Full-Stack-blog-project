import Image from "next/image";
import Link from "next/link";

export default function PostItem({ post }) {
  const { _id, title, image, topic, content } = post;

  return (
    <div className="flex flex-col border shadow rounded-lg overflow-hidden h-full cursor-pointer ml-3">
      {/* Image container with fixed height and cropping */}
      <div className="relative w-full h-48 ">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 flex-1 ">
        <div>
          <span className="inline-block bg-black text-white text-xs font-semibold px-2 py-1 rounded mb-2">
            {topic}
          </span>
          <h2 className="text-lg font-semibold mb-1">{title}</h2>
          <p className="text-3xl text-gray-600">
            {content.substring(0, 100)}...
          </p>
        </div>

        <Link
          href={`/post/${_id}`}
          className="mt-4 inline-block text-3xl font-medium  text-black hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
