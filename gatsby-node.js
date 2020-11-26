const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const response = await graphql(`
    query {
      posts: allContentfulBlogPost {
        edges {
          node {
            slug
            category {
              slug
            }
          }
        }
      }
      categories: allContentfulBlogCategory {
        edges {
          node {
            slug
            name
            order
          }
        }
      }
    }
  `);

  response.data.posts.edges.forEach((edge) => {
    createPage({
      path: `/${edge.node.category.slug}/${edge.node.slug}`,
      component: path.resolve('./src/templates/article.tsx'),
      context: {
        slug: edge.node.slug,
      },
    });
  });

  response.data.categories.edges.forEach((category) => {
    createPage({
      path: `/${category.node.slug}`,
      component: path.resolve('./src/templates/article-list.tsx'),
      context: {
        slug: category.node.slug,
        name: category.node.name,
        order: category.node.order,
      },
    });
  });
};
