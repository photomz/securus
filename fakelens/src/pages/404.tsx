import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <section>
      <div>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link to="/">
          <h2>Return to safety</h2>
        </Link>
      </div>
    </section>
  </>
);

export default NotFoundPage;
