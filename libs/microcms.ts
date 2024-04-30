import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
} from "microcms-js-sdk";

//ブログの型定義
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 記事一覧の取得
export async function getBlog(queries?: MicroCMSQueries) {
	const blog = await client.getList<Blog>({
		customRequestInit: {
			next: {
				revalidate: 3600,
			},
		},
		endpoint: String(process.env.MICROCMS_ENDPOINT),
		queries,
	});
	return blog;
}

// ブログの詳細を取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Blog>({
    customRequestInit: {
			next: {
				revalidate: 3600,
			},
		},
    endpoint: String(process.env.MICROCMS_ENDPOINT),
    contentId,
    queries,
  });

  return detailData;
};
