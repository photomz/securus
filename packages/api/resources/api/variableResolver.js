/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const getFile = (filepath) =>
  fs.readFileSync(path.join(__dirname, filepath), {
    encoding: 'utf8',
    flag: 'r',
  });

const getStack = (stage) => {
  let id;
  try {
    id = require(`../appsync/stack.${stage}.json`).GraphQlApiId;
  } catch {
    // File may not exist
    id = '';
  }
  return id;
};

module.exports = {
  requestMappingTemplate: getFile('../../template/lambdaDefault.request.vtl'),
  responseMappingTemplate: getFile('../../template/lambdaDefault.response.vtl'),
  appSyncIddev: getStack('dev'),
  appSyncIdprod: getStack('prod'),
};
