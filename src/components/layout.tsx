import React from 'react';

import Header from './header';

type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <div className="bg-blue-200 pt-2 pb-8 px-8">
        <Header dark />
        <h1 className="max-w-screen-lg mx-auto text-5xl font-serif text-blue-400 mt-6">
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
