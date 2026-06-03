import type { Config } from 'jest'

/**
 * Root Jest config. Each workspace runs as its own "project" so the backend
 * gets a Node environment (ts-jest) and the frontend a jsdom environment
 * (next/jest). Run all of them with `npm test`.
 */
const config: Config = {
  projects: ['<rootDir>/backend', '<rootDir>/frontend']
}

export default config
