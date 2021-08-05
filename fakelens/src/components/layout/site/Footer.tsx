import React from 'react';
import tw, { styled } from 'twin.macro';
import { Link } from 'gatsby';
import { GradientCircle } from '../../../icons';
import { addKeys } from '../../../util';

const GrayLink = styled(Link)(() => [
  tw`text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out hover:underline`,
]);

export const Footer = () => (
  <footer tw="p-8 md:py-12">
    <div tw="flex border-t border-gray-200">
      <Link to="/" tw="inline-block w-8 h-8 mb-2" aria-label="Cruip">
        <GradientCircle />
      </Link>

      <div tw="text-lg text-gray-600 mr-4 mt-1 ml-4">
        Made by{' '}
        <a
          tw="text-green-500 hover:underline"
          href="mailto:markuszhang8@gmail.com"
        >
          Markus Zhang
        </a>{' '}
        with love 💛
      </div>
    </div>
    <p tw="mt-2">
      Images sourced from <a href="http://www.freepik.com">pikisuperstar</a>,{' '}
      <a href="http://www.freepik.com">Freepik</a>, and{' '}
      <a href="https://www.freepik.com/vectors/music">pikisuperstar</a>
    </p>
  </footer>
);
