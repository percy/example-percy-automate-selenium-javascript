const { percyScreenshot } = require('@percy/selenium-webdriver');

describe('Test on bstack demo', () => {
  it('add products to cart', async () => {
    await browser.url("https://bstackdemo.com/");
    // Important step to set width and heigh of browser
    await browser.setWindowSize(1280, 1024);

    await browser.waitUntil(async () => (await browser.getTitle()).match(/StackDemo/i), 10000);

    // click on the samsung products
    await browser.$('//span[normalize-space()="Apple"]').click();

    // [percy note: important step]
    // Percy Screenshot 1
    // take percyScreenshot using the following command
    await percyScreenshot(browser, 'screenshot_1');

    // locating product on the webpage and getting the name of the product
    await browser.waitUntil(async () => (await browser.$('(//p[@class="shelf-item__title"])[2]')).isDisplayed());
    const productText = await browser.$('(//p[@class="shelf-item__title"])[2]').getText();

    // clicking the 'Add to cart' button
    await browser.$('(//div[@class="shelf-item__buy-btn"])[2]').click();

    // waiting until the Cart pane has been displayed on the webpage
    await browser.waitUntil(async () => (await browser.$('.float-cart__content')).isDisplayed());
    await browser.$('.float-cart__content');

    // locating product in cart and getting the name of the product in the cart
    const productCartText = await browser.$('(//p[@class="title"])[1]').getText();

    // [percy note: important step]
    // Percy Screenshot 2
    // take percy_screenshot using the following command
    await percyScreenshot(driver, 'screenshot_2');

    // checking whether the product has been added to the cart by comparing product names
    expect(productText).toBe(productCartText);
  }, 10000000);
});
