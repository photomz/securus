// eslint-disable-next-line import/no-unresolved
const { DDBTable } = require('./resources/dynamodb/stack.dev.json');

process.env.DDB_TABLE_NAME = DDBTable;
process.env.AWS_REGION = 'ap-southeast-1';
process.env.STAGE = 'dev';
