import {test, expect} from "@playwright/test";

test('Drag and drop', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    let colA = await page.locator('#column-a');
    let colB = await page.locator('#column-b');
    expect(await colA.textContent()).toBe('A');

    await colA.dragTo(colB);
    expect(await colA.textContent()).toBe('B'); 
    expect(await colB.textContent()).toBe('A');
})