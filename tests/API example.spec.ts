import { test, expect } from '@playwright/test';

test('GET status code 200 page', async ({ request }) => {
  const response = await request.get('https://the-internet.herokuapp.com/status_codes/200');

  expect(response.status()).toBe(200);
});