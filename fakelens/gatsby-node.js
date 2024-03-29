// This is used to prevent these libraries from running when executing Gatsby build
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /sampleNPMLibraryThatUsesWindowOrDocument/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  // Create pages dynamically using data from a JSON.
  // You can also make dynamic GraphQL queries here based on values from JSON or GraphQL queries.
  // You can only write dynamic GraphQL queries here and on the page component. Please view
  // the page component to see how dynamic GraphQL queries work there.
  // The following is a sample of how dynamic GraphQL queries work here.
  // #region
  // pagesData.forEach((item) => {
  //   const query = graphql`
  //     {
  //       file(relativePath: { eq: "${item.content.image}" }) {
  //       childImageSharp {
  //         fluid(maxWidth: ${IMAGEWIDTH}, maxHeight: ${IMAGEHEIGHT}, quality: 100) {
  //           aspectRatio
  //           base64
  //           sizes
  //           src
  //           srcSet
  //         }
  //       }
  //     }
  //   }
  //   `
  // })
  // #endregion

  // Generally the source of data comes from a GraphQL query or JSON. GraphQL queries are
  // usually plugged in by source plugins from CMSes, like Ghost or WordPress.
};
