import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/application/(.*)$': '<rootDir>/applications/$1',
    '^@/common/(.*)$': '<rootDir>/common/$1',
    '^@/domain/(.*)$': '<rootDir>/domain/$1',
    '^@/infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
  },
};

export default config;
