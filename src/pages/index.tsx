import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Header from '../components/header';
import Footer from '../components/footer';
import CategoryList from '../components/categoryList';

import Twitter from '../images/twitter.svg';
import LinkedIn from '../images/linkedIn.svg';

type articleProps = {
  node: {
    id: string;
    title: string;
    slug: string;
    category: {
      slug: string;
    };
    publishedDate: string;
    mainImage: {
      fluid: FluidObject;
    };
  };
};

const Index: React.FC = () => {
  const { allContentfulBlogPost } = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(
        limit: 3
        sort: { order: DESC, fields: publishedDate }
      ) {
        edges {
          node {
            id
            title
            slug
            category {
              slug
            }
            publishedDate(formatString: "DD MMM, YYYY")
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

  return (
    <div>
      <div className="bg-gray-100 pt-2 pb-8 px-8">
        <Header />
        <div className="max-w-screen-lg mx-auto font-serif py-10">
          <span className="block py-2 text-5xl leading-tight text-blue-400">
            Unbiased Report
            <br />
            on <span className="text-pink-400">Biofabrication</span>
          </span>
          <span className="block py-2 text-3xl italic text-blue-300">
            for beginners to advanced
          </span>
        </div>
      </div>

      <section className="max-w-screen-md mx-auto py-20 px-8">
        <h2 className="text-lg font-semibold text-green-400 tracking-wider text-center mb-6">
          LATEST ARTICLES
        </h2>
        <ul>
          {allContentfulBlogPost.edges.map((edge: articleProps) => {
            return (
              <li
                key={edge.node.id}
                className="border-b border-gray-100 p-2 pl-0"
              >
                <Link
                  to={`/${edge.node.category.slug}/${edge.node.slug}/`}
                  className="flex items-center text-md font-light"
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
      </section>

      <section className="bg-green-100 py-20 px-8">
        <h2 className="text-lg font-semibold text-green-400 tracking-wider text-center mb-12">
          WHERE TO START
        </h2>
        <CategoryList />
      </section>

      <section className="max-w-screen-md mx-auto py-20 px-8">
        <h2 className="text-lg font-semibold text-green-400 tracking-wider text-center mb-12">
          AUTHOR
        </h2>
        <div className="flex items-start">
          <div className="mr-8 text-md font-light leading-7">
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
          <div className="flex-shrink-0">
            <img src="https://placehold.jp/240x240.png" alt="" />
            <div className="flex justify-center mt-4">
              <a href="" target="_blank">
                <img className="h-6" src={Twitter} alt="Twitter" />
              </a>
              <a href="" target="_blank">
                <img className="h-6 ml-4" src={LinkedIn} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pink-100 py-20 px-8">
        <h2 className="text-lg font-semibold text-pink-400 tracking-wider text-center mb-6">
          GET IN TOUCH
        </h2>
        <form action="" className="max-w-sm mx-auto">
          <div>
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              id="name"
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
              rows={8}
              required
              className="block w-full border border-gray-200  focus:outline-none focus:border-pink-400 py-2 px-3 resize-none"
            ></textarea>
          </div>
          <div className="flex justify-center py-8">
            <button
              type="submit"
              className="block w-full bg-pink-400 text-lg text-white py-2 px-4"
            >
              Send
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
