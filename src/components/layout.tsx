import React from 'react';

import Header from './header';

const bgColors = [
  'bg-pink-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-lightBlue-200',
];
const textColors = [
  'text-pink-400',
  'text-blue-400',
  'text-green-400',
  'text-lightBlue-400',
];

type Props = {
  title: string;
  color: number;
};

const Layout: React.FC<Props> = ({ title, color, children }) => {
  return (
    <div>
      <div className={`${bgColors[color]} pt-2 pb-8 px-8`}>
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
    </div>
  );
};

export default Layout;
