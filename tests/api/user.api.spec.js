
import { test, expect } from '../../fixtures/testBase';

test('Create user via API', async ({ userAPI }) => {
  const response = await userAPI.createUser({
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

});