/* eslint-disable */
/**
 * We need to disable eslint on this file because the package dotenv was installed by default by
 * Gatsby.
 * The following code allows us to load different env files depending on the environment,
 * be it development or production.
 */
const path = require('path');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

/**
 * We can access environment variables here via process.env.API_NAME_OR_KEY
 * This way, we can keep sensitive data outside of the commit history.
 */

module.exports = {
  siteMetadata: {
    title: 'SongBot',
    description: 'Bringing order to the chaos that is your Spotify library',
    author: 'Markus Zhang',
    authorEmail: 'markuszhang8@gmail.com',
    siteUrl: 'https://hungry-ardinghelli-134d3b.netlify.app/',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/assets`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#fff',
      },
    },

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'SongBot',
        short_name: 'SongBot',
        start_url: '/',
        background_color: '#5566ff',
        theme_color: '#0048c5',
        display: 'standalone',
        icon: 'src/assets/images/cat.jpeg', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rules: [
          {
            test: /\.svg$/,
            include: /assets/,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    {
      resolve: 'gatsby-plugin-offline',
    },
  ],
};
