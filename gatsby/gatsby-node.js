exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: require.resolve('./src/templates/SinglePizza.js'),
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};
