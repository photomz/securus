import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

/**
 * LD-JSON is a structured data scheme for Google's search engine indexing
 * @param {Object} siteMetadata
 * @param {Object} postNode
 * @param {String} url
 * @param {Boolean} isBlog
 */
const generateLDJSON = (siteMetadata, postNode, url, isBlog) => {
  const { frontmatter } = postNode;
  const title = isBlog ? frontmatter.title : siteMetadata.title;
  const description = isBlog
    ? frontmatter.description || postNode.excerpt
    : siteMetadata.description;

  const datePublished = postNode && frontmatter && frontmatter.date
      ? moment(frontmatter.date, 'YYYY-MM-DD').toDate()
      : null;

  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
    },
  ];
  if (isBlog) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': url,
              name: title,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url,
        name: title,
        headline: title,
        author: {
          '@type': 'Person',
          name: siteMetadata.author,
          email: siteMetadata.authorEmail,
        },
        publisher: {
          name: siteMetadata.author,
          email: siteMetadata.authorEmail,
          '@type': 'Organization',
        },
        datePublished,
        description,
      }
    );
  }
  return schemaOrgJSONLD;
};

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: Record<string, any>[];
  keywords?: string[];
  title: string;
  location?: Record<string, any>;
  postNode?: Record<string, any>;
};

const SEO = ({
  description,
  lang,
  meta,
  keywords,
  title,
  location,
  postNode,
}: SEOProps) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          authorEmail
          siteUrl
        }
      }
      sitePage {
        path
      }
    }
  `);
  const metaDescription = description || siteMetadata.description;
  const isBlog = !!postNode.frontmatter;
  const url = location.origin + location.pathname;

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        titleTemplate={`%s | ${siteMetadata.title}`}
        script={[
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(
              generateLDJSON(siteMetadata, postNode, url, isBlog)
            ),
          },
        ]}
        meta={[
          {
            name: 'description',
            content: metaDescription,
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            property: 'og:description',
            content: metaDescription,
          },
          {
            property: 'og:type',
            content: isBlog ? 'article' : 'website',
          },
          {
            property: 'og:url',
            content: url,
          },
          {
            property: 'fb:app_id',
            content: '',
          },
          {
            name: 'twitter:card',
            content: 'summary',
          },
          {
            name: 'twitter:creator',
            content: siteMetadata.author,
          },
          {
            name: 'twitter:title',
            content: title,
          },
          {
            name: 'twitter:description',
            content: metaDescription,
          },
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
          },
        ]
          .concat(
            keywords.length > 0
              ? {
                  name: 'keywords',
                  content: keywords.join(', '),
                }
              : []
          )
          .concat(meta)}
      />
    </>
  );
};

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: '',
  location: {},
  postNode: {},
};

export default SEO;
