import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Layout from '../components/layout';

type edgeProps = {
  node: {
    id: string;
    title: string;
    slug: string;
    publishedDate: string;
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
            publishedDate
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <h1>Blog page</h1>
      <ul>
        {data.allContentfulBlogPost.edges.map((edge: edgeProps) => {
          return (
            <li key={edge.node.id}>
              <h2>{edge.node.title}</h2>
              <div>Posted on {edge.node.publishedDate}</div>
              <Link to={`/blog/${edge.node.slug}/`}>Read More</Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Blog;
