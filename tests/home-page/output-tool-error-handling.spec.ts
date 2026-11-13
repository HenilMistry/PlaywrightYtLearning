// spec: specs/home-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const homeUrl = 'https://henilmistry.github.io/AristaLabRequestor/';
const defaultInstruction = 'Select some tool to get started! Click on "?" Icon For Help.';
const emptyCanvasMessage = 'No nodes on the canvas!';

test.describe('Output Tool and Error Handling', () => {
  test('Output Tool shows a clear error when the canvas has no nodes', async ({ page }) => {
    // 1. Start from a fresh Home Page state with no nodes on the canvas.
    await page.goto(homeUrl);
    await expect(page.getByRole('group', { name: 'Basic example' })).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);

    // 2. Click the "Output Tool" toolbar button.
    await page.getByRole('button', { name: 'Output Tool' }).click();
    const alertModal = page.locator('#alertModal');
    await expect(alertModal.getByRole('heading', { name: 'Alert!' })).toBeVisible();
    await expect(alertModal).toContainText(emptyCanvasMessage);
    await expect(alertModal.locator('.modal-header').getByRole('button', { name: 'Close' })).toBeVisible();
    await expect(alertModal.locator('.modal-footer').getByRole('button', { name: 'Close' })).toBeVisible();
  });

  test('Empty-canvas Output alert can be dismissed from both close controls', async ({ page }) => {
    // 1. Start from a fresh Home Page state with no nodes on the canvas.
    await page.goto(homeUrl);
    const toolbar = page.getByRole('group', { name: 'Basic example' });
    const alertModal = page.locator('#alertModal');
    await expect(page.getByRole('dialog')).toHaveCount(0);

    // 2. Click "Output Tool".
    await page.getByRole('button', { name: 'Output Tool' }).click();
    await expect(alertModal.getByRole('heading', { name: 'Alert!' })).toBeVisible();
    await expect(alertModal).toContainText(emptyCanvasMessage);

    // 3. Click the footer "Close" button.
    await alertModal.locator('.modal-footer').getByRole('button', { name: 'Close' }).click();
    await expect(alertModal).toBeHidden();
    await expect(toolbar).toBeVisible();

    // 4. Click "Output Tool" again.
    await page.getByRole('button', { name: 'Output Tool' }).click();
    await expect(alertModal.getByRole('heading', { name: 'Alert!' })).toBeVisible();
    await expect(alertModal).toContainText(emptyCanvasMessage);

    // 5. Click the header "Close" button.
    await alertModal.locator('.modal-header').getByRole('button', { name: 'Close' }).click();
    await expect(alertModal).toBeHidden();
    await expect(toolbar).toBeVisible();
  });
});
