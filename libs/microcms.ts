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
 body: string;
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

// ブログ一覧を取得
export const getList = async (limit=10, offset=0, queries?: MicroCMSQueries) => {
 const listData = await client.getList<Blog>({
  endpoint: "blog",
  queries: {
    offset,
    limit
  },
 });

 console.log(listData.offset)
 console.log(listData.limit)
 console.log(listData.totalCount)

 if (listData.offset + listData.limit < listData.totalCount) {
    const contents: Blog[] = await getList(listData.limit, listData.offset + listData.limit)
    return [ ...listData.contents, ...contents ]
  }

 console.log(listData.contents)

 return listData.contents;
};

// ブログの詳細を取得
export const getDetail = async (
 contentId: string,
 queries?: MicroCMSQueries
) => {
 const detailData = await client.getListDetail<Blog>({
  endpoint: "blog",
  contentId,
  queries,
 });


 return detailData;
};