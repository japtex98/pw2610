import { test, expect } from "@playwright/test";

const contextMenuPage = "https://the-internet.herokuapp.com/context_menu";

test("Verify context menu functionality", async ({ page }) => {
  await page.goto(contextMenuPage);

  const hotSpot = page.locator("#hot-spot");
  await hotSpot.click({ button: "right" });
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("alert");
    expect(dialog.message()).toBe("You selected a context menu");
    await dialog.accept();
  });
});
