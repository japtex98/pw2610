import {test, expect} from '@playwright/test';

test('Horizontal Slider', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/horizontal_slider');
    const slider = page.locator('input[type="range"]');
    
    var sliderValue = Number(await page.locator('#range').innerText());

    const range = 4;

    while (sliderValue < range) {
        await slider.press('ArrowRight');
        sliderValue = Number(await page.locator('#range').innerText());
        console.log('Slider value: ' + sliderValue);
    }
    expect(sliderValue).toBe(range);
})