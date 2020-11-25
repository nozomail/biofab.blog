import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import BackgroundImg, { IFluidObject } from 'gatsby-background-image';

import Header from '../components/header';

type articleProps = {
  node: {
    id: string;
    title: string;
    slug: string;
    category: {
      slug: string;
    };
    publishedDate: string;
    mainImage: {
      fluid: FluidObject;
    };
  };
};

type categoryProps = {
  node: {
    id: string;
    name: string;
    slug: string;
    image: {
      fluid: IFluidObject;
    };
  };
};

const Index: React.FC = () => {
  const { articles, categories } = useStaticQuery(graphql`
    query {
      articles: allContentfulBlogPost(
        limit: 3
        sort: { order: DESC, fields: publishedDate }
      ) {
        edges {
          node {
            id
            title
            slug
            category {
              slug
            }
            publishedDate(formatString: "DD MMM, YYYY")
            mainImage {
              fluid(maxWidth: 160) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
      categories: allContentfulBlogCategory(
        sort: { order: ASC, fields: order }
      ) {
        edges {
          node {
            name
            slug
            id
            image {
              fluid(maxWidth: 750) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <div>
      <div className="bg-gray-100 pt-2 pb-8 px-8">
        <Header />
        <div className="max-w-screen-lg mx-auto font-serif py-10">
          <span className="block py-2 text-5xl leading-tight text-blue-400">
            Unbiased Report
            <br />
            on <span className="text-pink-300">Biofabrication</span>
          </span>
          <span className="block py-2 text-3xl italic text-blue-300">
            for beginners to advanced
          </span>
        </div>
      </div>

      <section className="py-20 px-8">
        <h2 className="text-lg font-semibold text-green-400 tracking-wider text-center mb-6">
          LATEST ARTICLES
        </h2>
        <ul className="max-w-screen-md mx-auto">
          {articles.edges.map((edge: articleProps) => {
            return (
              <li
                key={edge.node.id}
                className="border-b border-gray-100 p-2 pl-0"
              >
                <Link
                  to={`/${edge.node.category.slug}/${edge.node.slug}/`}
                  className="flex items-center text-md font-light"
                >
                  <Img
                    fluid={edge.node.mainImage.fluid}
                    alt={edge.node.title}
                    className="flex-shrink-0 w-20 h-12"
                  />
                  <h3 className="ml-4 font-normal">{edge.node.title}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className=" bg-green-100 py-20 px-8">
        <h2 className="text-lg font-semibold text-green-400 tracking-wider text-center mb-12">
          WHERE TO START
        </h2>
        <ul className="max-w-screen-lg mx-auto grid grid-cols-3 gap-8">
          {categories.edges.map((edge: categoryProps) => {
            return (
              <BackgroundImg
                Tag="li"
                fluid={edge.node.image.fluid}
                key={edge.node.id}
                className="h-40 relative"
              >
                <div className="bg-blue-600 opacity-50 absolute inset-0"></div>
                <Link
                  to={`/${edge.node.slug}/`}
                  className="text-3xl text-white font-normal tracking-wide absolute inset-0 flex items-center justify-center text-center p-4"
                >
                  {edge.node.name}
                </Link>
              </BackgroundImg>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Index;
