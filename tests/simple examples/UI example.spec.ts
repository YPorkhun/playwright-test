import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('PO models page', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/pom');

  await expect(page.getByRole('heading', { name: 'Page object models' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Page object models' })).toHaveText('Page object models');

  await page.getByRole('link', { name: 'Direct link to Introduction' }).click();
  await expect(page.getByRole('heading', { name: 'Introduction' })).toBeVisible();
  await expect(page.getByText('Large test suites can be')).toBeVisible();
});
