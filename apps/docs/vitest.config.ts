import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// resolve sibling source packages by path (not via node_modules), so a git
// worktree whose node_modules is linked to another checkout still tests
// against this checkout's edits (same convention as packages/pdf2docx)
const local = (rel: string) => fileURLToPath(new URL(rel, import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@work/docx-engine/lazy-media': local('../../packages/docx-engine/src/lazy-media.ts'),
      '@work/docx-engine': local('../../packages/docx-engine/src/index.ts'),
      '@work/font-metrics': local('../../packages/font-metrics/src/index.ts'),
      // subpath before the bare name: string aliases are prefix replacements
      '@work/electron-utils/headless-export': local(
        '../../packages/electron-utils/src/headless-export.ts',
      ),
      '@work/electron-utils/atomic-write': local(
        '../../packages/electron-utils/src/atomic-write.ts',
      ),
      '@work/electron-utils/safe-external-url': local(
        '../../packages/electron-utils/src/safe-external-url.ts',
      ),
      '@work/electron-utils/print-job': local(
        '../../packages/electron-utils/src/print-job.ts',
      ),
      '@work/electron-utils': local('../../packages/electron-utils/src/index.ts'),
      '@work/ai-provider/browser': local('../../packages/ai-provider/src/browser.ts'),
      '@work/ai-provider': local('../../packages/ai-provider/src/index.ts'),
      '@work/i18n': local('../../packages/i18n/src/index.ts'),
      '@work/ui': local('../../packages/ui/src/index.ts'),
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'jsdom',
    testTimeout: 20000,
  },
})
