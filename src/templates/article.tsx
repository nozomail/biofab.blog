import React from 'react';
import { graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Header from '../components/header';
import Footer from '../components/footer';

const colors = [
  'pink-300',
  'blue-300',
  'lightBlue-300',
  'green-300',
  'gray-300',
];

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      category {
        name
        order
      }
      publishedDate(formatString: "DD MMMM, YYYY")
      mainImage {
        fluid(maxWidth: 1280) {
          ...GatsbyContentfulFluid
        }
      }
      body {
        raw
      }
    }
  }
`;

type dataProps = {
  data: {
    contentfulBlogPost: {
      title: string;
      category: {
        name: string;
        slug: string;
        order: number;
      };
      publishedDate: string;
      mainImage: {
        fluid: FluidObject;
      };
      body: {
        raw: string;
      };
    };
  };
};

const BlogPost: React.FC<dataProps> = ({ data }) => {
  const {
    title,
    category,
    publishedDate,
    mainImage,
    body,
  } = data.contentfulBlogPost;

  console.log(body.raw);
  return (
    <div>
      <div className="pt-2 pb-8 px-8">
        <Header />
        <div className="text-center">
          <h1
            className={`max-w-screen-lg mx-auto text-4xl leading-normal font-serif mt-6 mb-4`}
          >
            {title}
          </h1>
          <Link
            to={`/${category.slug}`}
            className={`text-${colors[category.order % 5]} border-b border-${
              colors[category.order % 5]
            } font-normal pb-1`}
          >
            {category.name}
          </Link>
        </div>
      </div>
      <div>
        <Img fluid={mainImage.fluid} alt={title} className="h-80" />

        <div className="py-8 px-8">
          <div className="text-sm mb-4 text-right">{publishedDate}</div>
          {documentToReactComponents(JSON.parse(body.raw))}
          <div className="mt-4">
            <Link to="/articles" className="border-b pb-1">
              See all articles
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
