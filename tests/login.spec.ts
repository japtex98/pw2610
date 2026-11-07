import { test, expect } from "@playwright/test";

test("login success with valid credentials", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click(); //uu tien dung getByRole

  await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
  await expect(
    page.getByRole("heading", { name: "Secure Area" }).first(),
  ).toBeVisible();
});

//Parameterized Test/Data Driven Test
[
  {
    username: "aaaaaaaa",
    password: "bbbbbbbb",
    expectedMsg: "Your username is invalid!",
  },
  {
    username: "tomsmith",
    password: "bbbbbbbb",
    expectedMsg: "Your password is invalid!",
  },
].forEach(({ username, password, expectedMsg }) => {
  // You can also do it with test.describe() or with multiple tests as long the test name is unique.
  test(`login fail with wrong username: ${username} and password: ${password}`, async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.locator('//*[@id="username"]').fill(username);
    await page.locator('//*[@id="password"]').fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#flash")).toContainText(expectedMsg);
  });
});

// test('Login fail with invalid username', async ({page}) => {
//     await page.goto('https://the-internet.herokuapp.com/login');
//     await page.locator('//*[@id="username"]').fill('aaaaaaaa');
//     await page.locator('//*[@id="password"]').fill('bbbbbbbb');
//     await page.getByRole('button', {name: 'Login'}).click();

//     await expect(page.locator('#flash')).toContainText('Your username is invalid!');
// });

// test('Login fail with invalid password', async ({page}) => {
//     await page.goto('https://the-internet.herokuapp.com/login');
//     await page.locator('//*[@id="username"]').fill('tomsmith');
//     await page.locator('//*[@id="password"]').fill('bbbbbbbb');
//     await page.locator("//button[contains(@class, 'radius') and contains(., 'Login')]/i").click();

//     await expect(page.locator('#flash', { hasText: 'Your password is invalid!' })).toBeVisible();
// });
