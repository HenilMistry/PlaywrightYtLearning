# Playwright YT Learning

This README file is base file for each of the other README files in this project. This Repository contains my learning snapshots that I have used to demonstrate on YouTube channel called `VideoGeeksNet`.

# Introduction

This section covers information about Installation part of the Playwright. Read this entire file and every other README file for not to miss any important information.

## Prerequisites

The prerequisite for installing playwright are:
 - Node.js with any of `20.x`, `22.x` or `24.x`

## Installation steps

The installation steps are very simple.
 1. Create a directory with desired name.
 2. In that directory enter command `npx init playwright@lates`
 3. Above command will either initialize new project and then install playwright as dev dep. or it will install playwright into existing project.
 4. When asked, you can choose the scripting lang., test directory name, whether you want github workflow, etc. details.

## Pros of using Playwright

1. Test Isolation and Parallelization
2. Multiple Broswer Support
3. Multiple Views Support
4. Mobile Emulation Support

# Run Example Tests

You can use below command to run example test but by default below command will run all tests which are there inside Test folder name. By default tests run in headless mode, in parallel across Chromium, Firefox and Webkit. Output and aggregate results display in the terminal.

```
npx playwright test
```

You can use `--headed` option to see the browser window

```
npx playwright test --headed
```

You can use `--project` option to specify project / browser that you want your tests to run on

```
npx playwright test --project=chromium
```

You can use relative path of file to specify the spec file that you want to run

```
npx playwright test relative/path/to/spec/file
```

You can use `--ui` option to open testing in UI mode (Somewhat similar to Cypress Test Runner)

```
npx playwright test --ui
```

You can have more information about Running Tests in Playwright at [here](https://playwright.dev/docs/running-tests).
