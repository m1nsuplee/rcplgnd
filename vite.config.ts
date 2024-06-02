import { InlineConfig, UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigpaths from 'vite-tsconfig-paths';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigpaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest/setup.ts',
  },
} as VitestConfigExport);
