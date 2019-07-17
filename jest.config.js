const shared = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>../../../setupTests.js"],
  globals: {
    "ts-jest": {
      diagnostics: {
        warnOnly: true,
        ignoreCodes: [151001]
      }
    }
  }
};

module.exports = {
  projects: [
    {
      rootDir: "packages/calendar/src",
      ...shared
    },
    {
      rootDir: "packages/core/src",
      ...shared
    },
    {
      rootDir: "packages/elements/src",
      ...shared
    },
    {
      rootDir: "packages/forms/src",
      ...shared
    },
    {
      rootDir: "packages/grid/src",
      ...shared
    },
    {
      rootDir: "packages/panels/src",
      ...shared
    },
    {
      rootDir: "packages/select/src",
      ...shared
    }
  ]
};
