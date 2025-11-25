import { expect, test } from "@playwright/test";

// test hook: describe -> to group the test cases
test.describe('Home Page GUI Tests', () => {
    
    // test hook: beforeEach -> it runs before each of the tests in this group
    test.beforeEach('Go to home page', async({ page }) => {
        // navigation -> Action
        await page.goto('');
    });

    test('TC1: Verify the home page', async({ page }) => {
        // NOTE: this is not needed though... (READ NOTE)
        // assertion for title's visibility -> matcher : toBeVisible()
        // locating by the id of the element `titleOfApp`
        await expect(page.locator("#titleOfApp")).toBeVisible();

        // NOTE: This will automatically assert the visibility before text assertion
        // assertion for title text -> matcher : toHaveText()
        await expect(page.locator("#titleOfApp"))
            .toHaveText(new RegExp("welcome to aristalabrequestor", "i"));

        // assertion for child nodes -> matcher : toHaveCount()
        // locating by the label of the element `Basic example`
        await expect(page.getByLabel('Basic example').getByRole("button")).toHaveCount(6);

        // asserting for text -> matcher : toHaveText()
        await expect(page.locator("#label_info")).toHaveText(new RegExp("Select some tool", "i"));
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