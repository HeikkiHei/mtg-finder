import type { Config } from 'jest'
import nextJest from 'next/jest.js'

// next/jest wires up the Next.js SWC transform (TS/JSX, path aliases, env), so
// component tests run the same way the app is compiled. `dir` is the frontend
// project root (this file's directory) so it resolves correctly even when run
// from the workspace root via Jest projects. Jest loads this config as an ES
// module, so the directory comes from `import.meta.dirname`.
const createJestConfig = nextJest({ dir: import.meta.dirname })

const config: Config = {
  displayName: 'frontend',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}

export default createJestConfig(config)
