import React from 'react';
import { Link } from 'gatsby';

import { lgBgColors } from '../utilities/constants/colors';

type Props = {
  name: string;
  slug?: string;
  isLink?: boolean;
};

const Tag: React.FC<Props> = ({ isLink = false, name, slug }) => {
  return isLink ? (
    <Link to={`/${slug}`} className={`${lgBgColors[3]} text-xs py-1 px-2 mr-2`}>
      {name}
    </Link>
  ) : (
    <div className={`${lgBgColors[3]} text-xs py-1 px-2 mr-2`}>{name}</div>
  );
};

export default Tag;
