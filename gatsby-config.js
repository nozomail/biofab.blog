require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Biofab.blog`,
    titleTemplate: '%s | Biofab.blog',
    description: 'Unbiased Report on biofabrication for beginners to advanced',
    url: 'https://www.biofab.blog',
    image: '/images/sample.jpg',
    twitterUsername: '@biofab_blog',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Biofab.blog`,
        short_name: `Biofab.blog`,
        start_url: `/`,
        background_color: `#54ADB6`,
        theme_color: `#54ADB6`,
        display: `minimal-ui`,
        icon: `src/images/biofab-blog.png`,
      },
    },
    {
      resolve: 'gatsby-background-image',
      options: {
        // add your own characters to escape, replacing the default ':/'
        specialChars: '/:',
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
