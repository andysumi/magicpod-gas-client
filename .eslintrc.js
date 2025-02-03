module.exports = {
  "env": {
    "googleappsscript/googleappsscript": true
  },
  "plugins": [
    "googleappsscript"
  ],
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {},
  "globals": {
    // Our classes
    "MagicPodClient": "readonly"
  },
  "rules": {
    "semi": "warn",
    "quotes": ["warn", "single"],
    "indent": ["warn", 2],
    "space-before-blocks": ["warn", {"functions": "always"}],
    "no-console": "off"
  }
}
