module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
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
