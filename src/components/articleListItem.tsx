import React from 'react';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Tag from '../components/tag';

import { textColors } from '../utilities/constants/colors';

type Props = {
  isCategoryList: boolean;
  isTagList: boolean;
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
        slug?: string;
      }[]
    | null;
};

const ArticleListItem: React.FC<Props> = ({
  isCategoryList,
  isTagList,
  title,
  slug,
  category,
  updatedAt,
  mainImage,
  tags,
}) => {
  return (
    <li className="border-b border-gray-200">
      <Link
        to={`/${category.slug}/${slug}/`}
        className="flex items-stretch py-6"
      >
        <Img
          fluid={mainImage.fluid}
          alt={title}
          className="flex-shrink-0 w-14 h-14 sm:w-40 sm:h-24"
        />
        <div className="flex flex-col flex-grow ml-4 sm:ml-8">
          <h2 className="text-md mb-2 sm:text-xl font-normal">{title}</h2>
          <div className="flex flex-col flex-grow sm:flex-row sm:justify-between">
            <div className="flex flex-wrap mb-auto">
              {!isCategoryList && (
                <div
                  className={`text-${
                    textColors[category.order % 5]
                  } font-bold tracking-wider mb-2 mr-4`}
                >
                  {category.name}
                </div>
              )}
              {!isTagList && (
                <div className="flex flex-wrap">
                  {tags !== null &&
                    tags.map((tag) => (
                      <div key={tag.id} className="mb-2">
                        <Tag {...tag} />
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-300 text-right mt-auto">
              {updatedAt}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ArticleListItem;
