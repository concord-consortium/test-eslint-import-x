import js from '@eslint/js'
import { importX } from 'eslint-plugin-import-x'
import { globalIgnores } from "eslint/config";
import globals from "globals";

export default [
  globalIgnores([
    ".pnp.cjs"
  ]),
  js.configs.recommended, 
  importX.flatConfigs.recommended,
  {
    languageOptions: {
      globals: globals.node
    }
  }
]