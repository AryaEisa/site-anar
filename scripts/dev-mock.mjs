// npm run dev:mock: startar mock-API:t (port 7072) och Vite mot det, i ett
// kommando. Kräver ingen .env.local.
import { spawn } from 'node:child_process'

const api = spawn(process.execPath, ['scripts/mock-api.mjs'], { stdio: 'inherit' })
const vite = spawn('npx vite', {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, VITE_API_BASE_URL: 'http://localhost:7072' },
})

const stop = () => {
  api.kill()
  vite.kill()
}
vite.on('exit', (code) => {
  api.kill()
  process.exit(code ?? 0)
})
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
