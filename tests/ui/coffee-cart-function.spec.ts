import { test, expect } from '@playwright/test';
import { openPaymentForm, fillPaymentForm, submitPayment } from './page-actions';

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