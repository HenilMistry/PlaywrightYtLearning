// spec: specs/home-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const homeUrl = 'https://henilmistry.github.io/AristaLabRequestor/';
const defaultInstruction = 'Select some tool to get started! Click on "?" Icon For Help.';
const nodeInstruction = 'Selected Node Tool : Now, Double click anywhere on the canvas to add node!';

test.describe('State, Persistence, and Resilience', () => {
  test('Saved settings are restored after reloading the Home Page', async ({ page }) => {
    // 1. Start from a fresh Home Page state and open Settings.
    await page.goto(homeUrl);
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    const alertModal = page.locator('#alertModal');
    await expect(settingsModal.getByRole('checkbox', { name: 'Enable Key Bindings' })).not.toBeChecked();
    await expect(settingsModal.locator('#enableKeyBindingForNodeTool')).not.toBeChecked();
    await expect(settingsModal.getByText('KeyN', { exact: true })).toBeVisible();

    // 2. Enable Key Bindings, select the Select Node Tool row, change its key to KeyB, select ACT Lab - YAML File, and click Save Settings.
    await settingsModal.getByRole('checkbox', { name: 'Enable Key Bindings' }).click();
    await settingsModal.locator('#enableKeyBindingForNodeTool').click();
    await settingsModal.locator('#btn_enableKeyBindingForNodeTool').click();
    await expect(settingsModal.getByRole('alert')).toHaveText('Click the key to update the binding.');
    await page.keyboard.press('B');
    await expect(settingsModal.getByText('KeyB', { exact: true })).toBeVisible();
    await settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' }).click();
    await expect(settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' })).toBeChecked();
    await settingsModal.getByRole('button', { name: 'Save Settings' }).click();
    await expect(alertModal).toContainText('Settings has been saved for later use!');

    // 3. Close dialogs and reload the Home Page.
    await alertModal.locator('.modal-footer').getByRole('button', { name: 'Close' }).click();
    await settingsModal.locator('.modal-footer').getByRole('button', { name: 'Close' }).click();
    await page.goto(homeUrl);
    await expect(page).toHaveTitle('LabRequestor');
    await expect(page.getByRole('group', { name: 'Basic example' })).toBeVisible();

    // 4. Open Settings again.
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    await expect(settingsModal.getByRole('checkbox', { name: 'Enable Key Bindings' })).toBeChecked();
    await expect(settingsModal.locator('#enableKeyBindingForNodeTool')).toBeChecked();
    await expect(settingsModal.getByText('KeyB', { exact: true })).toBeVisible();
    await expect(settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' })).toBeChecked();
  });

  test('Home Page returns to blank fresh state after browser storage is cleared', async ({ page }) => {
    // 1. Begin with a browser where settings may have been saved from prior use.
    await page.goto(homeUrl);
    await expect(page).toHaveTitle('LabRequestor');
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    const alertModal = page.locator('#alertModal');
    await settingsModal.getByRole('checkbox', { name: 'Enable Key Bindings' }).click();
    await settingsModal.locator('#enableKeyBindingForNodeTool').click();
    await settingsModal.locator('#btn_enableKeyBindingForNodeTool').click();
    await page.keyboard.press('B');
    await settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' }).click();
    await settingsModal.getByRole('button', { name: 'Save Settings' }).click();
    await expect(alertModal).toContainText('Settings has been saved for later use!');

    // 2. Clear site storage/local storage for the Arista Lab Requestor origin and reload the Home Page.
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto(homeUrl);
    await expect(page.getByRole('group', { name: 'Basic example' })).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    await expect(settingsModal.getByRole('combobox')).toHaveValue('No Topology Saved');
    await expect(settingsModal.getByRole('checkbox', { name: 'Enable Key Bindings' })).not.toBeChecked();
    await expect(settingsModal.locator('#enableKeyBindingForNodeTool')).not.toBeChecked();
    await expect(settingsModal.getByText('KeyN', { exact: true })).toBeVisible();
    await expect(settingsModal.getByText('KeyB', { exact: true })).toHaveCount(0);
    await expect(settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' })).not.toBeChecked();
  });

  test('Refreshing the Home Page does not break toolbar or alert state', async ({ page }) => {
    // 1. Start from a fresh Home Page state.
    await page.goto(homeUrl);
    const toolbar = page.getByRole('group', { name: 'Basic example' });
    await expect(toolbar).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);

    // 2. Select Node Tool, then refresh the browser page.
    await page.getByRole('button', { name: 'Node Tool' }).click();
    await expect(page.getByRole('alert')).toHaveText(nodeInstruction);
    await page.goto(homeUrl);
    await expect(page).toHaveTitle('LabRequestor');
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByRole('button')).toHaveCount(6);
    await expect(page.getByRole('alert')).toHaveText(defaultInstruction);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
