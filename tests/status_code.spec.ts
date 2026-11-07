import { test, expect } from "@playwright/test";

const statusCodesPage = "https://the-internet.herokuapp.com/status_codes";

test("Verify status codes", async ({ page }) => {
  const statusCodes = ["200", "301", "404", "500"];
  for (const code of statusCodes) {
    await page.goto(statusCodesPage);
    await page.getByRole("link", { name: code }).click();
    await expect(page).toHaveURL(
      `https://the-internet.herokuapp.com/status_codes/${code}`,
    );
  }
});
