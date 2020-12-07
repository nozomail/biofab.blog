import React from 'react';

import Header from './header';
import Footer from './footer';

import { textColors, lgBgColors } from '../utilities/constants/colors';

type Props = {
  title: string;
  colorIndex: number;
};

const Layout: React.FC<Props> = ({ title, colorIndex, children }) => {
  return (
    <div>
      <div className="min-h-main">
        <div className={`${lgBgColors[colorIndex]} pt-4 pb-8 px-4 sm:px-8`}>
          <Header />
          <h1
            className={`text-${textColors[colorIndex]} max-w-screen-lg mx-auto text-3xl sm:text-5xl font-serif pt-8 sm:pb-4`}
          >
            {title}
          </h1>
        </div>
        <div className="py-8 px-4 sm:px-8">
          <div className="max-w-screen-lg mx-auto">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
