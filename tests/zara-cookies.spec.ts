import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

test('Accept and update cookies', async ({ page, context }) => {
await page.goto('https://www.zara.com/es/en/');
await page.pause();


  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.getByRole('button', { name: 'Yes, continue on Spain' }).click();


  const cookies = await context.cookies();
  expect(cookies.length).toBeGreaterThan(0);


  const cookie = cookies[0];
  const newValue = 'homework-updated';


  await context.addCookies([
    { ...cookie, value: newValue }
  ]);


  const updatedCookies = await context.cookies();


  const updatedCookie = updatedCookies.find(
    c => c.name === cookie.name &&
         c.domain === cookie.domain &&
         c.path === cookie.path
  );

  
  expect(updatedCookie).toBeDefined();
  expect(updatedCookie?.value).toBe(newValue);
});