// PER-8195 Phase 3 — automate-selenium-javascript advanced example.
// Each test exercises one row of the Percy on Automate matrix. See
// ../matrix.yml for the canonical mapping.
//
// Runs against the BrowserStack Automate hub. Requires
// BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, PERCY_TOKEN env vars.

const { Builder, By } = require('selenium-webdriver')
const { percyScreenshot } = require('@percy/selenium-webdriver')

jest.setTimeout(600000)

describe('Percy on Automate — Advanced', () => {
  let driver

  beforeAll(async () => {
    const capabilities = {
      'bstack:options': {
        os: 'Windows',
        osVersion: '11',
        browserVersion: 'latest',
        projectName: process.env.PERCY_PROJECT || 'Percy Automate Selenium-JS Advanced',
        buildName: process.env.PERCY_BUILD || 'Advanced Selenium JS',
        sessionName: 'advanced_visual_test',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      },
      browserName: 'Chrome',
    }
    driver = new Builder()
      .usingServer('https://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build()
    await driver.manage().window().setRect({ width: 1280, height: 1024 })
    await driver.get('https://bstackdemo.com/')
  })

  afterAll(async () => {
    await driver.quit()
  })

  test('exercises baseline screenshot', async () => {
    await percyScreenshot(driver, 'BStackDemo — baseline')
  })

  test('exercises ignore_region_xpaths', async () => {
    await percyScreenshot(driver, 'BStackDemo — ignore via xpath', {
      ignore_region_xpaths: ['//*[@id="signin"]'],
    })
  })

  test('exercises ignore_region_selectors (CSS)', async () => {
    await percyScreenshot(driver, 'BStackDemo — ignore via CSS selector', {
      ignore_region_selectors: ['#signin', '.shelf-container-header'],
    })
  })

  test('exercises custom_ignore_regions', async () => {
    await percyScreenshot(driver, 'BStackDemo — custom ignore region', {
      custom_ignore_regions: [{ top: 0, bottom: 100, left: 0, right: 1280 }],
    })
  })

  test('exercises consider_region_xpaths', async () => {
    await percyScreenshot(driver, 'BStackDemo — consider via xpath', {
      consider_region_xpaths: ['//*[@id="__next"]'],
    })
  })

  test('exercises consider_region_selectors (CSS)', async () => {
    await percyScreenshot(driver, 'BStackDemo — consider via CSS selector', {
      consider_region_selectors: ['#__next > div > div > main'],
    })
  })

  test('exercises freeze_animation', async () => {
    await percyScreenshot(driver, 'BStackDemo — freeze_animation', {
      freeze_animation: true,
    })
  })

  test('exercises percy_css', async () => {
    await percyScreenshot(driver, 'BStackDemo — percy_css', {
      percy_css: '.shelf-container { background: #fffde7 !important; }',
    })
  })

  test('exercises sync mode', async () => {
    await percyScreenshot(driver, 'BStackDemo — sync', { sync: true })
  })

  test('exercises test_case + labels metadata', async () => {
    await percyScreenshot(driver, 'BStackDemo — test_case + labels', {
      test_case: 'home-smoke',
      labels: 'smoke,automate-selenium-js',
    })
  })
})
