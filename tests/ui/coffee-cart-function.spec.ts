import { test, expect } from '@playwright/test';
import { openPaymentForm, fillPaymentForm, submitPayment, addCoffeeToCart, openCart,  removeCoffeeFromCart } from './page-actions';

test('Payment form', async ({ page }) => {

  await page.goto('https://coffee-cart.app/');

  await openPaymentForm(page);

  await expect(page.getByText('Payment details×We will send')).toBeVisible();

  await fillPaymentForm(page, 'Yuliia P', 'test@gmail.com');

  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Yuliia P');

  await submitPayment(page);

  await expect(page.locator('#app')).toContainText(
    'Thanks for your purchase. Please check your email for payment.'
  );
  await expect(page.locator('#app')).toBeVisible();
});

test('Removing items from cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await addCoffeeToCart(page, 'Cafe_Breve');

  await expect(page.locator('[data-test="checkout"]'))
    .toContainText('Total: $15.00');

  await expect(page.getByLabel('Cart page'))
    .toContainText('cart (1)');

  await openCart(page);

  await expect(page.locator('#app'))
    .toContainText('Cafe Breve$15.00 x 1+-$15.00x');

  await removeCoffeeFromCart(page, 'Cafe Breve');

  await expect(page.getByRole('paragraph'))
    .toContainText('No coffee, go add some.');
});