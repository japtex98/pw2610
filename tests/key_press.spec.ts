import {test, expect} from '@playwright/test';

test('Key Press', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    
    const inputField = page.locator('#target');
    const resultField = page.locator('#result');

    const keysToPress = ['A', 'B', 'C', 'Tab'];

    for (const key of keysToPress) {
        await inputField.click(); // Click lại để đảm bảo input luôn được focus
        await inputField.press(key);
        
        await expect(resultField).toHaveText(`You entered: ${key.toUpperCase()}`);
    }
})

