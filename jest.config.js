const { pathsToModuleNameMapper } = require('ts-jest');

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
    'index.ts',
    '.module.ts',
    'database.client.ts',
    '.dto.ts',
    '.type.ts',
    'prisma/',
  ],
  setupFiles: ['dotenv-flow/config'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
