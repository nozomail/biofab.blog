import React from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import Layout from '../components/layout';
import ArticleListItem from '../components/articleListItem';

export const query = graphql`
  query($slug: String!) {
    allContentfulArticle(
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      sort: { fields: updatedAt, order: DESC }
    ) {
      edges {
        node {
          id
          title
          slug
          category {
            name
            slug
            order
          }
          updatedAt(formatString: "DD MMM, YYYY")
          mainImage {
            fluid(maxWidth: 750) {
              ...GatsbyContentfulFluid
            }
          }
          tags {
            id
            name
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
      name: string;
      slug: string;
      order: number;
    };
    updatedAt: string;
    mainImage: {
      fluid: FluidObject;
    };
    tags: {
      id: string;
      name: string;
    }[];
  };
};

type dataProps = {
  data: {
    allContentfulArticle: {
      edges: edgeProps[];
    };
  };
  pageContext: {
    name: string;
    order: number;
  };
};

const Blog: React.FC<dataProps> = ({ data, pageContext }) => {
  return (
    <Layout title={pageContext.name} colorIndex={3}>
      <ul>
        {data.allContentfulArticle.edges.map((edge: edgeProps) => {
          return (
            <ArticleListItem
              isCategoryList={false}
              isTagList={true}
              {...edge.node}
              key={edge.node.id}
            />
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
