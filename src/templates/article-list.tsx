import React from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import Layout from '../components/layout';
import ArticleListItem from '../components/articleListItem';

export const query = graphql`
  query($slug: String!) {
    allContentfulBlogPost(
      filter: { category: { slug: { eq: $slug } } }
      sort: { fields: publishedDate, order: DESC }
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
    publishedDate: string;
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
  };
};

const Blog: React.FC<dataProps> = ({ data, pageContext }) => {
  return (
    <Layout title={pageContext.name}>
      <ul>
        {data.allContentfulBlogPost.edges.map((edge: edgeProps) => {
          return <ArticleListItem {...edge.node} key={edge.node.id} />;
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
