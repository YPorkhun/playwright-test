// tests/ui/login.spec.js

import { test, expect } from './fixtures/testBase.js';

test('Successful user login', async ({ loginPage, securePage }) => {
  await loginPage.open();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  const message = await securePage.getMessage();

  expect(message).toContain('You logged into a secure area!');
});