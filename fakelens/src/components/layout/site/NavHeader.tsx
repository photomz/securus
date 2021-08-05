import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'gatsby';
import { GradientCircle } from '../../../icons';
import { Button } from '../../../styles/shared-styled-components';

const GrayButton = tw(Button)`text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3`;
const StickyHeader = styled.header(({ top }) => [
  tw`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out`,
  !top && tw`bg-white blur shadow-lg`,
]);

const WhiteHeaderButton = styled.a(({ top }) => [
  tw`py-2 font-medium items-center md:bg-opacity-90 transition duration-300 ease-in-out text-gray-600 rounded hover:text-gray-900 px-5 flex`,
  top && tw`bg-white blur`,
]);

const params = new URLSearchParams({
  client_id: process.env.GATSBY_SPOTIFY_CLIENT_ID!,
  response_type: 'code',
  redirect_uri: process.env.GATSBY_SPOTIFY_REDIRECT_URI!,
  scope:
    'user-read-private%20user-library-modify%20user-library-read%20user-top-read%20playlist-modify-public',
}).toString();

export const NavHeader = () => {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollHandler = () =>
        window.pageYOffset > 10 ? setTop(false) : setTop(true);

      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }
    return () => {};
  }, [top]);

  return (
    <StickyHeader top={top}>
      <div tw="max-w-6xl mx-auto px-5 sm:px-6">
        <div tw="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div tw="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" tw="block w-8 h-8" aria-label="Cruip">
              <GradientCircle />
            </Link>
          </div>

          {/* Site navigation */}
          <nav tw="flex flex-grow">
            <ul tw="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <WhiteHeaderButton
                  top={top}
                  href={`https://accounts.spotify.com/authorize?${params}`}
                >
                  Sign in
                </WhiteHeaderButton>
              </li>
              {/* <li>
                <Link to="/">
                  <GrayButton small>
                    <span>Get Beta</span>
                    <svg
                      tw="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </GrayButton>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </StickyHeader>
  );
};
