const { percyScreenshot } = require('@percy/selenium-webdriver');

describe('Test on bstack demo', () => {
  it('add products to cart', async () => {
    await browser.url("https://bstackdemo.com/");
    // Important step to set width and heigh of browser
    await browser.setWindowSize(1280, 1024);

    await browser.waitUntil(async () => (await browser.getTitle()).match(/StackDemo/i), 10000);

    // click on the samsung products
    await browser.$('//*[@id="__next"]/div/div/main/div[1]/div[2]/label/span').click();

    // [percy note: important step]
    // Percy Screenshot 1
    // take percyScreenshot using the following command
    await percyScreenshot(browser, 'screenshot_1');

    // locating product on the webpage and getting the name of the product
    await browser.waitUntil(async () => (await browser.$('//*[@id="10"]/p')).isDisplayed());
    const productText = await browser.$('//*[@id="10"]/p').getText();

    // clicking the 'Add to cart' button
    await browser.$('//*[@id="10"]/div[4]').click();

    // waiting until the Cart pane has been displayed on the webpage
    await browser.waitUntil(async () => (await browser.$('.float-cart__content')).isDisplayed());
    await browser.$('.float-cart__content');

    // locating product in cart and getting the name of the product in the cart
    const productCartText = await browser.$('//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]').getText();

    // [percy note: important step]
    // Percy Screenshot 2
    // take percy_screenshot using the following command
    await percyScreenshot(driver, 'screenshot_2');

    // checking whether the product has been added to the cart by comparing product names
    expect(productText).toBe(productCartText);
  }, 10000000);
});
