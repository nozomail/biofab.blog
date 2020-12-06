/* eslint-disable react/display-name */
import React, { ReactNode } from 'react';
import {
  MARKS,
  BLOCKS,
  INLINES,
  Block,
  Inline,
} from '@contentful/rich-text-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
