//const { setHeadlessWhen, setWindowSize } = require('@codeceptjs/configure');

//setHeadlessWhen(process.env.HEADLESS); // enables headless mode when HEADLESS environment variable exists

exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'http://localhost',
      browser: 'chrome',
      port: 4444,
      windowSize: '1920x1680',
      restart: true,
      desiredCapabilities: {
        chromeOptions: {          
          args: [ /*"--headless",*/ "--disable-gpu", "--no-sandbox", "--disable-notifications" ]
        }
      }
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'codecept',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    }
  }
}