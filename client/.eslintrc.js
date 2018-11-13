module.exports = {
  "extends": [
    "plugin:vue/essential",
    "standard"
  ],
  "plugins": [
    'vue'
  ],
  "rules": {
    "semi": [ 2, "always" ],
    "indent": "off",
    "vue/script-indent": ["error", 2, {
      "baseIndent": 1,
      "switchCase": 1
    }],
    "vue/no-unused-components": 0,
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    "no-new": 0
  }
};
