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
    "<rootDir>/src/domain/core/Errors/",
    "<rootDir>/src/domain/core/Repository.ts",
    "<rootDir>/src/domain/core/ReadingStatus.ts",
    "<rootDir>/src/domain/core/UserStatus.ts",
    "<rootDir>/src/domain/core/AccessLevel.ts",
    "<rootDir>/src/domain/application/Errors/",
    "<rootDir>/src/domain/application/InputBoundary.ts",
    "<rootDir>/src/domain/application/OutputBoundary.ts",
    "<rootDir>/src/domain/application/UseCase.ts",
    "<rootDir>/src/infra/interfaces",
    "<rootDir>/src/infra/Database",
    "<rootDir>/src/infra/http",
    "<rootDir>/src/infra/adapters/interfaces",
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
