module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  exclude: [
    'src/tests',
    'src/models/config',
  ],
  // for all files use ["src/**/*"]
  include: ["src/**/*"],
  reporter: [
    'lcov',
    'text',
    'text-summary',
    'json-summary',
  ],
};
