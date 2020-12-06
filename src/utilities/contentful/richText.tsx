/* eslint-disable react/display-name */
import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import {
  MARKS,
  BLOCKS,
  INLINES,
  Block,
  Inline,
} from '@contentful/rich-text-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Tag from '../../components/tag';
import { textColors } from '../constants/colors';

type tag = {
  id: string;
  name: string;
  slug?: string;
};

export const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode): ReactNode => (
      <strong className="font-bold">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: ReactNode): ReactNode => (
      <em className="italic">{text}</em>
    ),
    [MARKS.UNDERLINE]: (text: ReactNode): ReactNode => <u>{text}</u>,
    [MARKS.CODE]: (text: ReactNode): ReactNode => (
      <SyntaxHighlighter language="gcode" style={github}>
        {text}
      </SyntaxHighlighter>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (
      node: Block | Inline,
      children: ReactNode
    ): ReactNode => (
      <div className="mt-4 text-md font-light leading-relaxed">{children}</div>
    ),
    [BLOCKS.HEADING_1]: (
      node: Block | Inline,
      children: ReactNode
    ): ReactNode => (
      <h2 className="text-2xl font-semibold mt-20">{children}</h2>
    ),
    [BLOCKS.HEADING_2]: (
      node: Block | Inline,
      children: ReactNode
    ): ReactNode => <h3 className="text-xl font-semibold mt-10">{children}</h3>,
    [BLOCKS.HEADING_3]: (
      node: Block | Inline,
      children: ReactNode
    ): ReactNode => <h4 className="text-md font-semibold mt-8">{children}</h4>,
    [BLOCKS.HR]: (): ReactNode => <hr className="my-8" />,
    [BLOCKS.UL_LIST]: (
      node: Block | Inline,
      children: ReactNode
    ): ReactNode => (
      <ul className="list-disc">
        {children && children.map((child: ReactNode) => child)}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (
      node: Block | Inline,
      children: ReactNode
    ): ReactNode => (
      <ol className="list-decimal">
        {children && children.map((child: ReactNode) => child)}
      </ol>
    ),
    [BLOCKS.QUOTE]: (node: Block | Inline, children: ReactNode): ReactNode => (
      <q className="text-lg font-semibold my-8">{children}</q>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Block): ReactNode => {
      const { fluid, title, description, file } = node.data.target;
      return (
        <figure
          style={{ maxWidth: `${file.details.image.width}px` }}
          className="mx-auto py-8"
        >
          <Img fluid={fluid} alt={title} />
          {description && (
            <figcaption className="font-light mt-2">{description}</figcaption>
          )}
        </figure>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: Block): ReactNode => {
      const { category, slug, mainImage, title, tags } = node.data.target;
      return (
        <Link
          to={`/${category.slug}/${slug}/`}
          className="flex items-center border border-gray-100 pt-4 pb-2 px-4 sm:px-5 my-4 shadow-md"
        >
          <Img
            fluid={mainImage.fluid}
            alt={title}
            className="flex-shrink-0 w-14 h-14 sm:w-24 sm:h-18 mb-2"
          />
          <div className="flex flex-col flex-grow ml-4 sm:ml-5">
            <div className="text-md mb-2 sm:text-lg font-normal">{title}</div>
            <div className="flex flex-col flex-grow sm:flex-row sm:justify-between">
              <div className="flex flex-wrap mb-auto">
                <div
                  className={`text-${
                    textColors[category.order % 5]
                  } font-bold tracking-wider mb-2 mr-4`}
                >
                  {category.name}
                </div>
                <div className="flex flex-wrap">
                  {tags !== null &&
                    tags.map((tag: tag) => (
                      <div key={tag.id} className="mb-2">
                        <Tag {...tag} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    },
    [INLINES.HYPERLINK]: (
      node: Block | Inline,
      children: ReactNode
    ): ReactNode => (
      <a
        className="text-green-400 border-b border-green-400"
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};
