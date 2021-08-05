import React from 'react';

const GradientCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient
        cx="21.152%"
        cy="86.063%"
        fx="21.152%"
        fy="86.063%"
        r="79.941%"
        id="footer-logo"
      >
        <stop stopColor="#08e6e6" offset="0%" />
        <stop stopColor="#81fba6" offset="25.871%" />
        <stop stopColor="#1ed760" offset="100%" />
      </radialGradient>
    </defs>
    <rect
      width="32"
      height="32"
      rx="16"
      fill="url(#footer-logo)"
      fillRule="nonzero"
    />
  </svg>
);

export default GradientCircle;
