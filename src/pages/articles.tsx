import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ArticleListItem from '../components/articleListItem';

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
    tags:
      | {
          id: string;
          name: string;
          slug: string;
        }[]
      | null;
  };
};

const Blog: React.FC = () => {
  const { allContentfulArticle } = useStaticQuery(graphql`
    query {
      allContentfulArticle(sort: { fields: updatedAt, order: DESC }) {
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
              fluid(maxWidth: 320) {
                ...GatsbyContentfulFluid
              }
            }
            tags {
              id
              name
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Layout title="All articles" colorIndex={3}>
      <SEO title="All articles" />
      <ul>
        {allContentfulArticle.edges.map((edge: edgeProps) => {
          return (
            <ArticleListItem
              key={edge.node.id}
              {...edge.node}
              isCategoryList={false}
              isTagList={false}
            />
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
