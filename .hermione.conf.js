module.exports = {
  baseUrl: 'https://shri.yandex/',
  sets: {
    desktop: {
      files: 'test/hermione',
    }
  },

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
}