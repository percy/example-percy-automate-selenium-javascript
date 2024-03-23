const { Builder, By, until } = require("selenium-webdriver");
const { percyScreenshot } = require('@percy/selenium-webdriver');

describe("PercyOnAutomate demo test", () => {
  let driver;
  let capabilities = {
    'bstack:options' : {
      "os" : "OS X",
      "osVersion" : "Sonoma",
      "browserVersion" : "latest",
      "projectName" : "Percy",
      "buildName" : "Selenium-SDKs",
      "sessionName" : "Son-JS",
      "local" : "false",
      "seleniumVersion" : "3.14.0",
      "userName" : process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
      "accessKey" : process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    },
    "browserName" : "Safari",
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

      // click on the apple products
      await driver.findElement(By.xpath('//*[@id="__next"]/div/div/main/div[1]/div[1]/label/span')).click();

      // [percy note: important step]
      // Percy Screenshot 1
      // take percyScreenshot using the following command
      await percyScreenshot(driver, 'screenshot_1')


      // locating product on webpage and getting name of the product
      await driver.wait(until.elementLocated(By.xpath('//*[@id="1"]/p')));
      let productText = await driver
        .findElement(By.xpath('//*[@id="1"]/p'))
        .getText();
      // clicking the 'Add to cart' button
      await driver.findElement(By.xpath('//*[@id="3"]/div[4]')).click();
      // waiting until the Cart pane has been displayed on the webpage
      await driver.wait(until.elementLocated(By.className("float-cart__content")));
      await driver.findElement(By.className("float-cart__content"));
      // locating product in cart and getting name of the product in cart
      let productCartText = await driver
        .findElement(
          By.xpath(
            '//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]'
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
