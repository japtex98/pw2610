import { test, expect } from "@playwright/test";

const dropdownPage = "https://the-internet.herokuapp.com/dropdown";
const multiSelectDropdownPage =
  "https://the-internet.herokuapp.com/multiple_dropdown";

test("select option", async ({ page }) => {
  await page.goto(dropdownPage);
  // Select by the text immediately following it
  await page.locator("#dropdown").selectOption("Option 1");
  await expect(page.locator("#dropdown")).toHaveValue("1");

  await page.locator("#dropdown").selectOption("Option 2");
  await expect(page.locator("#dropdown")).toHaveValue("2");
});

test("select multiple options", async ({ page }) => {
  await page.goto(multiSelectDropdownPage);
  // Select by the text immediately following it
  await page.locator("#multiple-dropdown").selectOption(["1", "2"]);
  await expect(page.locator("#multiple-dropdown")).toHaveValues(["1", "2"]);
});
