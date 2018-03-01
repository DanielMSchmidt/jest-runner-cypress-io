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
    td.constructor(require("./helpers/cypressController"))
  );

  const run = require("./run");
  return { CypressController, getLocalCypressFile, skip, pass, run, fail };
};

// Happy path
test("it starts cypress in a sub-process", () => {
  const { CypressController, getLocalCypressFile, pass, run } = getContext();
  const testPath = "actualTest";
  td
    .when(CypressController.prototype.start(td.matchers.anything()))
    .thenReturn([]);

  run({ testPath, config: {} });

  td.verify(
    new CypressController({ binaryPath: validCypressPath, options: {} })
  );
  td.verify(pass(td.matchers.contains({ test: { path: testPath } })));
});

test("it reports a fail if cypress exits without an error", () => {
  const { CypressController, getLocalCypressFile, fail, run } = getContext();
  const testPath = "actualTest";
  td
    .when(CypressController.prototype.start(td.matchers.anything()))
    .thenReturn({
      "foo should execute bar": "Could not click on .bar",
      "baz should have been called": "Failed to visit page"
    });

  run({ testPath, config: {} });

  td.verify(
    new CypressController({ binaryPath: validCypressPath, options: {} })
  );
  td.verify(fail(td.matchers.contains({ test: { path: testPath } })));
});

test("it reports the failed test case names", () => {
  const { CypressController, getLocalCypressFile, fail, run } = getContext();
  const testPath = "actualTest";
  td
    .when(CypressController.prototype.start(td.matchers.anything()))
    .thenReturn({
      "foo should execute bar": "Could not click on .bar",
      "baz should have been called": "Failed to visit page"
    });

  run({ testPath, config: {} });

  td.verify(
    new CypressController({ binaryPath: validCypressPath, options: {} })
  );
  td.verify(
    fail(
      td.matchers.contains({
        test: {
          path: testPath,
          displayName: "foo should execute bar",
          failureMessage: "Could not click on .bar"
        }
      })
    )
  );
  td.verify(
    fail(
      td.matchers.contains({
        test: {
          path: testPath,
          displayName: "baz should have been called",
          failureMessage: "Failed to visit page"
        }
      })
    )
  );
});
test("it should cancel the cypress run in case a cancel occurs");

// Unhappy path
test("it reports a fail if cypress exits with a non-zero exit code");
test("it throws an error if cypress is not found");
