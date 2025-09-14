import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // ishlatilmagan argumentlar/o‘zgaruvchilar faqat `_` bilan boshlangan bo‘lsa ruxsat beriladi
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      // JSX ichida qo‘shtirnoq muammosini yechadi
      "react/no-unescaped-entities": "off",
      // any ishlatishga ruxsat beramiz
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
