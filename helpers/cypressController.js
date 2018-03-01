const spawn = require("child_process").spawn;

class CypressController {
  constructor({ binaryPath, options = "" }) {
    if (!binaryPath) {
      throw new Error("CypressController needs an binary path to operate");
    }

    this.cypressBinaryPath = binaryPath;
    this.cypressOptions = options;
    this.currentExecutionPid = null;
  }

  start(testPath) {
    const options = this.cypressOptions
      .split(" ")
      .filter(element => element !== "");
    options.push("-s", testPath);
    const child = spawn(this.cypressBinaryPath, options);

    // TODO: find out what to know about
  }
}

module.exports = CypressController;
