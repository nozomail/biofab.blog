import React from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import Layout from '../components/layout';
import ArticleListItem from '../components/articleListItem';

export const query = graphql`
  query($slug: String!) {
    allContentfulBlogPost(
      filter: { category: { slug: { eq: $slug } } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      edges {
        node {
          id
          title
          slug
          category {
            slug
          }
          updatedAt(formatString: "DD MMM, YYYY")
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

type edgeProps = {
  node: {
    id: string;
    title: string;
    slug: string;
    category: {
      slug: string;
    };
    updatedAt: string;
    mainImage: {
      fluid: FluidObject;
    };
  };
};

type dataProps = {
  data: {
    allContentfulBlogPost: {
      edges: edgeProps[];
    };
  };
  pageContext: {
    slug: string;
    name: string;
    order: number;
  };
};

const Blog: React.FC<dataProps> = ({ data, pageContext }) => {
  console.log(pageContext.name, pageContext.order);
  return (
    <Layout title={pageContext.name} color={pageContext.order % 5}>
      <ul>
        {data.allContentfulBlogPost.edges.map((edge: edgeProps) => {
          return (
            <ArticleListItem
              {...edge.node}
              key={edge.node.id}
              color={pageContext.order % 5}
            />
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
