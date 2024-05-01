import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
} from "microcms-js-sdk";

// カテゴリーの型定義
export type Category = {
  id: string;
  name: string;
}& MicroCMSDate

//ブログの型定義
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category: Category[]
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
				revalidate: Number(process.env.MICROCMS_REVALIDATE),
			},
		},
		endpoint: String(process.env.MICROCMS_ENDPOINT_BLOG),
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
				revalidate: Number(process.env.MICROCMS_REVALIDATE),
			},
		},
    endpoint: String(process.env.MICROCMS_ENDPOINT_BLOG),
    contentId,
    queries,
  });

  return detailData;
};

// カテゴリ一覧を取得
export async function getCategories(queries?: MicroCMSQueries) {
	const categories = await client.getList<Category>({
		customRequestInit: {
			next: {
				revalidate: Number(process.env.MICROCMS_REVALIDATE),
			},
		},
		endpoint: String(process.env.MICROCMS_ENDPOINT_CATEGORY),
		queries,
	});
	return categories;
}

// idに該当するカテゴリを取得
export async function getCategoryDetail(contentId: string, queries?: MicroCMSQueries) {

	const categoriesDetail = await client.getListDetail<Category>({
		customRequestInit: {
			next: {
				revalidate: Number(process.env.MICROCMS_REVALIDATE),
			},
		},
		endpoint: String(process.env.MICROCMS_ENDPOINT_CATEGORY),
		contentId,
		queries,
	});
	return categoriesDetail;
}