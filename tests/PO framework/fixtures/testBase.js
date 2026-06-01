
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';
import { UserAPI } from '../api/user.api';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  securePage: async ({ page }, use) => {
    await use(new SecurePage(page));
  },

  userAPI: async ({ request }, use) => {
    await use(new UserAPI(request));
  },
});

export { expect } from '@playwright/test';