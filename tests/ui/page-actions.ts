import type { Page } from '@playwright/test';

export async function openPaymentForm(page: Page) {
  await page.locator('[data-test="checkout"]').click();
}

export async function fillPaymentForm(
  page: Page,
  name: string,
  email: string
) {
  await page.getByRole('textbox', { name: 'Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
}

export async function submitPayment(page: Page) {
  await page.getByRole('button', { name: 'Submit' }).click();
}