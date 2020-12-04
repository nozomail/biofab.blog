import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import BackgroundImg, { IFluidObject } from 'gatsby-background-image';

type categoryProps = {
  node: {
    id: string;
    name: string;
    slug: string;
    image: {
      fluid: IFluidObject;
    };
  };
};

const CategoryList: React.FC = () => {
  const { allContentfulCategory } = useStaticQuery(graphql`
    query {
      allContentfulCategory(sort: { order: ASC, fields: order }) {
        edges {
          node {
            name
            slug
            id
            image {
              fluid(maxWidth: 750) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <ul className="max-w-screen-lg mx-auto grid grid-cols-3 gap-8">
      {allContentfulCategory.edges.map((edge: categoryProps) => {
        return (
          <BackgroundImg
            Tag="li"
            fluid={edge.node.image.fluid}
            key={edge.node.id}
            className="h-40 relative"
          >
            <div className="bg-blue-600 opacity-50 absolute inset-0"></div>
            <Link
              to={`/${edge.node.slug}/`}
              className="text-3xl text-white font-normal tracking-wide absolute inset-0 flex items-center justify-center text-center p-4"
            >
              {edge.node.name}
            </Link>
          </BackgroundImg>
        );
      })}
    </ul>
  );
};

export default CategoryList;
