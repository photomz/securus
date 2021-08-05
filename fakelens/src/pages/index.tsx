import React, { useEffect, useRef } from 'react';
import tw from 'twin.macro';
import { withAuthenticator } from 'aws-amplify-react';
import { Storage } from 'aws-amplify';
import fetch from 'isomorphic-fetch';
import { gql, useMutation, useQuery } from '@apollo/client';
import SEO from '../components/seo';

const IDENTIFY_CITIZEN = gql`
  mutation IdentifyCitizen(
    $imageKey: ID!
    $cameraId: ID!
    $judgement: Boolean!
  ) {
    identifyCitizen(
      imageKey: $imageKey
      cameraId: $cameraId
      judgement: $judgement
    )
  }
`;

const Landing = ({ location }: { location: Record<string, any> }) => {
  const canvas = useRef();
  const [callLambda, { data, loading, error }] = useMutation(IDENTIFY_CITIZEN);

  const blobToURL = (img) => {
    canvas.current.width = img.width ?? 0;
    canvas.current.height = img.height ?? 0;
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

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadImage = async (filename, img) => {
    try {
      const data = await Storage.put(filename, img, {
        level: 'public',
        contentType: 'image/jpeg',
      });
      return data.key;
    } catch (e) {
      console.log(e);
      return e.response;
    }
  };

  const processFrame = async (imageCapture) => {
    const blob = await captureShot(imageCapture);
    if (blob) {
      const url = await blobToURL(blob);
      const newBlob = await fetchImageFromUri(url);
      const key = `deeplens/fakeMall1/${Date.now()}.jpg`;
      await uploadImage(key, newBlob);
      await callLambda({
        variables: {
          imageKey: `public/${key}`,
          cameraId: 'fakelens-1',
          judgement: true,
        },
      });
    }
  };

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { exact: 600 }, height: { exact: 400 } },
      });
      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      setInterval(() => processFrame(imageCapture), 2000);
    })();
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  if (data) console.log(data);

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

export default withAuthenticator(Landing);
