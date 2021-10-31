process.env.VUE_CLI_BABEL_TARGET_NODE = true
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  transformIgnorePatterns: ['/node_modules/(?!@babel)']
}
