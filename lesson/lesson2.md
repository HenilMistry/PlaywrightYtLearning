# Introduction

This document contains the lesson 2 of Playwright series made for Video Geeks YT Channel. You might find information about Querying Elements, Asserting Elements and Actions / Interactions that you can perform with Playwright by wright and understanding the code of Playwright.

There are some important points that you must know:

- Playwright test are simple, they perform actions and assert the state against the expectations.
- Playwright automatically waits for [**actionability** checks](https://playwright.dev/docs/actionability) to pass before performing each action.
- You don't need to add manual waits or neither you have to deal with race conditions.
- Playwright assertions are designed to **describe expectations** that will eventually be met.

## Querying, Asserting & Actions

You will learn:

- How to write the first test
- How to perform actions
- How to use assertions
- How tests run in isolation
- How to use test hooks

# Looking at Default Test

You can have a look at the default example test that might have been automatically generated at `tests/` folder with name `example.spec.ts`.

```
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

## Actions in Default Test

You can find below actions by observing the code snippet above:

- Navigation Action 
    - navigating to `https://playwright.dev/`
- Interactions
    - click on the button that has title `Get Started`

### Navigation

- Most tests starts by navigating to a specific URL.

```
await page.goto('<url-to-go-to>');
```

- Playwright will wait for the page to reach the `load` state before continuing. You can find more information about that [here](https://playwright.dev/docs/api/class-page#page-goto).

### Interactions

- Performing actions starts with locating elements.
- Interacting with elements also requires to locate the element first.
- Playwright uses [Locator API](https://playwright.dev/docs/locators) for that.
- Locators represents a way to find the elements on the page.
- There are different types of locators that you can use with Playwright's Locator API. Find more detailed about that [here](https://playwright.dev/docs/locators).
    - locate the element by attributes : `page.getByRole()`
    - locate the element by text content : `page.getByText()`
    - locate the element by form control or label : `page.getByLabel()`
    - locate the element by input placeholder : `page.getByPlaceholder()`
    - locate the element by Alter text (usually an image) : `page.getByAltText()`
    - locate the element by Title : `page.getByTitle()`
    - locate the element by Test id (data-testid) : `page.getByTestId()`
    - locate the element by CSS or XPath locators : `page.locator()`

- Playwright waits for element to be **actionable** before performing the action.

```
const button = page.getByRole('link', { name: 'Get started' });
await button.click();

// usually declaration is skipped...
await page.getByRole('link', { name: 'Get started' }).click();
```

### Basic Actions

There are some basic actions that you can perform, you can find the complete list [here](https://playwright.dev/docs/api/class-locator).

- Check the input checkbox : `locator.check()`
- Click the element : `locator.click()`
- Uncheck the input checkbox: `locator.uncheck()`
- etc...


## Assertions in Default Test

Playwright includes assertions that you can use in [tests](https://playwright.dev/docs/test-assertions). It is in form of `expect` function. You can use below snippet to make an assertion.

```
// sample
expect(<sucess>).toBeTruthy();

// example
await expect(page.getByTestId('status')).toHaveText('submitted');
```

- There are so many different types of **matchers** that you can choose with your assertion. There are generic matchers like `toEqual()`, `toContain()`, etc..
- There are some [async matchers](https://playwright.dev/docs/api/class-locatorassertions) that will wait until the expected condition is met.
- Take the example above. Playwright will re-fetch the element and check it over and over, untill the condition is met or until the timeout is reached.
- You can pass the timeout or configure it once via `testConfig.expect` value in the [test config](https://playwright.dev/docs/api/class-testconfig#test-config-expect).
- Default timeout for assertions is set to 5 seconds.
- Some examples of popular assertions:
    - Checkbox is checked : `expect(<locator>).toBeChecked()`
    - Element is visible : `expect(<locator>).toBeVisible()`
    - Element contains the text : `expect(<locator>).toContainText()`
    - etc.


# Test isolation

Playwright test is based on the concept of [test fixtures](https://playwright.dev/docs/test-fixtures) such as the built in page fixture. Which is passed into yout test.

- [Pages are isolated](https://playwright.dev/docs/browser-contexts) between tests due to Browser context.
- Every tests gets a fresh environment even when the multiple tests run in a single browser.

```
test('example test', async ({ page }) => {
    // page belongs to an isolated browser context, created for this test...
});

test('example second test', async ({ page }) => {
    // page in second test is completely isolated from first test...
});
```

# Using Test Hooks

- You can use various test hooks such as describe, beforeEach, afterEach, beforeAll and afterAll...
- Ther are explained in more detaild [here](https://playwright.dev/docs/api/class-test)...