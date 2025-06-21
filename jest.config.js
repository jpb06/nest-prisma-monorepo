const { transformTsPaths } = require('ts-paths-transform');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('./tsconfig');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  moduleNameMapper: transformTsPaths(tsconfigPaths, {
    prefix: '<rootDir>/',
    debug: true,
  }),
  rootDir: '.',
  logHeapUsage: true,
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  testMatch: ['**/?(*.)+(spec|test|e2e).+(ts)'],
  transform: {
    '^.+\\.(ts)$': '@swc/jest',
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
};
