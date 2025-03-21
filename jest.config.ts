// jest.config.ts
import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // maps @/ → ./src/
    '^@/public/(.*)$': '<rootDir>/public/$1', // maps @/public/ → ./public/
    '^@/types/(.*)$': '<rootDir>/types/$1', // maps @/types/ → ./types/
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};

export default createJestConfig(customJestConfig);
