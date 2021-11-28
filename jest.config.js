const { pathsToModuleNameMapper } = require('ts-jest/utils');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('./tsconfig');

/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfigPaths, { prefix: '<rootDir>' }),
  },
  logHeapUsage: true,
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  testMatch: ['**/?(*.)+(spec|test|e2e).+(ts)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '\\.d.ts',
    'main.ts',
    '.entity.ts',
    '.dto.ts',
    '.types.ts',
    'prisma/',
  ],
  setupFiles: ['dotenv-flow/config'],
  testResultsProcessor: 'jest-sonar-reporter',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
