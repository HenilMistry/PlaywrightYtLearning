import { expect, test } from '@playwright/test';

test.describe('Testing Home Page of AristaLabRequestor using MCP', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/AristaLabRequestor/');
    await expect(page).toHaveTitle('LabRequestor');
  });

  test('Node Tool displays instructions for adding nodes', async ({ page }) => {
    await page.getByRole('button', { name: 'Node Tool', exact: true }).click();

    await expect(page.getByRole('alert')).toHaveText(
      'Selected Node Tool : Now, Double click anywhere on the canvas to add node!',
    );
  });

  test('Connection Tool displays instructions for connecting nodes', async ({ page }) => {
    await page.getByRole('button', { name: 'Connection Tool', exact: true }).click();

    await expect(page.getByRole('alert')).toHaveText(
      'Selected Connection Tool : Now, click on any two nodes subsequently to add a connection!',
    );
  });

  test('Output Tool shows an alert when the canvas has no nodes', async ({ page }) => {
    await page.getByRole('button', { name: 'Output Tool', exact: true }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Alert!', exact: true })).toBeVisible();
    await expect(dialog.getByText('No nodes on the canvas!', { exact: true })).toBeVisible();

    await dialog.getByRole('button', { name: 'Close', exact: true }).last().click();
    await expect(dialog).toBeHidden();
  });

  test('Settings Tool opens app settings', async ({ page }) => {
    await page.getByRole('button', { name: 'Settings Tool', exact: true }).click();

    const dialog = page.getByRole('dialog');
    for (const name of ['App Settings', 'Key Bindings', 'Canvas Utilities', 'Topology Configuration']) {
      await expect(dialog.getByRole('heading', { name, exact: true })).toBeVisible();
    }
    await expect(dialog.getByRole('checkbox', { name: 'Enable Key Bindings', exact: true })).toBeVisible();
    await expect(dialog.getByRole('radio', { name: 'Lab Request - SysTest', exact: true })).toBeVisible();
    await expect(dialog.getByRole('radio', { name: 'ACT Lab - YAML File', exact: true })).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Save Settings', exact: true })).toBeVisible();

    await dialog.getByRole('button', { name: 'Close', exact: true }).last().click();
    await expect(dialog).toBeHidden();
  });

  test('Help Tool opens the GitHub repository and Back returns home', async ({ page }) => {
    const homeUrl = page.url();
    await page.getByRole('button', { name: 'Help Tool', exact: true }).click();

    await expect(page).toHaveURL(/^https:\/\/github\.com\/HenilMistry\/AristaLabRequestor\/?$/);
    await expect(page.getByRole('heading', { name: 'AristaLabRequestor', exact: true })).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(homeUrl);
    await expect(page.getByRole('button', { name: 'Help Tool', exact: true })).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('Select some tool to get started!');
  });

  test('Report an Issue opens GitHub Issues and Back returns home', async ({ page }) => {
    const homeUrl = page.url();
    // The Report an Issue icon has the accessible name "Question Tool".
    await page.getByRole('button', { name: 'Question Tool', exact: true }).click();

    await expect(page).toHaveURL(/^https:\/\/github\.com\/HenilMistry\/AristaLabRequestor\/issues\/?$/);
    await expect(page).toHaveTitle(/Issues.*HenilMistry\/AristaLabRequestor.*GitHub/);
    await expect(page.getByRole('link', { name: 'New issue', exact: true })).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(homeUrl);
    await expect(page.getByRole('button', { name: 'Question Tool', exact: true })).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('Select some tool to get started!');
  });
});
