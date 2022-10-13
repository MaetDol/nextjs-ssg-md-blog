import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { jsonRequest } from "../api/fetcher";
import { FallbackProps, withSwrFallback } from "../components/swr-fallback.hoc";
import { PostMetaData } from "../models/posts.model";
import postService from "./api/__services/post.service";

const GET_ALL_POST = `/api/posts`;

const PostList: NextPage = () => {
  const { data, error } = useSWR<PostMetaData[]>(GET_ALL_POST, jsonRequest);

  if (!data) return <div>로딩중입니다..</div>;
  if (error) {
    console.error(error);
    return <div>목록 요청 도중 에러가 발생했어요</div>;
  }

  return (
    <div>
      {data.map((meta) => (
        <Link href={"/" + meta.slug} key={meta.slug}>
          <a className="link-block">
            <div key={meta.slug}>
              {([] as string[]).concat(meta.categories).map((category) => (
                <span className="bradcrumb" key={category}>
                  {category} &gt;
                </span>
              ))}
              <h2 className="title">{meta.title}</h2>
              <span className="timestamp">{meta.date}</span>
              <p>{meta.description}</p>
              {([] as string[]).concat(meta.tags).map((tag) => (
                <span className="tag" key={tag}>
                  #{tag}{" "}
                </span>
              ))}
              <hr />
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default withSwrFallback(PostList);

type Fallback = {
  [GET_ALL_POST]: PostMetaData[];
};

export const getStaticProps: GetStaticProps<
  FallbackProps<Fallback>
> = async () => {
  const postMetaDatas = postService.getAllPostMetaData();

  return {
    props: {
      fallback: {
        [GET_ALL_POST]: postMetaDatas,
      },
    },
  };
};
