import { getBlog } from "@/libs/microcms";
import Link from "next/link";
import Image from "next/image"

import { NextUIProvider } from "@nextui-org/react";

// components
import { BlogPagination } from "./components";
import { Header } from "./components/layout/header";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const parPage = 5;

export default async function Home(props: Props) {
  const page = Number(props.searchParams.page ?? "1");
  // ブログ取得
  const contents = await getBlog({ offset: page * parPage - parPage, limit: parPage, });
  // ブログ総数取得
  const totalCount = contents.totalCount;

  return (
    <>
      <NextUIProvider>
        <Header />
        <div className="flex flex-col">
          <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 w-3/4 mx-auto">
            {contents.contents.map((blog) => (
              <article className="flex flex-col shadow p-2" key={blog.id}>
                <Link href={`/blog/${blog.id}`} className="flex flex-col items-center">
                  <Image
                    src={blog.eyecatch?.url ?? "/no-image.png"}
                    alt="アイキャッチ"
                    width={400}
                    height={600}
                    className="rounded-xl object-cover"
                  />
                  <h2 className="text-2 font-bold">{blog.title}</h2>
                </Link>
              </article>
            ))}
          </div>
        </div>
        <div className="pagination">
          <BlogPagination
            total={Math.ceil(totalCount / parPage)}
            initialPage={page}
          />
        </div>
      </NextUIProvider>

    </>
  );
}
