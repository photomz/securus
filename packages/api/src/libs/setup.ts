/* eslint-disable import/no-extraneous-dependencies */
import AWS from 'aws-sdk';
import 'source-map-support/register';

const docClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

export { docClient };

export default {};
