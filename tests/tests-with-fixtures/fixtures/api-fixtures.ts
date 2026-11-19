
import { test as base, expect } from '@playwright/test';
import { UserController } from '../../api/UserController';

type User = {
  username: string;
  email: string;
  password: string;
  token: string;
};

type Fixtures = {
  apiUser: User;
};

export const test = base.extend<Fixtures>({
apiUser: async ({ playwright, baseURL }, use) => {
  const apiContext = await playwright.request.newContext({
    baseURL: baseURL!,
  });

  try {
    const userController = new UserController(apiContext);
    const user = await userController.createUser();

    await use(user);
  } finally {
    await apiContext.dispose();
  }
},

  storageState: async ({ apiUser }, use) => {
    await use({
      cookies: [],
      origins: [
        {
          origin: 'http://104.168.59.50',
          localStorage: [
            {
              name: 'qa-dojo.token',
              value: apiUser.token,
            },
          ],
        },
      ],
    });
  },
});

export { expect };
