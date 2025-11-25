# Introduction

This document contains lesson 3 of Playwright series made for Video Geeks YT channel. You will find information about Playwright's Codegen which will help you in generating test cases automatically. Let's read the document and find more about that.

- Playwright can generate tests automatically.
- **Codegen** opens a browser window for interaction and Playwright inspector for recording, copying and managing your generate tests.
- You can use the command below to open playwright's codegen.

```
npx playwright codegen
```

- You will learn below things:
    - How to record a test
    - How to generate locator

# Running Codegen

You can use the `codegen` command to run the test generator followed by the URL of the website that you want to generate tests for. However the URL is optional and can be added directly in the browser window if omitted.

```
npx playwright codegen https://sample/url/here
```

You can use the below command to see other useful flags to use with `codgen` command.

```
npx playwright codegen --help
```

## Recording a test

- You can run `codegen` command to open test recorder and browser.
- Then you can perform actions in the browser.
- Playwright will generate and record your steps in test recorder window.
- Codegen analyzes the rendered page and recommends the best locator, prioritizing role, text, and test id locators.
- With test generator you can record below:
    - Actions like click or fill by interacting with page
    - Assertions by clicking toolbar icon, then clicking a page element to assert against. You can choose from below.
        - visibility
        - text
        - value
- When you finish interacting, press **record** button to stop recording and use the **copy** button to copy the generated code to your editor.
- You can use the **clear** button to clear the code and start recording again.
- You can close the playwright inspector once done or stop the terminal command.
- Find out more about that [here](https://playwright.dev/docs/codegen).

## Generating locators

You can also generate locators with the test generator for your tests.

- Press the `Record` button to stop the recording and `Pick Locator` button will appear.
- Click the `Pick Locator` button and hover the element in the browser window to see the locator highlighted underneath each element.
- Click the element you want to locate and code for that locator will appear in the locator playground next to the `Pick Locator` button.

# Emulation

- You can generate tests using emulation for specific viewports, devices, color schemes, etc.
- Test generator can also preserve authenticatio state.
- Checkout for more [here](https://playwright.dev/docs/codegen#emulation).