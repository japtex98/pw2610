import { test, expect } from "@playwright/test";

const checkboxPage = "https://the-internet.herokuapp.com/checkboxes";

test("check success", async ({ page }) => {
  await page.goto(checkboxPage);
  // Select by the text immediately following it
  await page.locator('#checkboxes input[type="checkbox"]').first().check();
  await expect(
    page.locator('#checkboxes input[type="checkbox"]').first(),
  ).toBeChecked();

  await page.locator('#checkboxes input[type="checkbox"]').nth(1).check();
  await expect(
    page.locator('#checkboxes input[type="checkbox"]').nth(1),
  ).toBeChecked();
});

test("uncheck success", async ({ page }) => {
  await page.goto(checkboxPage);
  // Select by the text immediately following it
  await page.locator('#checkboxes input[type="checkbox"]').first().uncheck();
  await expect(
    page.locator('#checkboxes input[type="checkbox"]').first(),
  ).not.toBeChecked();

  await page.locator('#checkboxes input[type="checkbox"]').nth(1).uncheck();
  await expect(
    page.locator('#checkboxes input[type="checkbox"]').nth(1),
  ).not.toBeChecked();
});
