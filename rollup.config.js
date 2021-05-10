import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { string as rollupstr } from 'rollup-plugin-string'

export default {
  input: 'src/index.js',
  external: [
    'axios',
    'bootstrap',
    'prop-types',
    'react',
    'react-bootstrap',
    'react-dom',
    'react-icons',
    'react-router-dom',
    'react-spinners-css'
  ],
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    },
    {
      name: 'VoiceNoteUI',
      file: 'dist/bundle.umd.js',
      globals: {
        react: 'React'
      },
      format: 'umd'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    rollupstr({
      include: '**/*.css'
    }),
    terser()
  ]
}
