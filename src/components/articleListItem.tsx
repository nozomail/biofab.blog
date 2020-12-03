import React from 'react';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import { smBgColors } from '../constants/colors';

type Props = {
  title: string;
  slug: string;
  category: {
    slug: string;
  };
  color: number;
  publishedDate: string;
  mainImage: {
    fluid: FluidObject;
  };
};

const ArticleListItem: React.FC<Props> = ({
  title,
  slug,
  category,
  color,
  publishedDate,
  mainImage,
}) => {
  return (
    <li className="border-b border-gray-200">
      <Link to={`/${category.slug}/${slug}/`} className="flex items-start py-6">
        <Img
          fluid={mainImage.fluid}
          alt={title}
          className="flex-shrink-0 w-40 h-24"
        />
        <div className="flex-grow ml-8">
          <div className="flex justify-between mb-4">
            <div className="flex">
              <div
                className={`${smBgColors[color]} text-xs text-white py-1 px-2 mr-2`}
              >
                Tag1
              </div>
              <div
                className={`${smBgColors[color]} text-xs text-white py-1 px-2 mr-2`}
              >
                Tagtag2
              </div>
            </div>
            <div className="text-sm text-gray-300">{publishedDate}</div>
          </div>
          <h2 className="text-xl font-normal">{title}</h2>
        </div>
      </Link>
    </li>
  );
};

export default ArticleListItem;
