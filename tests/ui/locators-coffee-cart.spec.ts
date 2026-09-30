import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
});

test('Adding coffee to cart', async ({ page }) => {
  const espresso = page.locator('[data-test="Espresso"]');
  const cart = page.locator('[aria-label="Cart page"]');
  const app = page.locator('#app');

  await espresso.click();

  await expect(cart).toContainText('cart (1)');

  await cart.click();

  await expect(app).toContainText('Espresso');
  await expect(app).toContainText('$10.00');
});

test ('Sum checking', async ({ page }) => {
  const espressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]');
  const checkout = page.locator('[data-test="checkout"]');

  await espressoMacchiato.click();

  await expect(checkout).toContainText('Total: $22.00');
});

test ('Checking promotions', async ({ page }) => {
  const espresso = page.locator('[data-test="Espresso"]');
  const app = page.locator('#app');
  const skipPromotion = page.locator('button[aria-label="Nah, I\'ll skip."]');

  await espresso.click();

  await expect(app).toContainText("It's your lucky day! Get an extra cup of Mocha for $4.");
  await expect(app).toContainText('Yes, of course!');
  await expect(app).toContainText("Nah, I'll skip.");

  await skipPromotion.click();

  await expect(app).not.toContainText("It's your lucky day! Get an extra cup of Mocha for $4.");
});

test('Payment form', async ({ page }) => {
  const espresso = page.locator('[data-test="Espresso"]');
  const checkout = page.locator('[data-test="checkout"]');
  const app = page.locator('#app');

  const nameInput = page.locator('input[name="name"]');
  const emailInput = page.locator('input[name="email"]');
  const submitButton = page.locator('button[type="submit"]');

  await espresso.click();
  await checkout.click();

  await expect(app).toContainText('Payment details');

  await nameInput.fill('Yuliia P');
  await expect(nameInput).toHaveValue('Yuliia P');

  await emailInput.fill('test@gmail.com');

  await submitButton.click();

  await expect(app).toContainText('Thanks for your purchase. Please check your email for payment.');
});

test('Removing items from cart', async ({ page }) => {
  const cafeBreve = page.locator('[data-test="Cafe_Breve"]');
  const checkout = page.locator('[data-test="checkout"]');
  const cart = page.locator('[aria-label="Cart page"]');
  const app = page.locator('#app');
  const removeCafeBreve = page.locator(
    'button[aria-label="Remove all Cafe Breve"]'
  );

  await cafeBreve.click();

  await expect(checkout).toContainText('Total: $15.00');
  await expect(cart).toContainText('cart (1)');

  await cart.click();

  await expect(app).toContainText('Cafe Breve');
  await expect(app).toContainText('$15.00');

  await removeCafeBreve.click();

  await expect(app).toContainText('No coffee, go add some.');
});