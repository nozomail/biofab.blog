import React from 'react';

import Header from './header';

type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <div className="bg-indigo-400 text-white pt-2 pb-8 px-8">
        <Header />
        <h1 className="text-5xl mt-6">{title}</h1>
      </div>
      <div className="py-8 px-8">{children}</div>
    </div>
  );
};

export default Layout;
