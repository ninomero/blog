import Link from "next/link";
import { getBlog } from "../../libs/microcms";
import { Header } from "../components/layout/header";

export default async function StaticPage() {
    const blog = await getBlog();
    const contents = blog.contents;

    // ページの生成された時間を取得
    const time = new Date().toLocaleString();

    if (!contents || contents.length === 0) {
        return <h1>No contents</h1>;
    }

    return (
        <>
            <Header />
            <div>
                <h1>{time}</h1>
                <ul>
                    {contents.map((post) => {
                        return (
                            <li key={post.id}>
                                <Link href={`/blog/${post.id}`}>{post.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}