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

const Index: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(
        limit: 3
        sort: { order: DESC, fields: publishedDate }
      ) {
        edges {
          node {
            slug
            id
            title
            publishedDate(formatString: "DD MMM, YYYY")
          }
        }
      }
    }
  `);

  return (
    <Layout title="Home">
      <ul>
        {data.allContentfulBlogPost.edges.map((edge: edgeProps) => {
          return (
            <li key={edge.node.id} className="border-b border-gray-200">
              <Link
                to={`/blog/${edge.node.slug}/`}
                className="flex items-start p-6"
              >
                <img src="https://via.placeholder.com/100" />
                <div className="flex-grow ml-8">
                  <div className="flex justify-between mb-4">
                    <div className="flex">
                      <div className="text-sm text-white py-1 px-3 mr-2 bg-lightBlue-300">
                        Tag1
                      </div>
                      <div className="text-sm text-white py-1 px-3 mr-2 bg-green-300">
                        Tagtag2
                      </div>
                    </div>
                    <div className="text-gray-300">
                      {edge.node.publishedDate}
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold">{edge.node.title}</h2>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Index;
