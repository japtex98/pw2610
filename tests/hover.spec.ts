import {test, expect} from '@playwright/test';

const hoverPage = 'https://the-internet.herokuapp.com/hovers';

test('Verify hover functionality', async ({page}) => {
  await page.goto(hoverPage);

  const figure = page.locator('.figure').first();
  await figure.hover();

  const caption = figure.locator('.figcaption');
  await expect(caption).toBeVisible();
  await expect(caption.locator('h5')).toHaveText('name: user1');
  await expect(caption.locator('a')).toHaveAttribute('href', '/users/1');
});