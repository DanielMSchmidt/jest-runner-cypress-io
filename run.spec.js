/* eslint-env jest */

const td = require("testdouble");
require("testdouble-jest")(td, jest);

test("it starts cypress in a sub-process");
test("it only starts one cypress sub-process");
test("it reports a pass if cypress exits without an error");
test("it reports a fail if cypress exits with a non-zero exit code");
test("it reports the failed test case names");
test("it should cancel the cypress run in case a cancel occurs");
