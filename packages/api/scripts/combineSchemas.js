const { writeFile, readFile } = require('fs');
const { promisify } = require('util');
const { exec } = require('child_process');

const IN = ['./src/handlers/**/*.graphql', './src/handlers/root.graphql'];
const OUT = './resources/appsync/schema.graphql';

/**
 * Remove @aws_subscribe directive definition from final schema.
 * Missing directive in development causes linter and graphql-schema-utilities error because undefined
 * But directive is pre-defined in AWS AppSync so redefinition causes error
 * Add warning to not directly edit
 */
const cleanSchema = async () => {
  await promisify(exec)(
    `yarn run --silent graphql-schema-utilities -ds "{${IN.join(
      ','
    )}}" -o "${OUT}"`
  );
  const schema = await promisify(readFile)(OUT, 'utf8');
  const schemaWithoutDirectives = [
    '# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. RUN scripts/combineSchemas TO REGENERATE\n',
    ...schema
      .split('\n')
      .filter(
        (line) =>
          !line.startsWith('directive') && !line.startsWith('scalar AWS')
      ),
  ].join('\n');
  await promisify(writeFile)(OUT, schemaWithoutDirectives, 'utf8');

  return schemaWithoutDirectives;
};

cleanSchema();
module.exports = cleanSchema;
