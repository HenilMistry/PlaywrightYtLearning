// spec: specs/home-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const homeUrl = 'https://henilmistry.github.io/AristaLabRequestor/';
const defaultInstruction = 'Select some tool to get started! Click on "?" Icon For Help.';
const nodeInstruction = 'Selected Node Tool : Now, Double click anywhere on the canvas to add node!';
const connectionInstruction = 'Selected Connection Tool : Now, click on any two nodes subsequently to add a connection!';

test.describe('Tool Selection and Canvas Instructions', () => {
  test('Node Tool selection displays node creation instructions', async ({ page }) => {
    // 1. Start from a fresh Home Page state.
    await page.goto(homeUrl);
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);

    // 2. Click the "Node Tool" toolbar button.
    await page.getByRole('button', { name: 'Node Tool' }).click();
    await expect(page.getByRole('button', { name: 'Node Tool' })).toBeFocused();
    await expect(page.getByRole('alert')).toHaveText(nodeInstruction);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('Connection Tool selection displays connection instructions', async ({ page }) => {
    // 1. Start from a fresh Home Page state.
    await page.goto(homeUrl);
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);

    // 2. Click the "Connection Tool" toolbar button.
    await page.getByRole('button', { name: 'Connection Tool' }).click();
    await expect(page.getByRole('button', { name: 'Connection Tool' })).toBeFocused();
    await expect(page.getByRole('alert')).toHaveText(connectionInstruction);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('Switching between Node and Connection tools updates the instruction without stale state', async ({ page }) => {
    // 1. Start from a fresh Home Page state.
    await page.goto(homeUrl);
    const alert = page.getByRole('alert');
    await expect(alert).toHaveText(defaultInstruction);

    // 2. Click "Node Tool".
    await page.getByRole('button', { name: 'Node Tool' }).click();
    await expect(alert).toHaveText(nodeInstruction);

    // 3. Click "Connection Tool".
    await page.getByRole('button', { name: 'Connection Tool' }).click();
    await expect(alert).toHaveText(connectionInstruction);
    await expect(alert).not.toContainText(nodeInstruction);

    // 4. Click "Node Tool" again.
    await page.getByRole('button', { name: 'Node Tool' }).click();
    await expect(alert).toHaveText(nodeInstruction);
    await expect(alert).not.toContainText(connectionInstruction);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page).toHaveURL(homeUrl);
  });

  test('Node Tool supports adding a node from a blank canvas', async ({ page }) => {
    // 1. Start from a fresh Home Page state with no nodes on the canvas.
    await page.goto(homeUrl);
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);
    await expect(page.getByRole('button', { name: 'Configure Node' })).toHaveCount(0);

    // 2. Click "Node Tool".
    await page.getByRole('button', { name: 'Node Tool' }).click();
    await expect(page.getByRole('alert')).toHaveText(nodeInstruction);

    // 3. Double-click an empty point in the visible canvas area.
    await page.getByText('Sorry! Canvas is not supported in your browser! Welcome to AristaLabRequestor').dblclick();
    const nodeDialog = page.locator('#nodeConfigModal');
    await expect(nodeDialog.getByRole('heading', { name: 'Node Configuration' })).toBeVisible();
    await expect(nodeDialog.getByRole('button', { name: 'Configure Node' })).toBeVisible();
    await nodeDialog.getByRole('button', { name: 'Configure Node' }).click();

    await expect(nodeDialog).toBeHidden();
    await expect(page).toHaveURL(homeUrl);
    await expect(page.getByRole('group', { name: 'Basic example' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Node Tool' })).toBeVisible();
  });
});
