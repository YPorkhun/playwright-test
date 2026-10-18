import { test, expect } from '@playwright/test';

const users = [
  {
    scenario: 'All fields',
    name: 'Yuliia',
    email: 'yuliia@test.com',
    message: 'Hello',
    subject: 'bug',
    priority: 'high',
    optional: true
  },
  {
    scenario: 'Required fields',
    name: 'Kateryna',
    email: 'kateryna@test.com',
    message: 'Question',
    subject: '',
    priority: '',
    optional: false
  },
  {
    scenario: 'Optional fields',
    name: '',
    email: '',
    message: '',
    subject: 'feature',
    priority: 'low',
    optional: true
  }
];

for (const user of users) {
  test(`Contact form - ${user.scenario}`, async ({ page }) => {

    await page.goto('http://104.168.59.50/articles/contact');

    await page.getByTestId('contact-name').fill(user.name);
    await page.getByTestId('contact-email').fill(user.email);
    await page.getByTestId('contact-message').fill(user.message);

    if (user.optional) {
      await page.getByTestId('contact-subject')
        .selectOption(user.subject);

      await page.getByTestId(`contact-priority-${user.priority}`)
        .check();

      await page.getByTestId('contact-copy-me')
        .check();

      await page.getByTestId('contact-attachments')
        .setInputFiles('tests/fixtures/ladybug.png');
    }

    await page.getByTestId('contact-submit').click();

    const success = page.getByRole('heading', {
      name: /Дякуємо!/
    });

    if (user.name) {
      await expect(success).toBeVisible();

      await expect(page.getByText("обов'язкове поле")).toHaveCount(0);
      await expect(page.getByText('некоректний email')).toHaveCount(0);

    } else {
      await expect(success).not.toBeVisible();

      await expect(page.getByText("обов'язкове поле")).toHaveCount(2);
      await expect(page.getByText('некоректний email')).toBeVisible();
    }
  });
}