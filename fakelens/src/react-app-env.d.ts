// / <reference types="react-scripts" />

import styledImport, { CSSProp, css as cssImport } from 'styled-components';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { DOMAttributes } from 'react';
import { CustomPalette } from './styles/theme';

// twin.d.ts
import 'twin.macro';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    palette: CustomPalette;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme extends Theme {
    palette: CustomPalette;
  }
  interface ThemeOptions {
    palette?: CustomPalette;
  }
}

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp;
  }
  // The inline svg css prop
  interface SVGProps extends SVGProps<SVGSVGElement> {
    css?: CSSProp;
  }
}

// The 'as' prop on styled components
declare global {
  namespace JSX {
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string | Element;
    }
  }
}
