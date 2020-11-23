import React from 'react';

import Header from './header';

type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <div className="bg-gray-100 pt-2 pb-8 px-8">
        <Header />
        {title === 'Home' ? (
          <div className="text-5xl font-semibold py-10">
            <span className="block py-2 text-blue-400">
              Unbiased report on biofabrication
            </span>
            <span className="block py-2 text-lightBlue-300">
              for beginners to advanced
            </span>
          </div>
        ) : (
          <h1 className="text-5xl text-blue-400 font-semibold mt-6">{title}</h1>
        )}
      </div>
      <div className="py-8 px-8">{children}</div>
    </div>
  );
};

export default Layout;
