/* eslint-disable */
import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ["<rootDir>/src"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: [
    "__mocks__",
    "@types",
    "accessories",
    "<rootDir>/src/core/Repository.ts",
    "<rootDir>/src/core/ReadingStatus.ts",
    "<rootDir>/src/core/UserStatus.ts",
    "<rootDir>/src/core/AccessLevel.ts",
    "<rootDir>/src/application/InputBoundary.ts",
    "<rootDir>/src/application/OutputBoundary.ts",
    "<rootDir>/src/application/UseCase.ts",
  ],
  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "mjs",
  //   "cjs",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],
};

export default config;
