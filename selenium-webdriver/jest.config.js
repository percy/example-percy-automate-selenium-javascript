module.exports = {
  coverageProvider: "v8",
  maxConcurrency: 5,
  maxWorkers: 5,
  roots: ["tests"],
  testMatch: ["**/*test.js"],
  testPathIgnorePatterns: ["/node_modules/"],
  testTimeout: 60 * 1000,
};
