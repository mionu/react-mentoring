module.exports = {
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  moduleNameMapper: {
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/mocks/fileMock.js',
  },
  transform: {
    '\\.jsx?$': ['babel-jest', { configFile: './babel.jest.config.js' }],
  },
};
