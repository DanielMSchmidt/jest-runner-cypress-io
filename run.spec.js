/* eslint-env jest */

const td = require("testdouble");
require("testdouble-jest")(td, jest);
const validCypressPath = "./node_modules/.bin/cypress";

const getContext = () => {
  const { pass, fail, skip } = td.replace("create-jest-runner", {
    pass: td.func(),
    fail: td.func(),
    skip: td.func()
  });

  const getLocalCypressFile = td.replace(
    "./helpers/getLocalCypressFile",
    td.func()
  );
  td.when(getLocalCypressFile()).thenReturn(validCypressPath);

  const CypressController = td.replace(
    "./helpers/cypressController",
    td.constructor(["start"])
  );

  const run = require("./run");
  return { CypressController, getLocalCypressFile, skip, pass, run, fail };
};

// Happy path
test("it starts cypress in a sub-process", () => {
  const { CypressController, getLocalCypressFile, pass, run } = getContext();
  const testPath = "actualTest";

  run({ testPath, config: {} });

  td.verify(
    new CypressController({ binaryPath: validCypressPath, options: {} })
  );
  td.verify(CypressController.prototype.start(testPath));
  td.verify(pass(td.matchers.contains({ test: { path: testPath } })));
});

test("it only starts one cypress sub-process");
test("it reports a pass if cypress exits without an error");
test("it reports a fail if cypress exits with a non-zero exit code");
test("it reports the failed test case names");
test("it should cancel the cypress run in case a cancel occurs");

// Unhappy path
test("it throws an error if cypress is not found");
