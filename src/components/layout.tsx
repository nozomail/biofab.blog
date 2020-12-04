import React from 'react';

import Header from './header';
import Footer from './footer';

import { textColors, mdBgColors } from '../constants/colors';

type Props = {
  title: string;
  colorIndex: number;
};

const Layout: React.FC<Props> = ({ title, colorIndex, children }) => {
  return (
    <div>
      <div className={`${mdBgColors[colorIndex]} pt-2 pb-8 px-8`}>
        <Header dark />
        <h1
          className={`text-${textColors[colorIndex]} max-w-screen-lg mx-auto text-5xl font-serif mt-6`}
        >
          {title}
        </h1>
      </div>
      <div className="py-8 px-8">
        <div className="max-w-screen-lg mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
