import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Layout from '../components/layout';

type edgeProps = {
  node: {
    id: string;
    title: string;
    slug: string;
    publishedDate: string;
    mainImage: {
      fluid: FluidObject;
    };
  };
};

const Blog: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            id
            title
            slug
            publishedDate(formatString: "DD MMM, YYYY")
            mainImage {
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
    <Layout title="Articles">
      <ul>
        {data.allContentfulBlogPost.edges.map((edge: edgeProps) => {
          return (
            <li key={edge.node.id} className="border-b border-gray-200">
              <Link
                to={`/blog/${edge.node.slug}/`}
                className="flex items-start py-6"
              >
                <Img
                  fluid={edge.node.mainImage.fluid}
                  alt={edge.node.title}
                  className="flex-shrink-0 w-40 h-24"
                />
                <div className="flex-grow ml-8">
                  <div className="flex justify-between mb-4">
                    <div className="flex">
                      <div className="text-xs text-white py-1 px-2 mr-2 bg-blue-400">
                        Tag1
                      </div>
                      <div className="text-xs text-white py-1 px-2 mr-2 bg-blue-400">
                        Tagtag2
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">
                      {edge.node.publishedDate}
                    </div>
                  </div>
                  <h2 className="text-xl font-normal">{edge.node.title}</h2>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
