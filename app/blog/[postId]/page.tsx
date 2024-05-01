import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { getDetail, getBlog } from "@/libs/microcms";
import { Header } from "@/app/components/layout/header";
import dayjs from 'dayjs';
import Footer from "@/app/components/layout/footer/Footer";

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

    // 日付作成
    const createDate = new Date(post.createdAt)
    const updateDate = new Date(post.updatedAt)

    return (
        <>
            <Header />
            <div className="blog xl:px-96 md:px-48 sm:px-36 px-10" id="top">
                <div className="w-full md:text-lg font-bold my-8 text-center sm:text-sm">
                    <h1>{post.title}</h1>
                </div>
                <div className="w-full text-end sm: text-sm">
                    <h1>{`作成日時: ${dayjs(createDate).format('YYYY年MM月DD日')}`}</h1>
                    <h1>{`更新日時: ${dayjs(updateDate).format('YYYY年MM月DD日')}`}</h1>
                </div>
                <div className="md:text-md sm:text-sm">{parse(post.content)}</div>
            </div>
            <Footer />
        </>
    );
}