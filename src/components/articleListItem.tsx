import React from 'react';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Tag from '../components/tag';

import { textColors } from '../constants/colors';

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
      <Link to={`/${category.slug}/${slug}/`} className="flex items-start py-6">
        <Img
          fluid={mainImage.fluid}
          alt={title}
          className="flex-shrink-0 w-40 h-24"
        />
        <div className="flex-grow ml-8">
          <div className="flex justify-between mb-4">
            <div className="flex">
              {!isCategoryList && (
                <div
                  className={`text-${
                    textColors[category.order % 5]
                  } font-bold tracking-wider mr-4`}
                >
                  {category.name}
                </div>
              )}
              {!isTagList && (
                <div className="flex">
                  {tags !== null &&
                    tags.map((tag) => <Tag key={tag.id} {...tag} />)}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-300">{updatedAt}</div>
          </div>
          <h2 className="text-xl font-normal">{title}</h2>
        </div>
      </Link>
    </li>
  );
};

export default ArticleListItem;
