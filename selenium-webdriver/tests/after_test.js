const { Builder, By, until } = require("selenium-webdriver");
const { percyScreenshot } = require('@percy/selenium-webdriver');

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
      "seleniumVersion" : "3.14.0",
      "userName" : process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
      "accessKey" : process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    },
    "browserName" : "Chrome",
  }

  beforeAll(async () => {
    driver = new Builder()
      .usingServer(`https://hub-cloud.browserstack.com/wd/hub`)
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
    "add products to cart",
    async () => {
      // navigate to required website
      await driver.get("https://bstackdemo.com/");
      await driver.wait(until.titleMatches(/StackDemo/i), 10000);

      // click on the samsung products
      await driver.findElement(By.xpath('//span[normalize-space()="Apple"]')).click();

      // [percy note: important step]
      // Percy Screenshot 1
      // take percyScreenshot using the following command
      await percyScreenshot(driver, 'screenshot_1')


      // locating product on webpage and getting name of the product
      await driver.wait(until.elementLocated(By.xpath('(//p[@class="shelf-item__title"])[2]')));
      let productText = await driver
        .findElement(By.xpath('(//p[@class="shelf-item__title"])[2]'))
        .getText();
      // clicking the 'Add to cart' button
      await driver.findElement(By.xpath('(//div[@class="shelf-item__buy-btn"])[2')).click();
      // waiting until the Cart pane has been displayed on the webpage
      await driver.wait(until.elementLocated(By.className("float-cart__content")));
      await driver.findElement(By.className("float-cart__content"));
      // locating product in cart and getting name of the product in cart
      let productCartText = await driver
        .findElement(
          By.xpath(
            '(//p[@class="title"])[1]'
          )
        )
        .getText();

        // [percy note: important step]
        // Percy Screenshot 2
        // take percy_screenshot using the following command
        await percyScreenshot(driver, 'screenshot_2')


      // checking whether product has been added to cart by comparing product name
      expect(productText).toBe(productCartText);
    },
    10000000
  );
});
