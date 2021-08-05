import React, { useEffect, useRef } from 'react';
import tw from 'twin.macro';
import SEO from '../components/seo';

const Landing = ({ location }: { location: Record<string, any> }) => {
  const canvas = useRef();

  const blobToURL = (img) => {
    canvas.current.width = img.width;
    canvas.current.height = img.height;
    canvas.current
      .getContext('2d')
      .clearRect(0, 0, canvas.width, canvas.height);
    canvas.current
      .getContext('2d')
      .drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    return canvas.current.toDataURL();
  };

  const captureShot = async (imageCapture) => {
    try {
      let blob = await imageCapture.takePhoto();
      blob = await createImageBitmap(blob);
      return blob;
    } catch (e) {
      console.log('Error while taking photo: ', e);
      return '';
    }
  };

  const onInterval = async (imageCapture) => {
    const blob = await captureShot(imageCapture);
    const url = await blobToURL(blob);
  };

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { exact: 600 }, height: { exact: 400 } },
      });
      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      setInterval(() => onInterval(imageCapture), 2000);
    })();
  }, []);

  return (
    <>
      <SEO title="Securus" description="Staying Safe 2.0" location={location} />
      {/* <div tw="text-green-500">
          <h1 tw="text-6xl mb-4 font-black">SongBot</h1>
          <h4 tw="text-lg mb-4 font-light">
            Bringing order to the chaos that is your Spotify library.
          </h4>
          <h5 tw="text-xl">Yes, I&apos;m talking about you.</h5>
          <button type="button">Click me</button>
        </div> */}
      <canvas ref={canvas} />
    </>
  );
};

export default Landing;
