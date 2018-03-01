class CypressController {
  constructor({ binaryPath, options }) {
    this.cypressBinaryPath = binaryPath;
    this.cypressOptions = options;
    this.currentExecutionPid = null;
  }

  start(testPath) {}
}

module.exports = CypressController;
