import React from 'react';
import { Link } from 'gatsby';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between py-4">
      <div>
        <Link to="/">Logo</Link>
      </div>
      <nav>
        <ul className="flex">
          <li>
            <Link to="/blog/">Blog</Link>
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
