import React from 'react';
import { graphql, Link } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from '../components/layout';

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      category {
        name
        order
      }
      publishedDate(formatString: "Do MMMM, YYYY")
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
        order: number;
      };
      publishedDate: string;
      body: {
        raw: string;
      };
    };
  };
};

const BlogPost: React.FC<dataProps> = ({ data }) => {
  return (
    <Layout
      title={data.contentfulBlogPost.title}
      color={data.contentfulBlogPost.category.order % 4}
    >
      <Link to="/articles">Article List</Link>
      <div className="content">
        <h1>{data.contentfulBlogPost.title}</h1>
        <div>{data.contentfulBlogPost.category.name}</div>
        <div className="meta">
          Posted on {data.contentfulBlogPost.publishedDate}
        </div>
        {documentToReactComponents(
          JSON.parse(data.contentfulBlogPost.body.raw)
        )}
      </div>
    </Layout>
  );
};

export default BlogPost;
