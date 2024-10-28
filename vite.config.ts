import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	// Default backend URL if not set
	const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:8090'

	return {
		plugins: [
			tsconfigPaths(),
			TanStackRouterVite({
				routesDirectory: 'frontend/routes',
				generatedRouteTree: 'frontend/routeTree.gen.ts',
			}),
			wasm(),
			topLevelAwait(),
			react(),
		],
		build: {
			outDir: './dist',
			emptyOutDir: true,
		},
		server: {
			proxy: {
				'/api': {
					target: backendUrl,
					changeOrigin: true,
				},
			},
		},
	}
})
