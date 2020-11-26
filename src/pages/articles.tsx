import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import Layout from '../components/layout';
import ArticleListItem from '../components/articleListItem';

type edgeProps = {
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

const Blog: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
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
    <Layout title="All articles" color={1}>
      <ul>
        {data.allContentfulBlogPost.edges.map((edge: edgeProps) => {
          return (
            <ArticleListItem {...edge.node} key={edge.node.id} color={1} ca />
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
