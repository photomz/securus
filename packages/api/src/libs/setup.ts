// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';
import 'source-map-support/register';

const docClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION });
const ses = new AWS.SES({
  region: process.env.AWS_REGION,
  apiVersion: '2010-12-01',
});

export { docClient, rekognition, ses };

export default {};
