module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  exclude: [
    'src/tests',
    'src/models/config',
  ],
  // for all files use ["src/**/*"]
  include: [
    'src/models',
    'src/services',
    'src/controllers',
  ],
  reporter: [
    'lcov',
    'text',
    'text-summary',
    'json-summary',
  ],
};
