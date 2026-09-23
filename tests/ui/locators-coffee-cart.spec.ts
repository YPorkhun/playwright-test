import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
});

test.only ('Adding coffee to cart', async ({ page }) => {
  const espresso = page.locator('[data-test="Espresso"]');
  const cart = page.locator('[aria-label="Cart page"]');

  await espresso.click();
  await expect(cart).toContainText('cart (1)');
  await cart.click();

  await expect(page.locator('#app')).toContainText('Espresso');
  await expect(page.locator('#app')).toContainText('$10.00');
});

test ('Sum checking', async ({ page }) => {
  await page.locator('[data-test="Espresso_Macchiato"]').click();
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $22.00');
});

test ('Checking promotions', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
    await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
    await expect(page.locator('#app')).toContainText('Yes, of course!');
    await expect(page.locator('#app')).toContainText('Nah, I\'ll skip.');
  await page.getByRole('button', { name: 'Nah, I\'ll skip.' }).click();
    await expect(page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.espressochocolate')).not.toBeVisible();
});

test('Payment form', async ({ page }) => {
  await page.locator('[data-test="checkout"]').click();
  await expect(page.getByText('Payment details×We will send')).toBeVisible();
  await page.getByRole('textbox', { name: 'Name' }).fill('Yuliia P');
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Yuliia P');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
    await expect(page.locator('#app')).toBeVisible();
});

test('Removing items from cart', async ({ page }) => {
  await page.locator('[data-test="Cafe_Breve"]').click();
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $15.00');
    await expect(page.getByLabel('Cart page')).toContainText('cart (1)');
  await page.getByRole('link', { name: 'Cart page' }).click();
    await expect(page.locator('#app')).toContainText('Cafe Breve$15.00 x 1+-$15.00x');
  await page.getByRole('button', { name: 'Remove all Cafe Breve' }).click();
    await expect(page.getByRole('paragraph')).toContainText('No coffee, go add some.');
});