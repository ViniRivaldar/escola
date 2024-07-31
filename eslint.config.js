import globals from "globals";
import pluginJs from "@eslint/js";


export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Adicione regras personalizadas aqui, se necessário
  },
};