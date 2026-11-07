import { test, expect } from "@playwright/test";

const nestedFramePage = "https://the-internet.herokuapp.com/nested_frames";

test("Verify iframe content", async ({ page }) => {
  await page.goto(nestedFramePage);
  const topFrame = page.frameLocator('frame[name="frame-top"]');
  const leftFrame = topFrame.frameLocator('frame[name="frame-left"]');
  const middleFrame = topFrame.frameLocator('frame[name="frame-middle"]');
  const rightFrame = topFrame.frameLocator('frame[name="frame-right"]');
  const bottomFrame = page.frameLocator('frame[name="frame-bottom"]');

  await test.step("Verify content in left frame", async () => {
    const leftContent = await leftFrame.locator("body").textContent();
    expect(leftContent?.trim()).toBe("LEFT");
  });

  await test.step("Verify content in middle frame", async () => {
    const middleContent = await middleFrame.locator("#content").textContent();
    expect(middleContent?.trim()).toBe("MIDDLE");
  });

  await test.step("Verify content in right frame", async () => {
    const rightContent = await rightFrame.locator("body").textContent();
    expect(rightContent?.trim()).toBe("RIGHT");
  });

  await test.step("Verify content in bottom frame", async () => {
    const bottomContent = await bottomFrame.locator("body").textContent();
    expect(bottomContent?.trim()).toBe("BOTTOM");
  });
});

const tinyMCEFramePage = "https://the-internet.herokuapp.com/iframe";

test("Verify TinyMCE editor content", async ({ page }) => {
  await page.goto(tinyMCEFramePage);
  const editorFrame = page.frameLocator("#mce_0_ifr");
  const bodyLocator = editorFrame.locator("body");

  expect(await bodyLocator.textContent()).toBe("Your content goes here.");
});
