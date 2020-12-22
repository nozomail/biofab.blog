import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import axios from 'axios';

import SEO from '../components/seo';
import Header from '../components/header';
import Footer from '../components/footer';
import CategoryList from '../components/categoryList';

import Twitter from '../images/twitter.svg';
import LinkedIn from '../images/linkedin.svg';

type articleProps = {
  node: {
    id: string;
    title: string;
    slug: string;
    category: {
      slug: string;
    };
    updatedAt: string;
    mainImage: {
      fluid: FluidObject;
    };
  };
};

const Index: React.FC = () => {
  const { allContentfulArticle } = useStaticQuery(graphql`
    query {
      allContentfulArticle(limit: 3, sort: { order: DESC, fields: updatedAt }) {
        edges {
          node {
            id
            title
            slug
            category {
              slug
            }
            updatedAt(formatString: "DD MMM, YYYY")
            mainImage {
              fluid(maxWidth: 160) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<boolean | null>(null);

  const handleResponse = (status: boolean, form: HTMLFormElement) => {
    setIsSubmitting(false);
    setStatus(status);
    if (status) {
      form.reset();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setIsSubmitting(true);
    axios({
      method: 'post',
      url: process.env.GETFORM_ENDPOINT,
      data: new FormData(form),
    })
      .then(() => {
        handleResponse(true, form);
      })
      .catch(() => {
        handleResponse(false, form);
      });
  };

  return (
    <div>
      <SEO title="Home" />
      <div className="bg-gray-100 pt-4 pb-8 px-4 sm:px-8">
        <Header />
        <div className="max-w-screen-lg mx-auto font-serif text-center sm:text-left pt-8 sm:pb-4">
          <span className="block py-2 text-4xl sm:text-5xl leading-tight text-blue-400">
            Unbiased Report
            <br />
            on <span className="text-green-400">Biofabrication</span>
          </span>
          <span className="block py-2 text-2xl sm:text-3xl italic text-blue-300">
            for beginners to advanced
          </span>
        </div>
      </div>

      <section className="max-w-screen-md mx-auto pt-10 sm:pt-14 pb-20 px-4 sm:px-8">
        <h2 className="text-lg font-semibold text-green-400 tracking-wider text-center mb-10">
          LATEST ARTICLES
        </h2>
        <ul>
          {allContentfulArticle.edges.map((edge: articleProps) => {
            return (
              <li
                key={edge.node.id}
                className="border-b border-gray-100 p-2 pl-0"
              >
                <Link
                  to={`/${edge.node.category.slug}/${edge.node.slug}/`}
                  className="flex items-center text-sm sm:text-md"
                >
                  <Img
                    fluid={edge.node.mainImage.fluid}
                    alt={edge.node.title}
                    className="flex-shrink-0 w-20 h-12"
                  />
                  <h3 className="ml-4 font-normal">{edge.node.title}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 text-right">
          <Link
            to="/articles/"
            className="text-xs tracking-wider border-b border-gray-600"
          >
            MORE
          </Link>
        </div>
      </section>

      <section className="bg-green-100 pt-10 sm:pt-16 pb-20 px-4 sm:px-8">
        <h2 className="text-lg font-semibold text-green-400 tracking-wider text-center mb-16">
          WHERE TO START
        </h2>
        <CategoryList />
      </section>

      <section className="max-w-screen-md mx-auto pt-10 sm:py-16 pb-20 px-4 sm:px-8">
        <h2 className="text-lg font-semibold text-green-400 tracking-wider text-center mb-16">
          AUTHOR
        </h2>
        <div className="flex flex-col items-center sm:flex-row-reverse sm:items-start">
          <div className="flex-shrink-0 mb-8">
            <img
              src="https://placehold.jp/240x240.png"
              className="w-40 h-40 sm:w-60 sm:h-60"
              alt=""
            />
            <div className="flex justify-center mt-4">
              <a href="" target="_blank">
                <img className="h-6" src={Twitter} alt="Twitter" />
              </a>
              <a href="" target="_blank">
                <img className="h-6 ml-4" src={LinkedIn} alt="LinkedIn" />
              </a>
            </div>
          </div>
          <div className="text-md font-light leading-7 sm:mr-8">
            <p>Hi I’m Matt, a PhD candidate at the University of Melbourne.</p>
            <p className="mt-4">
              I have devoted the last 5 years to tissue engineering,
              biofabrication, and biomaterials engineering. In 2016 I received a
              Master’s in materials science from Osaka University, before
              working for CELLINK as a scientific applications specialist. Over
              the past two years I have attended dozens of academic conferences,
              including as a keynote speaker, and I have worked with researchers
              to develop bioprinting systems.
            </p>
            <p className="mt-4">
              This blog is a chronicle of my thoughts, with the aim of helping
              aspiring researchers get into biofabrication. I hope you find
              something that interests you!
            </p>
          </div>
        </div>
      </section>

      <section className="bg-pink-100 pt-10 sm:pt-16 pb-10 px-4 sm:px-8">
        <h2 className="text-lg font-semibold text-pink-400 tracking-wider text-center mb-10">
          GET IN TOUCH
        </h2>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block h-10 w-full border border-gray-200 focus:outline-none focus:border-pink-400 py-2 px-3"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block h-10 w-full border border-gray-200 focus:outline-none focus:border-pink-400 py-2 px-3"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="text-sm">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={8}
              required
              className="block w-full border border-gray-200  focus:outline-none focus:border-pink-400 py-2 px-3 resize-none"
            ></textarea>
          </div>
          <div className="flex justify-center py-8">
            <button
              type="submit"
              disabled={isSubmitting || !!status}
              className={`block w-full ${
                status ? 'bg-green-400' : 'bg-pink-400'
              } disabled:pointer-events-none text-lg text-white py-2 px-4`}
            >
              {status === null ? (
                isSubmitting ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={4}
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span>Send</span>
                )
              ) : status ? (
                <span>Sent successfully!</span>
              ) : (
                <span>Please try again.</span>
              )}
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
