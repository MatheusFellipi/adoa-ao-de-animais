// jest.config.js
module.exports = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  transformIgnorePatterns: ["\\\\node_modules\\\\", "\\.pnp\\.[^\\\\]+$"],
  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@errors/(.*)$": "<rootDir>/src/shared/infra/errors/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@validation/(.*)$": "<rootDir>/src/validation/$1"
  },
  // collectCoverage: true,
  // coverageDirectory: "coverage",
  // collectCoverageFrom: [
  //   "src/**/*.ts",
  //   "!src/**/*.spec.ts",
  //   "!src/**/*.d.ts",
  //   "!src/shared/infra/typeorm/migrations/**" 
  // ],
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"]
};
