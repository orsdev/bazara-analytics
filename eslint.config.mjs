import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Additional ignores from .eslintignore
    "node_modules/**",
    ".pnp/**",
    "**/*.spec.ts",
    "tools/**",
    "prisma/**",
    "coverage/**",
    ".nyc_output/**",
    "dist/**",
    ".vscode/**",
    "*.log",
    ".eslintcache",
  ]),
  {
    rules: {
      // Allow require() in test files
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;
