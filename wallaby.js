const path = require("path");

module.exports = function(wallaby) {
  return {
    files: [
      "packages/**/src/**/*.ts",
      { pattern: "packages/**/src/**/__tests__/**/*.test.ts", ignore: true }
    ],
    tests: ["packages/**/src/**/__tests__/**/*.test.ts"],
    env: {
      type: "node"
    },
    testFramework: "jest",
    compilers: {
      "**/*.ts?(x)": wallaby.compilers.typeScript({
        module: "commonjs",
        target: "es5"
      })
    }
  };
};
