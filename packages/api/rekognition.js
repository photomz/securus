/* eslint-disable no-unused-vars */
const AWS = require('aws-sdk');
const util = require('util');

const rekognition = new AWS.Rekognition({ region: 'ap-southeast-1' });

const addFace = async (username) => {
  const analysis = await rekognition
    .indexFaces({
      CollectionId: 's3curus',
      ExternalImageId: `${username}.jpg`,
      Image: {
        S3Object: { Bucket: 's3curus', Name: `public/faceIds/${username}.jpg` },
      },
      MaxFaces: 1,
      QualityFilter: 'AUTO',
    })
    .promise();

  const faceId = analysis.FaceRecords[0].Face.FaceId;

  return faceId;
};

// addFace('lauren001').then(res => console.log(res));

const identifyFaces = async (s3Key) => {
  const analysis = await rekognition
    .searchFacesByImage({
      CollectionId: 's3curus',
      FaceMatchThreshold: 95,
      Image: {
        S3Object: { Bucket: 's3curus', Name: s3Key },
      },
    })
    .promise();

  const userIds = analysis.FaceMatches.map((match) =>
    match.Face.ExternalImageId.replace('.jpg', '')
  );

  return userIds;
};

// identifyFaces('public/deeplens/fakeMall1/201912_NewYears-4856-2.JPG').then(
//   console.log
// );

const detectMask = async (s3Key) => {
  const analysis = await rekognition
    .detectProtectiveEquipment({
      Image: {
        S3Object: { Bucket: 's3curus', Name: s3Key },
      },
      SummarizationAttributes: {
        MinConfidence: 80,
        RequiredEquipmentTypes: ['FACE_COVER'],
      },
    })
    .promise();

  const isMaskOff = analysis.Summary.PersonsWithoutRequiredEquipment.length > 0;
  const lowConfidences = analysis.Summary.PersonsIndeterminate.map(
    (personIdx) =>
      analysis.Persons[personIdx].BodyParts.find(
        (bodyPart) => bodyPart.Name === 'FACE'
      ).EquipmentDetections[0].CoversBodyPart.Confidence
  );

  return { isMaskOff, lowConfidences };
};

detectMask('public/deeplens/fakeMall1/WIN_20210725_21_00_21_Pro.jpg').then(
  console.log
);
