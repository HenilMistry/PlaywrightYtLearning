// spec: specs/home-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const homeUrl = 'https://henilmistry.github.io/AristaLabRequestor/';
const defaultInstruction = 'Select some tool to get started! Click on "?" Icon For Help.';
const tools = ['Node Tool', 'Connection Tool', 'Output Tool', 'Settings Tool', 'Help Tool', 'Question Tool'];

test.describe('Responsive and Visual Layout', () => {
  test('Home Page layout remains usable on desktop viewport', async ({ page }) => {
    // 1. Start from a fresh Home Page state in a desktop browser viewport.
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(homeUrl);

    await expect(page.getByText('Welcome to AristaLabRequestor')).toBeVisible();
    await expect(page.getByText('v4.1.1')).toBeVisible();
    const toolbar = page.getByRole('group', { name: 'Basic example' });
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByRole('button')).toHaveCount(6);
    for (const tool of tools) {
      await expect(toolbar.getByRole('button', { name: tool })).toBeVisible();
      await expect(toolbar.getByRole('button', { name: tool })).toBeEnabled();
    }
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);
    await expect(page.getByRole('alert')).toBeInViewport();
  });

  test('Home Page layout remains usable on a narrow mobile viewport', async ({ page }) => {
    // 1. Start from a fresh Home Page state and resize the browser to a narrow mobile-sized viewport.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(homeUrl);

    await expect(page.getByText('Welcome to AristaLabRequestor')).toBeVisible();
    await expect(page.getByText('v4.1.1')).toBeVisible();
    const toolbar = page.getByRole('group', { name: 'Basic example' });
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByRole('button')).toHaveCount(6);
    for (const tool of tools) {
      await expect(toolbar.getByRole('button', { name: tool })).toBeVisible();
      await expect(toolbar.getByRole('button', { name: tool })).toBeEnabled();
    }
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);
    await expect(page.getByRole('alert')).toBeInViewport();
  });
});
