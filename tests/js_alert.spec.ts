import { test, expect } from "@playwright/test";

const alertPage = "https://the-internet.herokuapp.com/javascript_alerts";

test("Verify JavaScript alert", async ({ page }) => {
  await page.goto(alertPage);

  const alertButton = page.getByRole("button", { name: "Click for JS Alert" });

  page.once("dialog", async (dialog) => {
    expect(dialog.type()).toBe("alert");
    expect(dialog.message()).toBe("I am a JS Alert");
    await dialog.accept();
  });

  await alertButton.click();

  const resultText = page.locator("#result");
  await expect(resultText).toHaveText("You successfully clicked an alert");
});

test.describe("Verify JavaScript confirm", () => {
  test("Accept JS Confirm", async ({ page }) => {
    await page.goto(alertPage);

    const confirmButton = page.getByRole("button", {
      name: "Click for JS Confirm",
    });

    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("I am a JS Confirm");
      await dialog.accept();
    });

    await confirmButton.click();

    const resultText = page.locator("#result");
    await expect(resultText).toHaveText("You clicked: Ok");
  });

  test("Dismiss JS Confirm", async ({ page }) => {
    await page.goto(alertPage);

    const confirmButton = page.getByRole("button", {
      name: "Click for JS Confirm",
    });

    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("I am a JS Confirm");
      await dialog.dismiss();
    });

    await confirmButton.click();

    const resultText = page.locator("#result");
    await expect(resultText).toHaveText("You clicked: Cancel");
  });
});

test("Verify JavaScript prompt", async ({ page }) => {
  await page.goto(alertPage);

  const promptButton = page.getByRole("button", { name: "Click for JS Prompt" });

  const inputText = "Playwright Test";

  page.once("dialog", async (dialog) => {
    expect(dialog.type()).toBe("prompt");
    expect(dialog.message()).toBe("I am a JS prompt");
    await dialog.accept(inputText);
  });

  await promptButton.click();

  const resultText = page.locator("#result");
  await expect(resultText).toHaveText(`You entered: ${inputText}`);
});
