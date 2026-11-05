
import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CardPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';

type User = {
  login: string;
  password: string;
};

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  userToLogin: User;
  login: void;
  logout: void;
};

export const test = base.extend<Fixtures>({
  userToLogin: [
    { login: 'standard_user', password: 'secret_sauce' },
    { option: true },
  ],

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },

  login: [
    async ({ page, loginPage, userToLogin }, use) => {
      await page.goto('https://www.saucedemo.com/');
      await loginPage.login(userToLogin.login, userToLogin.password);
      await use();
    },
    { auto: true },
  ],

  logout: [
    async ({ page, login }, use) => {
      await use();

      if (page.isClosed()) return;

      const menuButton = page.locator('#react-burger-menu-btn');

      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.locator('#logout_sidebar_link').click();
      }
    },
    { auto: true },
  ],
});

export { expect };
