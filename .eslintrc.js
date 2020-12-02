module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: 'module',
    ecmaVersion: 2017
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/strongly-recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  rules: {
    "vue/component-name-in-template-casing": ["error", "kebab-case", {
      "ignores": []
    }],
    "vue/name-property-casing": ["error",
      "kebab-case"
    ],
    "vue/max-attributes-per-line": [2, {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "multiline": "never"
    }],
    "vue/html-indent": ["error", 2, {
      "alignAttributesVertically": false
    }],
    "vue/script-indent": ["error", 2, {
      "baseIndent": 0,
      "switchCase": 0
    }]
  },
  overrides: [{
    "files": ["*.vue"],
    "rules": {
      "indent": "off"
    }
  }]
}
