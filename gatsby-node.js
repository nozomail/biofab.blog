const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const response = await graphql(`
    query {
      articles: allContentfulArticle {
        edges {
          node {
            slug
            category {
              slug
            }
          }
        }
      }
      categories: allContentfulCategory {
        edges {
          node {
            slug
            name
            order
          }
        }
      }
      tags: allContentfulTag {
        edges {
          node {
            slug
            name
          }
        }
      }
    }
  `);

  response.data.articles.edges.forEach((edge) => {
    createPage({
      path: `/${edge.node.category.slug}/${edge.node.slug}`,
      component: path.resolve('./src/templates/article.tsx'),
      context: {
        article: edge.node.slug,
        category: edge.node.category.slug,
      },
    });
  });

  response.data.categories.edges.forEach((category) => {
    createPage({
      path: `/${category.node.slug}`,
      component: path.resolve('./src/templates/articlesByCategory.tsx'),
      context: {
        slug: category.node.slug,
        name: category.node.name,
        order: category.node.order,
      },
    });
  });

  response.data.tags.edges.forEach((tag) => {
    createPage({
      path: `/${tag.node.slug}`,
      component: path.resolve('./src/templates/articlesByTag.tsx'),
      context: {
        slug: tag.node.slug,
        name: tag.node.name,
      },
    });
  });
};
