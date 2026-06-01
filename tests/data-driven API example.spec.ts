import { test, expect } from '@playwright/test';

const statusCodes = [200, 301, 404, 500];

test.describe('Status codes API tests', () => {
  for (const code of statusCodes) {
    test(`should return ${code}`, async ({ request }) => {
      const response = await request.get(
        `https://the-internet.herokuapp.com/status_codes/${code}`
      );
      expect(response.status()).toBe(code);
    });
  }
});