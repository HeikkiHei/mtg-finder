/**
 * Backend tests run in a Node environment and are compiled on the fly by
 * ts-jest. The tsconfig override forces CommonJS output (Jest's module system)
 * while reusing the rest of the backend's TypeScript settings.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  displayName: "backend",
  testEnvironment: "node",
  roots: ["<rootDir>"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
          moduleResolution: "node10",
          ignoreDeprecations: "6.0",
        },
      },
    ],
  },
}
