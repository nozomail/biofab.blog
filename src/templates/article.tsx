import React from 'react';
import { graphql, Link } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from '../components/layout';

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
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
      publishedDate: string;
      body: {
        raw: string;
      };
    };
  };
};

const BlogPost: React.FC<dataProps> = ({ data }) => {
  return (
    <Layout title={data.contentfulBlogPost.title} isArticle>
      <Link to="/articles">Article List</Link>
      <div className="content">
        <h1>{data.contentfulBlogPost.title}</h1>
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
