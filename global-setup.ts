import { chromium, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import fs from 'node:fs/promises';

dotenv.config();

export default async function globalSetup() {
  const browser = await chromium.launch();

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://104.168.59.50/articles/login');

    await page.getByTestId('auth-email').fill(process.env.TEST_USER_EMAIL!);

    await page.getByLabel('Password')
      .fill(process.env.TEST_USER_PASSWORD!);

    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(
      page.getByRole('link', { name: 'New Article' })
    ).toBeVisible();

    await fs.mkdir('playwright/.auth', { recursive: true });

    await context.storageState({
      path: 'playwright/.auth/user.json',
    });

  } finally {
    await browser.close();
  }
}