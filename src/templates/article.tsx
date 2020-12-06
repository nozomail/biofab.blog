import React from 'react';
import { graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from '../utilities/contentful/richText';

import Header from '../components/header';
import Footer from '../components/footer';
import Tag from '../components/tag';

import arrowLeft from '../images/left-arrow.svg';
import arrowRight from '../images/right-arrow.svg';

import { textColors, lgBgColors } from '../utilities/constants/colors';

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
      <div className="pt-4 pb-8 px-4 sm:px-8">
        <Header category={category.slug} />
        <div className="sm:text-center mt-8 mb-4">
          <h1
            className={`max-w-screen-lg mx-auto text-2xl sm:text-4xl leading-normal font-serif mb-4`}
          >
            {title}
          </h1>
          <div className="flex sm:justify-center mb-4">
            {tags !== null &&
              tags.map((tag) => <Tag key={tag.id} {...tag} isLink />)}
          </div>
          <span className="text-sm font-light">Updated on {updatedAt}</span>
        </div>
      </div>

      <div>
        <Img fluid={mainImage.fluid} alt={title} className="h-40 sm:h-80" />
        <div className="max-w-screen-lg mx-auto pt-8 py-20 px-4 sm:px-8">
          {documentToReactComponents(JSON.parse(body.raw), options)}
        </div>
      </div>

      {(articles[index - 1] || articles[index + 1]) && (
        <div className="max-w-screen-lg mx-auto sm:py-10 sm:px-8 flex flex-col sm:flex-row-reverse">
          <div className="w-full sm:ml-8">
            {articles[index + 1] && (
              <Link
                to={`/${category.slug}/${articles[index + 1].node.slug}/`}
                className={`${
                  lgBgColors[category.order % 5]
                } block w-full text-right sm:text-left py-6 pl-4 pr-14 sm:pl-8 bg-no-repeat bg-right bg-1.5rem bg-right-1rem`}
                style={{ backgroundImage: `url(${arrowRight})` }}
              >
                <div className="text-gray-400 border-b border-gray-400 inline-block text-xs tracking-wider mb-3">
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

          <div className="w-full">
            {articles[index - 1] && (
              <Link
                to={`/${category.slug}/${articles[index - 1].node.slug}/`}
                className={`${
                  lgBgColors[category.order % 5]
                } block w-full py-6 pr-4 pl-14 sm:pr-8 bg-no-repeat bg-left bg-1.5rem bg-left-1rem mt-4 sm:mt-0`}
                style={{ backgroundImage: `url(${arrowLeft})` }}
              >
                <div className="text-gray-400 border-b border-gray-400 inline-block text-xs tracking-wider mb-3">
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
        </div>
      )}

      <div className="max-w-screen-lg mx-auto mt-4 sm:mt-0 sm:px-8">
        <Link
          to="/articles/"
          className="block py-6 px-4 bg-gray-100 text-center"
        >
          <span className="text-xs text-gray-400 tracking-wider">
            ALL ARTICLES
          </span>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Article;
