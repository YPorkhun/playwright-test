import { expect, type Locator, type Page } from '@playwright/test';

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

export async function addCoffeeToCart(page: Page, coffee: string) {
  await page.locator(`[data-test="${coffee}"]`).click();
}

export async function openCart(page: Page) {
  await page.getByRole('link', { name: 'Cart page' }).click();
}

export async function removeCoffeeFromCart(page: Page, coffeeName: string) {
  await page.getByRole('button', {
    name: `Remove all ${coffeeName}`
  }).click();
}

export async function newUserRegistration(page: Page) {
      const timestamp = Date.now();
      const username = `testuser_${timestamp}`;
      const email = `testuser_${timestamp}@example.com`;
  
      await page.goto('/register');
      await page.getByTestId('auth-username').click();
      await page.getByTestId('auth-username').fill(username);
      await page.getByTestId('auth-email').click();
      await page.getByTestId('auth-email').fill(email);
      await page.getByTestId('auth-password').click();
      await page.getByTestId('auth-password').fill(process.env.TEST_USER_PASSWORD!);
      await page.getByTestId('register-confirm-password').click();
      await page.getByTestId('register-confirm-password').fill(process.env.TEST_USER_PASSWORD!);
      await page.locator('label').filter({ hasText: 'A testing course' }).locator('span').click();
      await page.getByTestId('register-terms').check();
      await page.getByTestId('auth-submit').click();
      await expect(page.getByText(username, { exact: true })).toBeVisible();
      return username;
}

export async function createArticle( 
  page: Page,
  title: string,
  description: string,
  body: string
) {
  await page.goto('http://104.168.59.50/articles/editor');
  await page.getByTestId('nav-new-article').click();
  await page.getByPlaceholder('Article Title').fill(title);
  await page.getByTestId('editor-description').fill(description);
  await page.getByTestId('editor-body').fill(body);
  await page.getByTestId('editor-submit').click();
}
