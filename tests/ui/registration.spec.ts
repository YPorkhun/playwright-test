import { test, expect } from '@playwright/test';

test ('Success registration of a new user', async ({ page }) => {

    const timestamp = Date.now();
    const username = `testuser_${timestamp}`;
    const email = `testuser_${timestamp}@example.com`;

    await page.goto('/register');
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill(process.env.TEST_USER_PASSWORD!);
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill(process.env.TEST_USER_PASSWORD!);
    await page.locator('label').filter({ hasText: 'A testing course' }).locator('span').click();
    await page.getByTestId('register-terms').check();
      await expect(page.getByTestId('register-terms')).toBeChecked();
    await page.getByTestId('auth-submit').click();
      await expect(page.getByTestId('nav-profile')).toContainText(username);
});
 

test  ('Registration with already used email', async ({ page }) => {

    const timestamp = Date.now();
    const username = `testuser_${timestamp}`;
    const second_username = `testuser2_${timestamp}`;
    const email = `testuser_${timestamp}@example.com`;

    //create user
    await page.goto('/register');
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill(process.env.TEST_USER_PASSWORD!);
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill(process.env.TEST_USER_PASSWORD!);
    await page.locator('label').filter({ hasText: 'A testing course' }).locator('span').click();
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
        await expect(page.getByTestId('nav-profile')).toContainText(username);

    //try to create user with the same email
    await page.goto('/register');
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(second_username);
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill(process.env.TEST_USER_PASSWORD!);
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill(process.env.TEST_USER_PASSWORD!);
    await page.locator('label').filter({ hasText: 'A testing course' }).locator('span').click();
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
       await expect(page.getByText("body email або username вже зайняті")).toBeVisible();
});

test ('Registration with invalid data (wrong username)', async ({ page }) => {

    const timestamp = Date.now();
    const username = `YP`;
    const email = `testuser_${timestamp}@example.com`;

    await page.goto('/register');
    await page.getByTestId('auth-username').click();
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill(process.env.TEST_USER_PASSWORD!);
    await page.getByTestId('register-confirm-password').click();
    await page.getByTestId('register-confirm-password').fill(process.env.TEST_USER_PASSWORD!);
    await page.locator('label').filter({ hasText: 'A testing course' }).locator('span').click();
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
       await expect(page.getByText("username ім'я має містити щонайменше 3 символи")).toBeVisible();

});

test ('Successful login with valid credentials', async ({ page }) => {

    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;
    const username = process.env.TEST_USERNAME!;

    await page.goto('/login');
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill(password);
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('nav-profile')).toContainText(username);
});

test('Login with incorrect password', async ({ page }) => {

    const email = process.env.TEST_USER_EMAIL!;
    const wrongPassword = 'WrongPassword123!';

    await page.goto('/login');
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill(wrongPassword);
    await page.getByTestId('auth-submit').click();
    await expect(page.locator('body')).toContainText('email or password неправильні');
});

test('Login with non-existing user', async ({ page }) => {

    const timestamp = Date.now();
    const email = `nonexisting_${timestamp}@example.com`;
    const password = 'AnyPassword123!';

    await page.goto('/login');
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill(password);
    await page.getByTestId('auth-submit').click();
    await expect(page.locator('body')) .toContainText('email or password неправильні');
});