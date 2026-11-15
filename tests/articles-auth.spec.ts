import { test, expect } from '@playwright/test';

test('User is logged in', async ({ page }) => {
  await page.goto('/articles');

  await expect(
    page.getByRole('link', { name: 'New Article' })
  ).toBeVisible();
});