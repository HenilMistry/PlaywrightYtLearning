// spec: specs/home-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const homeUrl = 'https://henilmistry.github.io/AristaLabRequestor/';
const defaultInstruction = 'Select some tool to get started! Click on "?" Icon For Help.';

test.describe('External Navigation', () => {
  test('Help Tool navigates to the GitHub repository documentation page', async ({ page }) => {
    // 1. Start from a fresh Home Page state.
    await page.goto(homeUrl);
    await expect(page.getByRole('button', { name: 'Help Tool' })).toBeVisible();

    // 2. Click the "Help Tool" toolbar button.
    await page.getByRole('button', { name: 'Help Tool' }).click();
    await expect(page).toHaveURL(/https:\/\/github\.com\/HenilMistry\/AristaLabRequestor\/?$/);
    await expect(page).toHaveTitle(/HenilMistry\/AristaLabRequestor.*GitHub/);
    await expect(page.getByRole('heading', { name: 'AristaLabRequestor', level: 1 })).toBeVisible();

    // 3. Navigate back to the Home Page or return to the Home Page URL.
    await page.goto(homeUrl);
    await expect(page.getByRole('group', { name: 'Basic example' })).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);
  });

  test('Question Tool navigates to the GitHub Issues page for reporting problems', async ({ page }) => {
    // 1. Start from a fresh Home Page state.
    await page.goto(homeUrl);
    await expect(page.getByRole('button', { name: 'Question Tool' })).toBeVisible();

    // 2. Click the "Question Tool" toolbar button.
    await page.getByRole('button', { name: 'Question Tool' }).click();
    await expect(page).toHaveURL(/https:\/\/github\.com\/HenilMistry\/AristaLabRequestor\/issues\/?$/);
    await expect(page).toHaveTitle(/Issues.*HenilMistry\/AristaLabRequestor.*GitHub/);
    await expect(page.getByRole('heading', { name: 'Issues', level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'New issue' })).toBeVisible();

    // 3. Navigate back to the Home Page or return to the Home Page URL.
    await page.goto(homeUrl);
    await expect(page.getByRole('group', { name: 'Basic example' })).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);
  });
});
