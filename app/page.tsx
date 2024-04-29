import { getList } from "@/libs/microcms";
import Link from "next/link";

export default async function Home() {
  const contents = await getList();

  if (!contents || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  // console.log(contents)

  return (
    <div>
      {contents.map((blog) => (
        <li key={blog.id}>
          <Link href={`blog/${blog.id}`}>
            {blog.title}
          </Link>
        </li>
      ))}
    </div>
  );
}
