// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
const ses = new AWS.SES({ region: 'ap-southeast-1', apiVersion: '2010-12-01' });

const sendEmail = async (recipient, message) => {
  const response = await ses
    .sendEmail({
      Destination: {
        /* required */
        // CcAddresses: [
        //   'EMAIL_ADDRESS',
        //   /* more items */
        // ],
        ToAddresses: [
          recipient,
          /* more items */
        ],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: 'UTF-8',
            Data: `<div><p>${message.replace(
              /(?:\r\n|\r|\n)/g,
              '<br>'
            )}</p></div>`,
          },
          Text: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'A Gentle Reminder 😊',
        },
      },
      Source: 'markuszhang8@gmail.com' /* required */,
      ReplyToAddresses: [
        'markuszhang8@gmail.com',
        /* more items */
      ],
    })
    .promise();

  return response.MessageId;
};

const message = `
Dear Markus,
	
Whoops! It seems you forgot to wear a mask recently. 

Don't worry, you won't face any fines - it's all completely understandable. You lost a few in-game, virtual points is all.
	
If Securus made a mistake, please open the app and appeal to our helpful and dedicated community. We're always trying to make Securus better!

Best wishes,
The Securus Team
`;

sendEmail('markuszhang8@gmail.com', message);
