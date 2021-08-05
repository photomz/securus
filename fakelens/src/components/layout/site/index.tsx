import React, { useLayoutEffect } from 'react';
import AOS from 'aos';
// import { NavHeader } from './NavHeader';
// import { Footer } from './Footer';
import 'aos/dist/aos.css';

type Props = {
  children: React.ReactChild;
};
const Layout = ({ children }: Props) => {
  useLayoutEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <>
      {/* <NavHeader /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
