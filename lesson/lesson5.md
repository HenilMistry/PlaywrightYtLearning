# Introduction

This document is for lesson 5 for Playwright series that is made on Video Geeks YouTube channel. It will also cover lesson 4 for Artillery series that is made on Video Geeks YouTube channel. This file shows the information on how to combine Playwright tests that are already written with Artillery to perform load test that has user specific behaviour.

# What will you learn ?

- How to set-up existing playwright files for Artillery.
- How to set-up Artillery file for using playwright test.
- Common errors and fixes.

# Steps to set-up Artillery and Playwright

- First of all, you need to have playwright project already written.

- Now, you can install artillery inside your playwright project using below command:

```
> npm install artillery@latest
```

- Once artillery is installed you can use artillery normally using YAML file or with typescript.

- First, we will use YAML file. Consider having below YAML file.

```
config:
  target: https://henilmistry.github.io/AristaLabRequestor/
  engines:
    playwright: {}
  processor: './test-functions/home-page-ui.ts'
  phases:
    - duration: 60
      arrivalRate: 1
      rampTo: 5
      name: Warm up phase
    - duration: 60
      arrivalRate: 5
      rampTo: 10
      name: Ramp up load phase
    - duration: 60
      arrivalRate: 10
      rampTo: 30
      name: Spike phase

scenarios:
  - engine: playwright
    testFunction: homePageValidation
```

- Above file will perform load test with defined phases, on defined target with mentioned test function.

- Note that it uses "playwright" engine.

- There are [other engines](https://www.artillery.io/docs/reference/engines) too. Please find more information about Playwright engine [here](https://www.artillery.io/docs/reference/engines/playwright).
