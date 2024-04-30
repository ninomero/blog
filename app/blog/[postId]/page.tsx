import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { getDetail, getBlog } from "@/libs/microcms";
import { Header } from "@/app/components/layout/header";

export async function generateStaticParams() {
    const contents = await getBlog();

    const paths = contents.contents.map((post) => {
        return {
            postId: post.id,
        };
    });

    return [...paths];
}

export default async function StaticDetailPage({
    params: { postId },
}: {
    params: { postId: string };
}) {
    const post = await getDetail(postId);

    if (!post) {
        notFound();
    }

    return (
        <>
            <Header />
            <div className="blog">
                <div>
                    <h1>{post.title}</h1>
                </div>
                <div>{parse(post.content)}</div>
            </div>
        </>
    );
}