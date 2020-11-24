import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

type Props = {
  dark?: boolean;
};

type categoryProps = {
  node: {
    id: string;
    name: string;
    slug: string;
  };
};

const Header: React.FC<Props> = ({ dark = false }) => {
  const categories = useStaticQuery(graphql`
    query {
      allContentfulBlogCategory(sort: { order: ASC, fields: order }) {
        edges {
          node {
            name
            slug
            id
          }
        }
      }
    }
  `);

  return (
    <header className="flex justify-between py-4">
      <div>
        <Link to="/" className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-pink-300"></div>
          <div
            className={`${
              dark ? 'text-white' : 'text-blue-600'
            } text-xl font-semibold ml-2`}
          >
            Biofab.blog
          </div>
        </Link>
      </div>
      <nav>
        <ul
          className={`${
            dark ? 'text-white' : 'text-gray-400'
          } flex h-full items-center text-sm tracking-wider`}
        >
          {categories.allContentfulBlogCategory.edges.map(
            (edge: categoryProps) => {
              return (
                <li className="ml-8" key={edge.node.id}>
                  <Link to={`/blog/${edge.node.slug}/`}>{edge.node.name}</Link>
                </li>
              );
            }
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
