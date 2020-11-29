import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

type Props = {
  dark?: boolean;
  category?: string;
};

type categoryProps = {
  node: {
    id: string;
    name: string;
    slug: string;
  };
};

const colors = [
  'pink-300',
  'blue-300',
  'lightBlue-300',
  'green-300',
  'gray-300',
];

const Header: React.FC<Props> = ({ category, dark = false }) => {
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
          } flex h-full items-center text-md tracking-wider`}
        >
          {categories.allContentfulBlogCategory.edges.map(
            (edge: categoryProps, index: number) => {
              return (
                <li className="ml-8" key={edge.node.id}>
                  <Link
                    to={`/${edge.node.slug}/`}
                    className={
                      category === edge.node.slug
                        ? `text-${
                            colors[(index + 1) % 5]
                          } font-semibold border-b border-${
                            colors[(index + 1) % 5]
                          }`
                        : ''
                    }
                  >
                    {edge.node.name}
                  </Link>
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
