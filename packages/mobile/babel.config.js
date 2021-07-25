module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // env: {
    //   development: {
    //     plugins: [
    //       'transform-react-jsx-source',
    //       [
    //         'module-resolver',
    //         {
    //           root: ['./src'],
    //           alias: {
    //             tailwind: './styles/tailwind',
    //           },
    //         },
    //       ],
    //     ],
    //   },
    // },
  };
};
