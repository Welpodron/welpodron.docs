import { defineDocumentType, makeSource } from 'contentlayer/source-files';

import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

import { Transformer } from 'unified';

import { visit } from 'unist-util-visit';

import { Parent } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { is } from 'unist-util-is';

const rehypeCodeParser = (): Transformer => {
  return (tree): void => {
    visit(tree, { tagName: 'pre' }, (node: Parent) => {
      const text = toString(node, { includeImageAlt: false }).trim();
      if (text) {
        if (node.data) {
          node.data.rawCode = text;
        } else {
          node.data = {
            rawCode: text,
          };
        }
      }
    });
  };
};

//! Нужен потому что rehypePrettyCode оборачивает pre в div и rawCode переехал в div
//! Внутри pre rehypePrettyCode добавляет properties
const rehypeCodeCopier = (): Transformer => {
  return (tree): void => {
    visit(tree, { tagName: 'div' }, (node: Parent) => {
      const { rawCode } = node.data || {};

      if (!rawCode) {
        return;
      }

      const child = node.children[0] as Parent & {
        properties: Record<string, unknown>;
      };

      if (!child || !is(child, { tagName: 'pre' })) {
        return;
      }

      if (child.properties) {
        child.properties.rawCode = rawCode;
      } else {
        child.properties = {
          rawCode,
        };
      }
    });
  };
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/${doc._raw.flattenedPath}` },
    parent: {
      type: 'string',
      resolve: (doc) =>
        doc._raw.flattenedPath.split('/').slice(0, -1).join('/'),
    },
    depth: {
      type: 'number',
      resolve: (doc) => doc._raw.flattenedPath.split('/').length - 1,
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [
      [rehypeCodeParser],
      [
        rehypePrettyCode,
        {
          theme: 'css-variables',
        },
      ],
      [rehypeCodeCopier],
      [rehypeSlug],
      [rehypeAutolinkHeadings],
    ],
  },
});
