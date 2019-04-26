const path = require('path');

module.exports = function (wallaby) {
  return {
    files: [
      'action-center-framework/src/**/*.ts',
      'action-center-app/src/**/*.ts',
      {pattern: '*/src/**/__tests__/**/*.test.ts', ignore: true}
    ],
    tests: [
      'action-center-framework/src/**/__tests__/**/*.test.ts',
      'action-center-app/src/**/__tests__/**/*.test.ts'
    ],
    env: {
      type: 'node'
    },
    testFramework: 'jest',
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        target: "es5"
      })
    },
  };
};
