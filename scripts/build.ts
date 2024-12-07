import esbuild from 'esbuild'
import inlineImportPlugin from 'esbuild-plugin-inline-import'

esbuild
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    outdir: './dist',
    sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : false,
    target: 'chrome91',
    plugins: [inlineImportPlugin()],
  })
  .catch(() => process.exit(1))
