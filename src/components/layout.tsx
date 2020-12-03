import React from 'react';

import Header from './header';
import Footer from './footer';

import { textColors, mdBgColors } from '../constants/colors';

type Props = {
  title: string;
  color: number;
};

const Layout: React.FC<Props> = ({ title, color, children }) => {
  return (
    <div>
      <div className={`${mdBgColors[color]} pt-2 pb-8 px-8`}>
        <Header dark />
        <h1
          className={`${textColors[color]} max-w-screen-lg mx-auto text-5xl font-serif mt-6`}
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
