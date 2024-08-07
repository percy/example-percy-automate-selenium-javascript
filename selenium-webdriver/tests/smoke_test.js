const { Builder, By, until } = require("selenium-webdriver");
const { percyScreenshot } = require('@percy/selenium-webdriver');
const { promisify } = require('util');

const sleep = promisify(setTimeout);

describe("PercyOnAutomate demo test", () => {
  let driver;
  let capabilities = {
    'bstack:options' : {
      "os" : "Windows",
      "osVersion" : "11",
      "browserVersion" : "latest",
      "projectName" : "My Project",
      "buildName" : "test percy_screenshot",
      "sessionName" : "BStack first_test",
      "local" : "false",
      "userName" : process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
      "accessKey" : process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    },
    "browserName" : "Chrome",
  }

  beforeAll(async () => {
    driver = new Builder()
      .usingServer(process.env.HUB_URL)
      .withCapabilities(capabilities)
      .build();


    // [percy note: important step]
    // set the desired window size on which we want the screenshot
    await driver.manage().window().setRect({width: 1280, height: 1024});
  });
  
  afterAll(async () => {
    await driver.quit();
  });

  test(
    "smoke test",
    async () => {
      // navigate to required website
      await driver.get("https://percy.io/");
      await sleep(5000); 
      // single page
      await percyScreenshot(driver, 'screenshot_1')
      // full page
      await percyScreenshot(driver, 'screenshot_2', {full_page: true})
    }
  );
});
