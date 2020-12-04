/* eslint-disable react/display-name */
import React, { ReactNode } from 'react';
import { graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import {
  MARKS,
  BLOCKS,
  INLINES,
  Block,
  Inline,
} from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Header from '../components/header';
import Footer from '../components/footer';
import Tag from '../components/tag';

import arrowLeft from '../images/left-arrow.svg';
import arrowRight from '../images/right-arrow.svg';

import { textColors, lgBgColors } from '../constants/colors';

export const query = graphql`
  query($article: String!, $category: String!) {
    thisPost: contentfulArticle(slug: { eq: $article }) {
      title
      slug
      category {
        slug
        order
      }
      updatedAt(formatString: "DD MMMM, YYYY")
      mainImage {
        fluid(maxWidth: 1280) {
          ...GatsbyContentfulFluid
        }
      }
      tags {
        id
        name
        slug
      }
      body {
        raw
      }
    }
    allPosts: allContentfulArticle(
      sort: { order: DESC, fields: updatedAt }
      filter: { category: { slug: { eq: $category } } }
    ) {
      edges {
        node {
          slug
          title
          mainImage {
            fluid(maxWidth: 750) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;

type dataProps = {
  data: {
    thisPost: {
      title: string;
      slug: string;
      category: {
        name: string;
        slug: string;
        order: number;
      };
      updatedAt: string;
      mainImage: {
        fluid: FluidObject;
      };
      tags:
        | {
            id: string;
            name: string;
            slug: string;
          }[]
        | null;
      body: {
        raw: string;
      };
    };
    allPosts: {
      edges: {
        node: {
          slug: string;
          title: string;
          mainImage: {
            fluid: FluidObject;
          };
        };
      }[];
    };
  };
};

const options = {
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
    [BLOCKS.HR]: () => <hr className="my-8" />,
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: ReactNode) => (
      <ul className="list-disc">
        {children && children.map((child: ReactNode) => child)}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: ReactNode) => (
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

const Article: React.FC<dataProps> = ({ data }) => {
  const {
    title,
    slug,
    category,
    updatedAt,
    mainImage,
    tags,
    body,
  } = data.thisPost;
  const articles = data.allPosts.edges;

  const index = articles.findIndex((article) => article.node.slug === slug);

  return (
    <div>
      <div className="pt-2 pb-8 px-8">
        <Header category={category.slug} />
        <div className="text-center mt-8 mb-4">
          <h1
            className={`max-w-screen-lg mx-auto text-4xl leading-normal font-serif mb-4`}
          >
            {title}
          </h1>
          <div className="flex justify-center mb-4">
            {tags !== null &&
              tags.map((tag) => <Tag key={tag.id} {...tag} isLink />)}
          </div>
          <span className="text-sm font-light">Updated on {updatedAt}</span>
        </div>
      </div>

      <div>
        <Img fluid={mainImage.fluid} alt={title} className="h-80" />
        <div className="max-w-screen-lg mx-auto pt-8 py-20 px-8">
          {documentToReactComponents(JSON.parse(body.raw), options)}
        </div>
      </div>

      {(articles[index - 1] || articles[index + 1]) && (
        <div className="max-w-screen-lg mx-auto py-20 flex">
          <div className="w-full">
            {articles[index - 1] && (
              <Link
                to={`/${category.slug}/${articles[index - 1].node.slug}/`}
                className={`${
                  lgBgColors[category.order % 5]
                } block w-full py-6 pr-8 pl-16 bg-no-repeat bg-left bg-2rem bg-left-1rem`}
                style={{ backgroundImage: `url(${arrowLeft})` }}
              >
                <div
                  className={`text-${
                    textColors[category.order % 5]
                  } border-b border-${
                    textColors[category.order % 5]
                  } inline-block text-xs font-semibold tracking-wider mb-3`}
                >
                  PREVIOUS ARTICLE
                </div>
                <div
                  className={`text-${
                    textColors[category.order % 5]
                  } font-serif text-lg`}
                >
                  {articles[index - 1].node.title}
                </div>
              </Link>
            )}
          </div>
          <div className="w-full ml-8">
            {articles[index + 1] && (
              <Link
                to={`/${category.slug}/${articles[index + 1].node.slug}/`}
                className={`${
                  lgBgColors[category.order % 5]
                } block w-full py-6 pl-8 pr-16 bg-no-repeat bg-right bg-2rem bg-right-1rem`}
                style={{ backgroundImage: `url(${arrowRight})` }}
              >
                <div
                  className={`text-${
                    textColors[category.order % 5]
                  } border-b border-${
                    textColors[category.order % 5]
                  } inline-block text-xs font-semibold tracking-wider mb-3`}
                >
                  NEXT ARTICLE
                </div>
                <div
                  className={`text-${
                    textColors[category.order % 5]
                  } font-serif text-lg`}
                >
                  {articles[index + 1].node.title}
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Article;
