import type { NextPage } from 'next';
import Link from 'next/link';
import { PostMetaData } from '../models/posts.model';
import postService from './api/__services/post.service';

interface Props {
  postMetaDatas: PostMetaData[];
}

const PostList: NextPage<Props> = ({ postMetaDatas }) => {
  return (
    <div>
      {postMetaDatas.map((meta) => (
        <Link href={'/' + meta.slug} key={meta.slug}>
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
                  #{tag}{' '}
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

export default PostList;

export async function getStaticProps() {
  const postMetaDatas = postService.getAllPostMetaData();

  return {
    props: { postMetaDatas },
  };
}
