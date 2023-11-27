import { allPosts } from 'contentlayer/generated';
import { getBreadcrumbsTree, getTocTree, getNavTree } from '@/utils/utils';
import { Mdx } from '@/components/mdx/Mdx';
import { Shell } from '@/components/shell/Shell';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export const generateStaticParams = async (a: any) => {
  return allPosts.map((post) => {
    const path = post._raw.flattenedPath.split('/');

    return {
      env: path[1],
      group: path[2],
      slug: path[3],
    };
  });
};

export const generateMetadata = async ({
  params,
}: {
  params: { env: string; group: string; slug: string };
}) => {
  const post = allPosts.find((post) => {
    const path = post._raw.flattenedPath.split('/');

    if (
      path[1] === params.env &&
      path[2] === params.group &&
      path[3] === params.slug
    ) {
      return true;
    }
  });

  if (post) {
    return {
      keywords: [params.env, params.group, params.slug].join(', '),
      description: post.description,
      title: post.title,
    };
  }
};

const PostLayout = async ({
  params,
}: {
  params: { env: string; group: string; slug: string };
}) => {
  const groupPosts = allPosts.filter((post) => {
    const path = post._raw.flattenedPath.split('/');

    if (path[1] === params.env && path[2] === params.group) {
      return true;
    }
  });

  const currentPostIndex = groupPosts.findIndex((post) => {
    const path = post._raw.flattenedPath.split('/');

    if (path[3] === params.slug) {
      return true;
    }
  });

  if (currentPostIndex === -1) {
    return <p>Not found</p>;
  }

  const currentPost = groupPosts[currentPostIndex];
  const previousPost = groupPosts[currentPostIndex - 1];
  const nextPost = groupPosts[currentPostIndex + 1];

  const tocTree = await getTocTree(currentPost.body.raw);
  const navTree = getNavTree(allPosts, currentPost);
  const breadcrumbsTree = getBreadcrumbsTree(allPosts, currentPost);

  return (
    <Shell {...{ tocTree, navTree, breadcrumbsTree }}>
      <div>
        <h1>{currentPost.title}</h1>
        {currentPost.description && currentPost.description.length && (
          <p>{currentPost.description}</p>
        )}
      </div>
      <Mdx code={currentPost.body.code} />
      {(previousPost || nextPost) && (
        <div className="grid grid-cols-2 gap-4 not-prose mt-8">
          {previousPost && previousPost.depth === currentPost.depth && (
            <Link
              scroll={false}
              className="flex items-center col-start-1 grow rounded border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-4"
              href={previousPost.url}
            >
              <IconArrowLeft className="shrink-0 mr-4" />
              <div>
                <p className="text-sm mb-2 hidden md:block">
                  Предыдущая страница
                </p>
                <p className="font-medium text-sm md:text-base">
                  {previousPost.title}
                </p>
              </div>
            </Link>
          )}
          {nextPost && nextPost.depth === currentPost.depth && (
            <Link
              scroll={false}
              className="flex items-center col-start-2 grow rounded text-right border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-4"
              href={nextPost.url}
            >
              <div className="ml-auto">
                <p className="text-sm mb-2 hidden md:block">
                  Следующая страница
                </p>
                <p className="font-medium text-sm md:text-base">
                  {nextPost.title}
                </p>
              </div>
              <IconArrowRight className="shrink-0 ml-4" />
            </Link>
          )}
        </div>
      )}
    </Shell>
  );
};

export default PostLayout;
