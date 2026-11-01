
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CardPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const PRODUCT = 'Sauce Labs Backpack';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const loginPage = new LoginPage(page);
  await loginPage.login(USERNAME, PASSWORD);
});

test('User can successfully log in', async ({ page }) => {
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('User can add a product to the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  const inventoryPrice = await inventoryPage.getPriceByTitle(PRODUCT);

  await inventoryPage.addToCartByTitle(PRODUCT);
  await inventoryPage.openCart();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(
    page.locator('.cart_item .inventory_item_name')
  ).toHaveText(PRODUCT);

  const cartPrice = await cartPage.getPriceByTitle(PRODUCT);
  expect(cartPrice).toBe(inventoryPrice);
});

test('User can remove a product from inventory', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addToCartByTitle(PRODUCT);
  await inventoryPage.removeFromCartByTitle(PRODUCT);
  await inventoryPage.openCart();

  await expect(page.locator('.cart_item')).toHaveCount(0);
});

test('User can remove a product from cart and continue shopping', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.addToCartByTitle(PRODUCT);
  await inventoryPage.openCart();

  await cartPage.removeFromCartByTitle(PRODUCT);
  await expect(page.locator('.cart_item')).toHaveCount(0);

  await cartPage.continueShopping();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('User can complete checkout successfully', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

  await inventoryPage.addToCartByTitle(PRODUCT);
  await inventoryPage.openCart();
  await cartPage.checkout();

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  await checkoutStepOnePage.fillFirstName('Yulia');
  await checkoutStepOnePage.fillLastName('Test');
  await checkoutStepOnePage.fillZipCode('49000');
  await checkoutStepOnePage.continue();

  await expect(page).toHaveURL(/checkout-step-two\.html/);

  const productNames = await checkoutStepTwoPage.getProductNames();
  expect(productNames).toContain(PRODUCT);

  const totalPrice = await checkoutStepTwoPage.getTotalPrice();
  expect(Number(totalPrice.replace('$', ''))).toBeGreaterThan(0);

  await checkoutStepTwoPage.finish();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(
    page.locator('[data-test="complete-header"]')
  ).toHaveText('Thank you for your order!');
});
