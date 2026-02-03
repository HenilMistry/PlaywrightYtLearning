import { expect, Page } from "@playwright/test";

export async function homePageValidation(page: Page) {
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
}