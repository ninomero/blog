import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { getBlog, getCategoryDetail } from "@/libs/microcms";
import { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "@/app/components/layout/header";
import { BlogPagination } from "@/app/components";

type Props = {
  params: { categoryId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Metaデータエラー出るので調べる必要あり
// export async function generateMetadata(props: Props): Promise<Metadata> {
// 	const id = props.params.categoryId;
// 	const category = await getCategoryDetail(id);

// 	return {
// 		title: `Sample Blog | ${category.name}のカテゴリーの記事一覧`,
// 	};
// }

const parPage = 5;

export default function CategoryArticleList(props: Props) {
  const contents = use(
    getBlog({
      filters: `categories[contains]${props.params.categoryId}`,
    })
  );

  const page = Number(props.searchParams.page ?? "1");

  // console.log(contents.contents[1].category.id)

  // ブログ総数取得
  const totalCount = contents.totalCount;

  return (
    <>
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4 mx-auto">
          {contents.contents.map((blog) => (
            <article className="flex flex-col shadow p4" key={blog.id}>
              <Link href={`/blog/${blog.id}`} className="flex flex-col items-center">
                <Image
                  src={blog.eyecatch?.url ?? "/no-image.png"}
                  alt="アイキャッチ"
                  width={1600}
                  height={1200}
                  className="rounded-xl object-cover"
                />
                <h2 className="text-3xl font-bold">{blog.title}</h2>
                {/* <div className="flex flex-wrap gap-2 px-4">
							{article.categories.map((category) => (
								<p
									className="text-xs bg-slate-300 rounded-full px-2"
									key={`${article.id}-${category.id}`}
								>
									{category.name}
								</p>
							))}
						</div> */}
              </Link>
            </article>
          ))}
        </div>
        <div className="pagination">
          <BlogPagination
            total={Math.ceil(totalCount / parPage)}
            initialPage={page}
          />
        </div>
    </>

  );
}