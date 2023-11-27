import { remark } from 'remark';
import matter from 'gray-matter';
import { visit } from 'unist-util-visit';
import { Post } from 'contentlayer/generated';
import { Heading } from 'mdast';
import { Transformer } from 'unified';
import { toString } from 'mdast-util-to-string';

export type NavTreeBranchType = {
  url: string;
  title: string;
  description?: string;
  parentUrl: string;
  isActive: boolean;
  depth: number;
  children: NavTreeBranchType[];
};

export type BreadcrumbsTreeBranchType = {
  url: string;
  title: string;
  parentUrl: string;
};

export type TocTreeBranchType = {
  url: string;
  title: string;
  depth: number;
  children: TocTreeBranchType[];
};

const remarkTocTree = (): Transformer => {
  return (tree, file): void => {
    const tocTree: TocTreeBranchType[] = [];
    let tocTreeLinkedList: Record<string, TocTreeBranchType> = {};

    visit(tree, 'heading', (node: Heading) => {
      const text = toString(node, { includeImageAlt: false }).trim();

      if (text) {
        const branch = {
          title: text,
          depth: node.depth,
          url: `#${text.toLowerCase().replace(/\s+/g, '-')}`,
          children: [],
        };

        if (node.depth === 2) {
          tocTree.push(branch);
          tocTreeLinkedList[node.depth] = branch;
        } else {
          //! Работает так как parent является ссылкой на оригинальный объект
          const parent = tocTreeLinkedList[node.depth - 1];
          if (parent) {
            parent.children.push(branch);
            tocTreeLinkedList[node.depth] = branch;
          }
        }
      }
    });

    tocTreeLinkedList = {};

    file.data.tocTree = tocTree;
  };
};

export const getTocTree = async (
  currentPostContent: string
): Promise<TocTreeBranchType[]> => {
  const matterResult = matter(currentPostContent);

  const processedContent = await remark()
    .use(remarkTocTree as any)
    .process(matterResult.content);

  return processedContent.data.tocTree as TocTreeBranchType[];
};

export const getNavTree = (
  allPosts: Post[],
  currentPost?: Post
): NavTreeBranchType[] => {
  let tree: NavTreeBranchType[] = allPosts.map((post) => ({
    description: post.description,
    url: post._raw.flattenedPath,
    title: post.title,
    isActive: currentPost
      ? post._raw.flattenedPath === currentPost._raw.flattenedPath
      : false,
    parentUrl: post.parent,
    depth: post.depth,
    children: [],
  }));

  let depth = 4;

  while (depth > 1) {
    const currentTree = tree.filter((node) => node.depth === depth);

    tree = tree.filter((node) => node.depth !== depth);

    currentTree.forEach((node) => {
      const parent = tree.find((n) => n.url === node.parentUrl);

      if (parent) {
        parent.children.push(node);

        if (node.isActive) {
          parent.isActive = true;
        }
      }
    });

    depth--;
  }

  return tree;
};

export const getBreadcrumbsTree = (
  allPosts: Post[],
  currentPost: Post
): BreadcrumbsTreeBranchType[] => {
  let tree: BreadcrumbsTreeBranchType[] = allPosts.map((post) => ({
    url: post._raw.flattenedPath,
    title: post.title,
    parentUrl: post.parent,
  }));

  let currentUrl = currentPost._raw.flattenedPath;

  let currentLeaf = {
    url: currentPost._raw.flattenedPath,
    title: currentPost.title,
    parentUrl: currentPost.parent,
  };

  const branch = [currentLeaf];

  while (currentUrl !== 'posts') {
    const parent = tree.find((n) => n.url === currentLeaf.parentUrl);

    if (!parent) {
      break;
    }

    branch.push(parent);

    currentUrl = parent.url;
    currentLeaf = parent;
  }

  branch.push({
    url: '',
    title: 'Домашняя страница',
    parentUrl: '',
  });

  return branch.reverse();
};
