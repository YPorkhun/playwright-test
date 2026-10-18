import { test, expect, type Page } from '@playwright/test';
import { newUserRegistration, createArticle} from './page-actions';


test('Create 10 articles', async ({ page }) => {

  const username = await newUserRegistration(page);
  await expect(page.getByText(username, { exact: true })).toBeVisible();

  const titles: string[] = [];
  const runId = Date.now();

  for (let i = 1; i <= 10; i++) {
    const title = `Test Article ${runId}-${i}`;

    await createArticle(
      page,
      title,
      'Test description',
      'Test article body'
    );
    titles.push(title);
  }
  
 await page.goto('http://104.168.59.50/articles');
 await page.getByTestId('feed-tab-global').click();

 for (const title of titles) {
  await expect(page.getByText(title, { exact: true })).toBeVisible();

}}); 