import { test, expect } from '@playwright/test';

test('Додавання напою в кошик', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
    await expect(page.getByLabel('Cart page')).toContainText('cart (1)');
});

test('Перевірка суми', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $22.00');
});

test('Перевірка форми оплати/ Успішна оплата', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Yuliia P');
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Yuliia P');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
});

test('Перевірка таби cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.locator('#app')).toContainText('Cappuccino');
});

test('Перевірка пропозиції', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cafe_Latte"]').click();
  await page.locator('[data-test="Cafe_Breve"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await expect(page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.espressochocolate')).toBeVisible();
  await expect(page.locator('#app')).toContainText('Yes, of course!');
  await expect(page.locator('#app')).toContainText('Nah, I\'ll skip.');
  await page.getByRole('button', { name: 'Nah, I\'ll skip.' }).click();
});