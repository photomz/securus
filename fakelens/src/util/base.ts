import { nanoid } from 'nanoid';
import $ from '../styles/global';

export const deepClone = (
  obj: Record<string, unknown>
): Record<string, unknown> => JSON.parse(JSON.stringify(obj));

/**
 * Retrieves 1 absolute path to the Webpack processed image from the assets/image folder.
 * @param {string} pathToImage
 * @return {string}
 */
export const importOneImage = (pathToImage: string): string =>
  // eslint-disable-next-line implicit-arrow-linebreak
  require.context('../assets/images', true)(`./${pathToImage}`);

// /**
//  * Retrieves 1 SVG image as React Component from assets/image.
//  * @param {string} pathToSVG
//  * @param {object} props - Extra attribute you wish to add to the SVG component.
//  * @returns {React.Component}
//  */
// const importOneSVG = (
//   pathToSVG: string,
//   props: Record<string, unknown> = {}
// ): React.Component => {
//   const svgImage = importOneImage(pathToSVG);
//   const { defaultProps } = svgImage;

//   return svgImage({ ...props, ...defaultProps });
// };

/**
 * Returns true if screen is mobile size. False if otherwise.
 * @returns {bool}
 */
export const isMobile = (): boolean =>
  window.matchMedia($.device.mobile).matches;

/**
 * Returns true if screen is tablet size. False if otherwise.
 * @returns {bool}
 */
export const isTablet = (): boolean =>
  window.matchMedia($.device.tablet).matches;

/**
 * Returns true if screen is desktop size. False if otherwise.
 * @returns {bool}
 */
export const isDesktop = (): boolean =>
  window.matchMedia($.device.desktop).matches;

// eslint-disable-next-line @typescript-eslint/ban-types
export const addKeys = <T extends object>(
  items: T[]
): (T & { key: string })[] =>
  // eslint-disable-next-line implicit-arrow-linebreak
  items.map((item) => ({ ...item, key: nanoid() }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addKeysToArray = (arr: any[]): Record<string, any> =>
  addKeys(arr.map((el) => ({ value: el })));

export const parseTimeToDayMonth = (item: string | number | Date): string => {
  const date = new Date(item);
  const day = date.getDate();
  const month = date.toLocaleString('en-us', { month: 'short' });

  return `${day} ${month}`;
};

export const parseTimeToDayName = (item: string | number | Date): string => {
  const date = new Date(item);

  return date.toLocaleString('en-us', { weekday: 'short' });
};

export const parseDateToDayTime = (date: string | number | Date): string =>
  new Date(date).toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });

export const contains = (selector: string, text: string): Element[] => {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).filter((element) =>
    new RegExp(text).test(element.textContent!)
  );
};

export const formatTimeDiff = (sec: number): string => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor(sec / 60) % 60;
  const s = Math.floor(sec % 60);
  return `${h ? `${h}h` : ''} ${m ? `${m}m` : ''} ${s}s`;
};

export const capitalise = (str: string): string =>
  str[0].toUpperCase() + str.slice(1);

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

export const log = (el: unknown): any =>
  // eslint-disable-next-line no-undef, no-console
  isDev || process.env.GATSBY_DEBUG ? console.log(el) : console.debug(el);

// eslint-disable-next-line @typescript-eslint/ban-types
export const sort = <T extends object>(arr: T[], key: string): T[] => {
  // Negative sign denotes descending
  let sortOrder = 1;
  if (key[0] === '-') {
    sortOrder = -1;
    key = key.slice(1);
  }
  return arr.sort(
    (a, b) => sortOrder * (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0)
  );
};
