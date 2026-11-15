
import { test, expect } from './tests-with-fixtures/fixtures/api-fixtures';

test('User can update avatar', async ({ page, apiUser }) => {
  const avatarURL = 'https://placehold.co/200x200.png';

  await page.goto('/articles');

  await page.getByRole('link', { name: apiUser.username }).click();

  await page.getByRole('link', { name: 'Edit profile' }).click();

  await expect(
    page.getByRole('heading', { name: 'Settings' })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'Username' })
  ).toHaveValue(apiUser.username);

  await expect(
    page.getByTestId('settings-email')
).toHaveValue(apiUser.email);

  const avatarInput = page.locator(
    'input[value="/avatar-placeholder.svg"]'
  );

  await avatarInput.fill(avatarURL);

  const responsePromise = page.waitForResponse(response =>
    response.url().includes('/api/user') &&
    response.request().method() === 'PUT'
  );

  await page.getByRole('button', { name: 'Save settings' }).click();

  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();

  const avatar = page.locator(`img[src="${avatarURL}"]`).first();

  await expect(avatar).toBeVisible();
  await expect(avatar).toHaveAttribute('src', avatarURL);

  await page.goto('/articles');

  await page.getByRole('link', { name: apiUser.username }).click();
  await page.getByRole('link', { name: 'Edit profile' }).click();

  await expect(
    page.locator('input').filter({ visible: true })
      .and(page.locator(`input[value="${avatarURL}"]`))
  ).toHaveValue(avatarURL);

  await expect(
    page.locator(`img[src="${avatarURL}"]`).first()
  ).toBeVisible();
});



