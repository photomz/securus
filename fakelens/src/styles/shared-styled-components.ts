import tw, { styled } from 'twin.macro';

export const H1 = tw.h1`text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl`;

export const H2 = tw.h2` text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl`;

export const H3 = tw.h3`text-3xl font-bold leading-tight`;

export const H4 = tw.h4`text-2xl font-bold leading-snug tracking-tight`;

export const Button = styled.button(({ small }) => [
  tw`font-medium inline-flex items-center justify-center border border-transparent rounded leading-snug transition duration-150 ease-in-out`,
  small ? tw`px-4 py-2 shadow` : tw`px-8 py-3 shadow-lg`,
]);
