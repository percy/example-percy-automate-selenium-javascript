# Advanced Percy on Automate + Selenium-JS (selenium-webdriver driver)

This directory exercises the full applicable Percy on Automate feature surface for `@percy/selenium-webdriver` (Automate mode, `percyScreenshot(driver, name, options)` posting to `/percy/automateScreenshot`). See the basic example at `selenium-webdriver/tests/test.js` for the minimum integration.

## What this example covers

A jest spec (`tests/advanced.test.js`) where each test exercises one row of the [Percy on Automate matrix](../../../../docs/advanced-example-feature-matrix.md): ignore regions via xpath/CSS selector/custom bbox, consider regions via xpath/CSS selector, freeze_animation, percy_css, sync mode, test_case + labels.

Web-DOM-only options (widths, min_height, enable_javascript, scope, discovery, dom_transformation, responsiveSnapshotCapture, readiness preset, devicePixelRatio, browsers) marked `N/A` — Percy on Automate captures server-side from a live browser session, not by serializing the DOM.

## Run locally

Requires BrowserStack Automate hub credentials and a Percy project (Automate type):

```bash
cd selenium-webdriver/advanced
npm install
export BROWSERSTACK_USERNAME="<your username>"
export BROWSERSTACK_ACCESS_KEY="<your access key>"
export PERCY_TOKEN="<your project token>"      # do NOT commit this
npx percy exec -- npm run test:advanced
```

## CI note

The advanced CI job is `workflow_dispatch`-only — Percy on Automate CI requires a real BrowserStack Automate session.

## Coverage matrix

States: `Covered` / `N/A — <reason>` / `Planned` / `Deprecated`. Source of truth is [`matrix.yml`](./matrix.yml).
