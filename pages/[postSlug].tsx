import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import useSWR from "swr";
import { textRequest } from "../custom-apis/fetcher";
import { FallbackProps, withSwrFallback } from "../components/swr-fallback.hoc";
import { parseMarkdown } from "../utils/remark";
import postService from "./api/__services/post.service";

const getPostUrl = (slug: string) => `/api/posts/${slug}`;

const Post: NextPage = () => {
  const { query } = useRouter();
  const { data: markdownString = "", error } = useSWR<string>(
    getPostUrl(query.postSlug?.toString() || "_N/A"),
    textRequest
  );
  console.log(markdownString);
  console.log(error);
  console.log(query.postSlug?.toString());

  const renderedPost = useMemo(() => {
    if (error) {
      console.error(error);
      return "";
    }

    return parseMarkdown(markdownString);
  }, [markdownString, error]);

  return (
    <div>
      <Link href="/">
        <a>&lt; 포스트 목록으로 돌아가기</a>
      </Link>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: renderedPost }} />
    </div>
  );
};

export default withSwrFallback(Post);

export async function getStaticPaths() {
  const slugs = postService.getAllSlugs();

  return {
    paths: slugs.map((postSlug) => ({
      params: { postSlug },
    })),
    fallback: false,
  };
}

type Fallback = {
  [key: string]: string;
};

export const getStaticProps: GetStaticProps<FallbackProps<Fallback>> = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug?.toString() || "";
  const markdownString = postService.getPost(slug) || "";

  return {
    props: {
      fallback: {
        [getPostUrl(slug)]: markdownString,
      },
    },
  };
};
