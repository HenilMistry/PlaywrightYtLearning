import { expect, test } from "@playwright/test";
import { homePageValidation } from "../test-functions/home-page-ui";

// test hook: describe -> to group the test cases
test.describe('Home Page GUI Tests', () => {
    
    // test hook: beforeEach -> it runs before each of the tests in this group
    test.beforeEach('Go to home page', async({ page }) => {
        // navigation -> Action
        await page.goto('');
    });

    test('TC1: Verify the home page', async({ page }) => {
        await homePageValidation(page);
    });

    test('TC2: Verifies the node tool', async({ page }) => {
        // assertion for text -> matcher : toHaveText()
        await expect(page.locator('#label_info'))
            .toHaveText(new RegExp("select some tool", "i"));

        // locating by role 'button'
        // action / interaction -> click
        await page.getByRole('button', { name: 'Node Tool' }).click();
        
        // assertion for text -> matcher : toHaveText()
        await expect(page.locator('#label_info'))
            .toHaveText(new RegExp("selected node tool", "i"));
    });

    test('TC3: Verifies the edge tool', async({ page }) => {
        await expect(page.locator('#label_info'))
            .toHaveText(new RegExp("select some tool", "i"));
        await page.getByRole('button', { name: 'Connection Tool' }).click();
        await expect(page.locator('#label_info'))
            .toHaveText(new RegExp("selected connection tool", "i"));
    });

});