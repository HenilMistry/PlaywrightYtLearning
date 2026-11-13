// spec: specs/home-page-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const homeUrl = 'https://henilmistry.github.io/AristaLabRequestor/';
const toolNames = ['Node Tool', 'Connection Tool', 'Output Tool', 'Settings Tool', 'Help Tool', 'Question Tool'];

test.describe('Home Page Loading and Toolbar', () => {
  test('Home Page loads with expected title, version, toolbar, and initial instruction', async ({ page }) => {
    // 1. Start from a fresh browser context with cleared local storage and navigate to https://henilmistry.github.io/AristaLabRequestor/.
    await page.goto(homeUrl);
    await expect(page).toHaveURL(homeUrl);
    await expect(page).toHaveTitle('LabRequestor');
    await expect(page.getByText('Welcome to AristaLabRequestor')).toBeVisible();
    await expect(page.getByText('v4.1.1')).toBeVisible();

    const toolbar = page.getByRole('group', { name: 'Basic example' });
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByRole('button')).toHaveCount(6);

    for (const name of toolNames) {
      await expect(toolbar.getByRole('button', { name })).toBeVisible();
    }

    await expect(page.getByRole('alert')).toHaveText('Select some tool to get started! Click on "?" Icon For Help.');
  });

  test('Toolbar controls expose stable accessible names and are clickable', async ({ page }) => {
    // 1. Start from a fresh Home Page state.
    await page.goto(homeUrl);

    const toolbar = page.getByRole('group', { name: 'Basic example' });
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByRole('button')).toHaveCount(6);

    for (const name of toolNames) {
      const button = toolbar.getByRole('button', { name });
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
      await expect(button.getByRole('img', { name })).toBeVisible();
    }

    // 2. Click each internal Home Page toolbar control that does not leave the app: Node Tool, Connection Tool, Output Tool, and Settings Tool. Close any modal before moving to the next control.
    await toolbar.getByRole('button', { name: 'Node Tool' }).click();
    await expect(page.getByRole('alert')).toContainText('Selected Node Tool');
    await expect(page.getByText('Welcome to AristaLabRequestor')).toBeVisible();
    await expect(toolbar).toBeVisible();

    await toolbar.getByRole('button', { name: 'Connection Tool' }).click();
    await expect(page.getByRole('alert')).toContainText('Selected Connection Tool');
    await expect(page.getByText('Welcome to AristaLabRequestor')).toBeVisible();
    await expect(toolbar).toBeVisible();

    await toolbar.getByRole('button', { name: 'Output Tool' }).click();
    const alertModal = page.locator('#alertModal');
    await expect(alertModal.getByRole('heading', { name: 'Alert!' })).toBeVisible();
    await alertModal.getByText('Close', { exact: true }).click();
    await expect(alertModal).toBeHidden();
    await expect(toolbar).toBeVisible();

    await toolbar.getByRole('button', { name: 'Settings Tool' }).click();
    const settingsModal = page.locator('#settingsModal');
    await expect(settingsModal.getByRole('heading', { name: 'App Settings' })).toBeVisible();
    await settingsModal.getByText('Close').click();
    await expect(settingsModal).toBeHidden();
    await expect(toolbar).toBeVisible();
  });
});
