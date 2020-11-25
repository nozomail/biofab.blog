import React from 'react';

import Header from './header';

type Props = {
  title: string;
  isArticle?: boolean;
};

const Layout: React.FC<Props> = ({ title, isArticle = false, children }) => {
  return (
    <div>
      <div
        className={`${
          isArticle ? 'bg-blue-200' : 'bg-green-200'
        } pt-2 pb-8 px-8`}
      >
        <Header dark />
        <h1
          className={`${
            isArticle ? 'text-blue-400' : 'text-green-400'
          } max-w-screen-lg mx-auto text-5xl font-serif mt-6`}
        >
          {title}
        </h1>
      </div>
      <div className="py-8 px-8">
        <div className="max-w-screen-lg mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
