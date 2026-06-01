/**
 * Root Jest config. Each workspace runs as its own "project" so the backend
 * gets a Node environment (ts-jest) and the frontend a jsdom environment
 * (next/jest). Run all of them with `npm test`.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  projects: ["<rootDir>/backend", "<rootDir>/frontend"],
}
