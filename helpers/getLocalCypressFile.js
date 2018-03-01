const path = require("path");
const findUp = require("find-up");

module.exports = rootDir => {
  const nodeModulesPath = findUp.sync("node_modules", { cwd: rootDir });
  return path.resolve(nodeModulesPath, "cypress");
};
