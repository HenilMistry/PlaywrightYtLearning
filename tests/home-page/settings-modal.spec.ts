// spec: specs/home-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const homeUrl = 'https://henilmistry.github.io/AristaLabRequestor/';
const keyRows = ['Select Node Tool', 'Select Connection Tool', 'Open Settings', 'Generate Code', 'Unselect Current Tool', 'Save Topology'];
const defaultKeys = ['KeyN', 'KeyC', 'KeyS', 'KeyG', 'Escape', 'KeyQ'];
const blankTopologyMessage = "No such topology : 'No Topology Saved' is found!";

test.describe('Settings Modal', () => {
  test('Settings Tool opens App Settings with all expected sections and controls', async ({ page }) => {
    // 1. Start from a fresh Home Page state with cleared local storage.
    await page.goto(homeUrl);
    await expect(page.locator('#settingsModal')).toBeHidden();

    // 2. Click the "Settings Tool" toolbar button.
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    await expect(settingsModal.getByRole('heading', { name: 'App Settings' })).toBeVisible();
    await expect(settingsModal.getByRole('heading', { name: 'Key Bindings' })).toBeVisible();
    await expect(settingsModal.getByRole('heading', { name: 'Canvas Utilities' })).toBeVisible();
    await expect(settingsModal.getByRole('heading', { name: 'Topology Configuration' })).toBeVisible();

    await expect(settingsModal.getByRole('checkbox', { name: 'Enable Key Bindings' })).toBeVisible();
    for (const row of keyRows) {
      await expect(settingsModal.getByText(row, { exact: true })).toBeVisible();
    }
    for (const key of defaultKeys) {
      await expect(settingsModal.getByText(key, { exact: true })).toBeVisible();
    }

    await expect(settingsModal.getByRole('checkbox', { name: 'Use Custom Images' })).toBeVisible();
    await expect(settingsModal.getByText('Custom Node:Dut Image')).toBeVisible();
    await expect(settingsModal.getByText('Custom Node:Ixia Image')).toBeVisible();
    await expect(settingsModal.getByRole('radio', { name: 'Lab Request - SysTest' })).toBeVisible();
    await expect(settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' })).toBeVisible();
    await expect(settingsModal.getByRole('combobox')).toHaveValue('No Topology Saved');
    await expect(settingsModal.getByRole('button', { name: 'Delete' }).first()).toBeVisible();
    await expect(settingsModal.getByRole('button', { name: 'Load/Reload' })).toBeVisible();
    await expect(settingsModal.getByRole('button', { name: 'Upload' })).toBeVisible();
    await expect(settingsModal.locator('.modal-footer').getByRole('button', { name: 'Close' })).toBeVisible();
    await expect(settingsModal.getByRole('button', { name: 'Save Settings' })).toBeVisible();
  });

  test('Key binding settings can be enabled, individually selected, and rebound', async ({ page }) => {
    // 1. Start from a fresh Home Page state and open Settings.
    await page.goto(homeUrl);
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    await expect(settingsModal.getByRole('heading', { name: 'App Settings' })).toBeVisible();

    // 2. Click the "Enable Key Bindings" checkbox.
    await settingsModal.getByRole('checkbox', { name: 'Enable Key Bindings' }).click();
    await expect(settingsModal.getByRole('checkbox', { name: 'Enable Key Bindings' })).toBeChecked();

    // 3. Click the checkbox for the "Select Node Tool" key binding row.
    await settingsModal.locator('#enableKeyBindingForNodeTool').click();
    await expect(settingsModal.locator('#enableKeyBindingForNodeTool')).toBeChecked();
    await expect(settingsModal.locator('#enableKeyBindingForConnectionTool')).not.toBeChecked();

    // 4. Click the "Change" button for the "Select Node Tool" key binding row.
    await settingsModal.locator('#btn_enableKeyBindingForNodeTool').click();
    await expect(settingsModal.getByRole('alert')).toHaveText('Click the key to update the binding.');

    // 5. Press a new unused key, such as B.
    await page.keyboard.press('B');
    await expect(settingsModal.getByText('KeyB', { exact: true })).toBeVisible();
    await expect(settingsModal.getByRole('heading', { name: 'App Settings' })).toBeVisible();
    await expect(settingsModal.getByRole('button', { name: 'Save Settings' })).toBeVisible();
  });

  test('Custom image settings can be enabled without disrupting Settings modal state', async ({ page }) => {
    // 1. Start from a fresh Home Page state and open Settings.
    await page.goto(homeUrl);
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    await expect(settingsModal.getByRole('heading', { name: 'Canvas Utilities' })).toBeVisible();

    // 2. Click the "Use Custom Images" checkbox.
    await settingsModal.getByRole('checkbox', { name: 'Use Custom Images' }).click();
    await expect(settingsModal.getByRole('checkbox', { name: 'Use Custom Images' })).toBeChecked();

    await expect(settingsModal.getByText('Custom Node:Dut Image')).toBeVisible();
    await expect(settingsModal.locator('#btn_enableCustomNodeImage')).toBeVisible();
    await expect(settingsModal.getByText('Custom Node:Ixia Image')).toBeVisible();
    await expect(settingsModal.locator('#btn_enableCustomIxiaImage')).toBeVisible();
    await expect(settingsModal.getByRole('heading', { name: 'Topology Configuration' })).toBeVisible();
    await expect(settingsModal.getByRole('heading', { name: 'Key Bindings' })).toBeVisible();
  });

  test('Topology code generation format can be changed between SysTest and ACT YAML', async ({ page }) => {
    // 1. Start from a fresh Home Page state and open Settings.
    await page.goto(homeUrl);
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    const sysTestRadio = settingsModal.getByRole('radio', { name: 'Lab Request - SysTest' });
    const actYamlRadio = settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' });
    await expect(settingsModal.getByRole('heading', { name: 'Topology Configuration' })).toBeVisible();
    await expect(sysTestRadio).toBeVisible();
    await expect(actYamlRadio).toBeVisible();

    // 2. Select "ACT Lab - YAML File".
    await actYamlRadio.click();
    await expect(actYamlRadio).toBeChecked();

    // 3. Select "Lab Request - SysTest".
    await sysTestRadio.click();
    await expect(sysTestRadio).toBeChecked();
    await expect(actYamlRadio).not.toBeChecked();
    await expect(settingsModal.getByRole('checkbox', { name: 'Enable Key Bindings' })).toBeVisible();
  });

  test('Saving Settings displays a success confirmation and preserves Home Page usability', async ({ page }) => {
    // 1. Start from a fresh Home Page state and open Settings.
    await page.goto(homeUrl);
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    const alertModal = page.locator('#alertModal');
    await expect(settingsModal.getByRole('heading', { name: 'App Settings' })).toBeVisible();

    // 2. Toggle at least one setting, such as Enable Key Bindings or ACT Lab - YAML File.
    await settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' }).click();
    await expect(settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' })).toBeChecked();

    // 3. Click "Save Settings".
    await settingsModal.getByRole('button', { name: 'Save Settings' }).click();
    await expect(alertModal.getByRole('heading', { name: 'Success!' })).toBeVisible();
    await expect(alertModal).toContainText('Settings has been saved for later use!');
    await expect(settingsModal.getByRole('heading', { name: 'App Settings' })).toBeVisible();
    await expect(page).toHaveURL(homeUrl);

    // 4. Close the success dialog, then close the Settings modal.
    await alertModal.locator('.modal-footer').getByRole('button', { name: 'Close' }).click();
    await expect(alertModal).toBeHidden();
    await settingsModal.locator('.modal-footer').getByRole('button', { name: 'Close' }).click();
    await expect(settingsModal).toBeHidden();
    await expect(page.getByRole('group', { name: 'Basic example' })).toBeVisible();
    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('Settings modal can be closed without saving changes', async ({ page }) => {
    // 1. Start from a fresh Home Page state and open Settings.
    await page.goto(homeUrl);
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    const alertModal = page.locator('#alertModal');
    await expect(settingsModal.getByRole('heading', { name: 'App Settings' })).toBeVisible();

    // 2. Change a non-destructive setting, such as selecting ACT Lab - YAML File.
    await settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' }).click();
    await expect(settingsModal.getByRole('radio', { name: 'ACT Lab - YAML File' })).toBeChecked();

    // 3. Click the Settings modal footer "Close" button without clicking Save Settings.
    await settingsModal.locator('.modal-footer').getByRole('button', { name: 'Close' }).click();
    await expect(settingsModal).toBeHidden();
    await expect(alertModal.getByRole('heading', { name: 'Success!' })).toHaveCount(0);
    const toolbar = page.getByRole('group', { name: 'Basic example' });
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Node Tool' })).toBeEnabled();
  });

  test('Saved topology controls handle blank state gracefully', async ({ page }) => {
    // 1. Start from a fresh Home Page state with no saved topology and open Settings.
    await page.goto(homeUrl);
    await page.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    const alertModal = page.locator('#alertModal');
    await expect(settingsModal.getByRole('combobox')).toHaveValue('No Topology Saved');

    // 2. Attempt to use the saved-topology Delete and Load/Reload controls while "No Topology Saved" is selected.
    await settingsModal.getByRole('button', { name: 'Delete' }).first().click();
    await expect(alertModal.getByRole('heading', { name: 'Alert!' })).toBeVisible();
    await expect(alertModal).toContainText(blankTopologyMessage);
    await expect(settingsModal.getByRole('heading', { name: 'App Settings' })).toBeVisible();
    await expect(page).toHaveURL(homeUrl);

    await alertModal.locator('.modal-footer').getByRole('button', { name: 'Close' }).click();
    await expect(alertModal).toBeHidden();
    await settingsModal.getByRole('button', { name: 'Load/Reload' }).click();
    await expect(alertModal.getByRole('heading', { name: 'Alert!' })).toBeVisible();
    await expect(alertModal).toContainText(blankTopologyMessage);
    await expect(settingsModal.getByRole('button', { name: 'Save Settings' })).toBeVisible();
    await expect(page).toHaveURL(homeUrl);
  });
});
