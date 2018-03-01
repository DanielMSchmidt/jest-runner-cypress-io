const { pass, fail, skip } = require("create-jest-runner");
const cypressPath = require("./helpers/getLocalCypressFile")();
const CypressController = require("./helpers/cypressController");

module.exports = ({
  testPath,
  config: { rootDir = process.cwd(), ...options }
}) => {
  const start = +new Date();
  const cypress = new CypressController({ binaryPath: cypressPath, options });
  const results = cypress.start(testPath);
  const end = +new Date();
  const reportTest = (reporter, name, message) =>
    reporter({
      start,
      end,
      test: { path: testPath, displayName: name, failureMessage: message }
    });

  if (!Object.keys(results).length) {
    reportTest(pass);
  } else {
    Object.entries(results).map(([name, errorMessage]) => {
      reportTest(fail, name, errorMessage);
    });
  }
};
