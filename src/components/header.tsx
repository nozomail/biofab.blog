import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { textColors } from '../utilities/constants/colors';

type categoryProps = {
  node: {
    id: string;
    name: string;
    slug: string;
  };
};

const Header: React.FC = () => {
  const [pathArr, setPathArr] = useState<string[]>([]);
  useEffect(() => {
    const currentPath = location.pathname.slice(
      1,
      location.pathname.length - 1
    );
    setPathArr(currentPath.split('/'));
  }, []);

  const { allContentfulCategory } = useStaticQuery(graphql`
    query {
      allContentfulCategory(sort: { order: ASC, fields: order }) {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between">
      <Link to="/" className="flex items-center">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-400"></div>
        <div className="text-md sm:text-xl font-semibold ml-2">Biofab.blog</div>
      </Link>

      <nav>
        <ul className="hidden lg:flex h-full items-center text-gray-400 text-md tracking-wider">
          {allContentfulCategory.edges.map(
            (edge: categoryProps, index: number) => {
              return (
                <li className="ml-8" key={edge.node.id}>
                  <Link
                    to={`/${edge.node.slug}/`}
                    className={
                      pathArr.length >= 2 && pathArr[0] === edge.node.slug
                        ? `text-${
                            textColors[index % 5]
                          } font-semibold border-b border-${
                            textColors[index % 5]
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
          <li className="ml-8">
            <Link to="/articles/">All</Link>
          </li>
        </ul>

        <button
          type="button"
          className="lg:hidden fixed top-2 right-2 sm:top-3 sm:right-5 p-2 text-gray-400 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-20">
            <div
              className="absolute inset-0 bg-gray-600 opacity-30"
              onClick={toggleMenu}
            ></div>
            <ul className="absolute inset-x-0 top-0 bg-white shadow-xl text-gray-400 flex flex-col lg:flex-row py-8 lg:py-0 items-center text-md tracking-wider">
              {allContentfulCategory.edges.map(
                (edge: categoryProps, index: number) => {
                  return (
                    <li className="py-4 lg:py-0 lg:ml-8" key={edge.node.id}>
                      {pathArr.length === 1 && pathArr[0] === edge.node.slug ? (
                        <span className="text-gray-200">{edge.node.name}</span>
                      ) : (
                        <Link
                          to={`/${edge.node.slug}/`}
                          className={
                            pathArr[0] === edge.node.slug
                              ? `text-${textColors[index % 5]} font-semibold`
                              : ''
                          }
                        >
                          {edge.node.name}
                        </Link>
                      )}
                    </li>
                  );
                }
              )}
              <li className="py-4 lg:py-0 lg:ml-8">
                {pathArr.length === 1 && pathArr[0] === 'articles' ? (
                  <span className="text-gray-200">All</span>
                ) : (
                  <Link to="/articles/" className="text-gray-400">
                    All
                  </Link>
                )}
              </li>
            </ul>

            <button
              type="button"
              className="lg:hidden fixed top-2 right-2 sm:top-3 sm:right-5 p-2 text-gray-400 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
