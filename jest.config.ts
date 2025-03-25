import nextJest from 'next/jest';

// Create a Jest config for Next.js
const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  // The setup files that Jest will run before tests start
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Module mapping for your project
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // maps @/ → ./src/
    '^@/public/(.*)$': '<rootDir>/public/$1', // maps @/public/ → ./public/
    '^@/types/(.*)$': '<rootDir>/types/$1', // maps @/types/ → ./types/
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks CSS modules
  },

  // Test environment for Jest, jsdom for React components
  testEnvironment: 'jsdom',

  // Test match pattern to locate your test files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', // Looks for test files in __tests__ folder
    '**/?(*.)+(spec|test).[tj]s?(x)', // Matches test files with .test or .spec extensions
  ],

  // Ensure that Jest transforms TypeScript files correctly
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest to handle TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JavaScript files
  },

  // Ignore transformation for some node_modules if required
  transformIgnorePatterns: ['/node_modules/(?!(@auth|@prisma|lodash-es)/)'],

};

export default createJestConfig(customJestConfig);
