const { pass, fail, skip } = require("create-jest-runner");
const cypressPath = require("./helpers/getLocalCypressFile")();
const CypressController = require("./helpers/cypressController");

module.exports = ({
  testPath,
  config: { rootDir = process.cwd(), ...options }
}) => {
  const start = +new Date();
  const cypress = new CypressController({ binaryPath: cypressPath, options });
  cypress.start(testPath);

  const end = +new Date();
  pass({ start, end, test: { path: testPath } });
};
