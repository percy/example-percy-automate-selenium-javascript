# example-percy-automate-selenium-javascript

Example app used by the Percy JS Selenium tutorial and Percy JS WebdriverIO tutorial demonstrating Percy on Auomate JS Selenium and WebdriverIO integrations.

> **New:** This repo ships an [`advanced/`](./selenium-webdriver/advanced) example covering the full applicable Percy on Automate feature surface for the `selenium-webdriver` driver. See [`selenium-webdriver/advanced/matrix.yml`](./selenium-webdriver/advanced/matrix.yml) for the per-feature coverage matrix. A `webdriverio/advanced/` symmetric example is planned.

## Examples

| Driver | Example | What it shows | Run command |
|---|---|---|---|
| selenium-webdriver | `selenium-webdriver/tests/test.js` (basic) | Minimum viable: `percyScreenshot(driver, name)` calls. Start here. | `cd selenium-webdriver && npm test` |
| selenium-webdriver | [`selenium-webdriver/advanced/`](./selenium-webdriver/advanced) | Full applicable Percy on Automate feature surface: ignore/consider regions (xpath, CSS selector, custom bbox), freeze_animation, percy_css, sync mode, test_case + labels. jest + Percy on Automate. See [`selenium-webdriver/advanced/README.md`](./selenium-webdriver/advanced/README.md). | `cd selenium-webdriver/advanced && npm install && npx percy exec -- npm run test:advanced` |
| webdriverio | `webdriverio/test/specs/test.js` (basic) | Minimum viable: `percyScreenshot(browser, name)` calls. Start here. | `cd webdriverio && npm run base` |
| webdriverio | `webdriverio/advanced/` (planned) | Planned — same matrix-row coverage via wdio + mocha. | — |


# JS Selenium/WebdriverIO Tutorial
The tutorial assumes you're already familiar with JavaScript and the selenium-webdriver/webdriverio framework. You'll still be able to follow along if you're not familiar with Selenium concepts, but we won't spend time introducing JS Selenium concepts. Also we will be using basic test frameworks to write tests.

This tutorial also assumes you have Node 14+ with npm and git installed.

Depending on which framework you use for testing, please follow the tutorial in either selenium-webdriver directory or webdriverio directory.

By the end of this tutorial you will be able to use Percy on Automate.
