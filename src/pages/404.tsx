import React from 'react';

import { Link } from 'gatsby';

import Header from '../components/header';
import Footer from '../components/footer';

const NotFoundPage: React.FC = () => (
  <div>
    <div className="pt-4 min-h-main pb-8 px-4 sm:px-8">
      <Header />
      <h1
        className={`max-w-screen-lg mx-auto text-2xl sm:text-5xl leading-normal font-serif text-center my-20`}
      >
        Not Found
      </h1>

      <h2 className="text-center">
        The link you followed may be broken, or the page may have been removed.
      </h2>
      <div className="text-center mt-20">
        <Link
          to="/"
          className="inline-block bg-pink-400 text-lg text-white py-2 px-4"
        >
          Go back to Biofab.blog
        </Link>
      </div>
    </div>

    <Footer />
  </div>
);

export default NotFoundPage;
