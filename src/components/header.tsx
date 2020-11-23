import React from 'react';
import { Link } from 'gatsby';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between py-4">
      <div>
        <Link to="/" className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-pink-200"></div>
          <div className="text-2xl text-blue-600 font-semibold ml-2">
            Biofab.blog
          </div>
        </Link>
      </div>
      <nav>
        <ul className="flex text-gray-300">
          <li>
            <Link to="/articles/">Articles</Link>
          </li>
          <li className="ml-8">
            <Link to="/about/">About</Link>
          </li>
          <li className="ml-8">
            <Link to="/contact/">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
