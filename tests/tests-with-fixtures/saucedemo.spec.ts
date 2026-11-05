
import { test, expect } from './fixtures/fixtures';

const PRODUCT = 'Sauce Labs Backpack';

test.describe('SauceDemo - Standard User', () => {
  test.use({
    userToLogin: {
      login: 'standard_user',
      password: 'secret_sauce',
    },
  });

  test('User can successfully log in', async ({ page }) => {
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('User can add a product to the cart', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
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

  test('User can remove a product from inventory', async ({
    page,
    inventoryPage,
  }) => {
    await inventoryPage.addToCartByTitle(PRODUCT);
    await inventoryPage.removeFromCartByTitle(PRODUCT);
    await inventoryPage.openCart();

    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test('User can remove a product from cart and continue shopping', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCartByTitle(PRODUCT);
    await inventoryPage.openCart();

    await cartPage.removeFromCartByTitle(PRODUCT);
    await expect(page.locator('.cart_item')).toHaveCount(0);

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});

test.describe('SauceDemo - Performance Glitch User', () => {
  test.use({
    userToLogin: {
      login: 'performance_glitch_user',
      password: 'secret_sauce',
    },
  });

  test('User can complete checkout successfully', async ({
    page,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
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
});
