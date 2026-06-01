import { test, expect } from '../../fixtures/testBase';

test('Create user via API', async ({ userAPI }) => {
  const response = await userAPI.createUser({
    name: 'Yuliia',
    job: 'QA Engineer',
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.name).toBe('Yuliia');
  expect(body.job).toBe('QA Engineer');
});